/*
  Direct Messaging System:
  1. Create messages table for direct communication
  2. Add RLS policies for secure messaging
*/

-- Create messages table
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES auth.users(id) NOT NULL,
  receiver_id uuid REFERENCES auth.users(id) NOT NULL,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CHECK (sender_id != receiver_id)
);

-- Create index for faster message retrieval
CREATE INDEX messages_participants_idx ON messages(sender_id, receiver_id);
CREATE INDEX messages_created_at_idx ON messages(created_at DESC);

-- Create function to validate message participants
CREATE OR REPLACE FUNCTION validate_message_participants()
RETURNS trigger AS $$
DECLARE
  v_sender_id uuid;
  v_receiver_id uuid;
BEGIN
  -- For INSERT, use NEW values
  -- For UPDATE, only validate if sender_id or receiver_id changed
  IF TG_OP = 'INSERT' THEN
    v_sender_id := NEW.sender_id;
    v_receiver_id := NEW.receiver_id;
  ELSIF TG_OP = 'UPDATE' THEN
    -- Only validate if sender or receiver changed
    IF OLD.sender_id = NEW.sender_id AND OLD.receiver_id = NEW.receiver_id THEN
      RETURN NEW;
    END IF;
    v_sender_id := NEW.sender_id;
    v_receiver_id := NEW.receiver_id;
  END IF;

  -- Check if there's an active mentorship between sender and receiver
  IF NOT EXISTS (
    SELECT 1 FROM mentorship
    WHERE status = 'active'
    AND (
      (mentor_id = v_sender_id AND mentee_id = v_receiver_id)
      OR
      (mentor_id = v_receiver_id AND mentee_id = v_sender_id)
    )
  ) THEN
    RAISE EXCEPTION 'Invalid message participants: must be in an active mentorship';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for message validation
CREATE TRIGGER validate_message_participants
  BEFORE INSERT OR UPDATE ON messages
  FOR EACH ROW
  EXECUTE FUNCTION validate_message_participants();

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies for messages
CREATE POLICY "Users can view their own messages"
  ON messages FOR SELECT
  TO authenticated
  USING (auth.uid() IN (sender_id, receiver_id));

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

-- Split the read status update policy into two parts
CREATE POLICY "Users can mark their received messages as read"
  ON messages FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = receiver_id AND
    sender_id = sender_id AND -- unchanged
    receiver_id = receiver_id AND -- unchanged
    content = content -- unchanged
  )
  WITH CHECK (
    auth.uid() = receiver_id AND
    sender_id = sender_id AND -- unchanged
    receiver_id = receiver_id AND -- unchanged
    content = content -- unchanged
  );

-- Function to mark messages as read
CREATE OR REPLACE FUNCTION mark_messages_as_read(p_sender_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE messages
  SET is_read = true
  WHERE 
    receiver_id = auth.uid()
    AND sender_id = p_sender_id
    AND is_read = false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 