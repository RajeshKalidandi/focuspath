/*
  # Social Features Enhancement

  1. New Tables
    - `support_groups`
      - Community support circles
    - `group_members`
      - Group membership and roles
    - `accountability_pairs`
      - Accountability partner relationships
    - `mentorship`
      - Mentor-mentee relationships
    - `anonymous_posts`
      - Anonymous sharing in groups
*/

-- Create support_groups table
CREATE TABLE support_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  created_by uuid REFERENCES auth.users(id) NOT NULL,
  is_private boolean DEFAULT false,
  max_members integer DEFAULT 20,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create group_members table
CREATE TABLE group_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES support_groups(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  role text NOT NULL CHECK (role IN ('member', 'moderator', 'leader')),
  joined_at timestamptz DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- Create accountability_pairs table
CREATE TABLE accountability_pairs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id uuid REFERENCES auth.users(id) NOT NULL,
  user2_id uuid REFERENCES auth.users(id) NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'active', 'ended')),
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  CHECK (user1_id != user2_id),
  UNIQUE(user1_id, user2_id)
);

-- Create mentorship table
CREATE TABLE mentorship (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id uuid REFERENCES auth.users(id) NOT NULL,
  mentee_id uuid REFERENCES auth.users(id) NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'active', 'ended')),
  focus_areas text[] NOT NULL,
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  CHECK (mentor_id != mentee_id),
  UNIQUE(mentor_id, mentee_id)
);

-- Create anonymous_posts table
CREATE TABLE anonymous_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES support_groups(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add mentor status to profiles
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS is_mentor boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS mentor_bio text,
ADD COLUMN IF NOT EXISTS mentor_specialties text[];

-- Enable Row Level Security
ALTER TABLE support_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE accountability_pairs ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship ENABLE ROW LEVEL SECURITY;
ALTER TABLE anonymous_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for support_groups
CREATE POLICY "Anyone can view public groups"
  ON support_groups FOR SELECT
  TO authenticated
  USING (NOT is_private OR EXISTS (
    SELECT 1 FROM group_members WHERE group_id = support_groups.id AND user_id = auth.uid()
  ));

CREATE POLICY "Users can create groups"
  ON support_groups FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Create policies for group_members
CREATE POLICY "Anyone can view group members"
  ON group_members FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM support_groups WHERE id = group_members.group_id AND (
      NOT is_private OR created_by = auth.uid() OR
      EXISTS (SELECT 1 FROM group_members gm WHERE gm.group_id = group_members.group_id AND gm.user_id = auth.uid())
    )
  ));

CREATE POLICY "Users can join groups"
  ON group_members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policies for accountability_pairs
CREATE POLICY "Users can view own accountability pairs"
  ON accountability_pairs FOR SELECT
  TO authenticated
  USING (auth.uid() IN (user1_id, user2_id));

CREATE POLICY "Users can create accountability pairs"
  ON accountability_pairs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (user1_id, user2_id));

-- Create policies for mentorship
CREATE POLICY "Users can view own mentorship relationships"
  ON mentorship FOR SELECT
  TO authenticated
  USING (auth.uid() IN (mentor_id, mentee_id));

CREATE POLICY "Users can create mentorship relationships"
  ON mentorship FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (mentor_id, mentee_id));

-- Create policies for anonymous_posts
CREATE POLICY "Group members can view anonymous posts"
  ON anonymous_posts FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM group_members WHERE group_id = anonymous_posts.group_id AND user_id = auth.uid()
  ));

CREATE POLICY "Users can create anonymous posts in their groups"
  ON anonymous_posts FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM group_members WHERE group_id = anonymous_posts.group_id AND user_id = auth.uid()
  )); 