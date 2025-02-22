/*
  Mentor Verification System:
  1. Add verification fields to profiles
  2. Create mentor applications table
  3. Add admin role and policies
*/

-- Add verification fields to profiles
ALTER TABLE profiles
ADD COLUMN verification_status text CHECK (verification_status IN ('unverified', 'pending', 'verified', 'rejected')) DEFAULT 'unverified',
ADD COLUMN credentials jsonb DEFAULT '[]',
ADD COLUMN verification_notes text,
ADD COLUMN verification_date timestamptz;

-- Create mentor applications table
CREATE TABLE mentor_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  submitted_at timestamptz DEFAULT now(),
  reviewed_at timestamptz,
  reviewed_by uuid REFERENCES auth.users(id),
  credentials jsonb NOT NULL,
  experience text NOT NULL,
  motivation text NOT NULL,
  specialties text[] NOT NULL,
  reference_list jsonb DEFAULT '[]',
  admin_notes text,
  UNIQUE(user_id, status)
);

-- Create admin_users table for managing admin access
CREATE TABLE admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  role text NOT NULL CHECK (role IN ('admin', 'moderator')),
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE mentor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies for mentor_applications
CREATE POLICY "Users can view their own applications"
  ON mentor_applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create applications"
  ON mentor_applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all applications"
  ON mentor_applications FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid()
  ));

CREATE POLICY "Admins can update applications"
  ON mentor_applications FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid()
  ));

-- Policies for admin_users
CREATE POLICY "Anyone can view admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only super admins can manage admin users"
  ON admin_users FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to process mentor application
CREATE OR REPLACE FUNCTION process_mentor_application(
  p_application_id uuid,
  p_status text,
  p_notes text DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  -- Check if user is admin
  IF NOT is_admin() THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- Update application
  UPDATE mentor_applications
  SET 
    status = p_status,
    reviewed_at = now(),
    reviewed_by = auth.uid(),
    admin_notes = p_notes
  WHERE id = p_application_id;

  -- Update profile if approved
  IF p_status = 'approved' THEN
    UPDATE profiles
    SET 
      is_mentor = true,
      verification_status = 'verified',
      verification_date = now(),
      verification_notes = p_notes,
      credentials = (
        SELECT credentials 
        FROM mentor_applications 
        WHERE id = p_application_id
      ),
      mentor_specialties = (
        SELECT specialties 
        FROM mentor_applications 
        WHERE id = p_application_id
      )
    WHERE id = (
      SELECT user_id 
      FROM mentor_applications 
      WHERE id = p_application_id
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create notification function using pg_notify
CREATE OR REPLACE FUNCTION notify_application_status()
RETURNS trigger AS $$
BEGIN
  PERFORM pg_notify(
    'application_status_change',
    json_build_object(
      'user_id', NEW.user_id,
      'status', NEW.status,
      'application_id', NEW.id
    )::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for application status changes
CREATE TRIGGER application_status_change
  AFTER UPDATE OF status ON mentor_applications
  FOR EACH ROW
  EXECUTE FUNCTION notify_application_status(); 