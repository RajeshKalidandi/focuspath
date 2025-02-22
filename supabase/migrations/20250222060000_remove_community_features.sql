/*
  # Remove Community Features

  This migration removes all community-related tables and features:
  1. Comments and Posts
  2. Support Groups and Members
  3. Anonymous Posts
  4. Challenges and Participants
  5. Accountability Pairs
  6. Mentorship
*/

-- Drop policies first
DROP POLICY IF EXISTS "Anyone can view public groups" ON support_groups;
DROP POLICY IF EXISTS "Users can create groups" ON support_groups;
DROP POLICY IF EXISTS "Anyone can view group members" ON group_members;
DROP POLICY IF EXISTS "Users can join groups" ON group_members;
DROP POLICY IF EXISTS "Users can view own accountability pairs" ON accountability_pairs;
DROP POLICY IF EXISTS "Users can create accountability pairs" ON accountability_pairs;
DROP POLICY IF EXISTS "Users can view own mentorship relationships" ON mentorship;
DROP POLICY IF EXISTS "Users can create mentorship relationships" ON mentorship;
DROP POLICY IF EXISTS "Group members can view anonymous posts" ON anonymous_posts;
DROP POLICY IF EXISTS "Users can create anonymous posts in their groups" ON anonymous_posts;
DROP POLICY IF EXISTS "Users can read all posts" ON posts;
DROP POLICY IF EXISTS "Users can manage own posts" ON posts;
DROP POLICY IF EXISTS "Users can read all comments" ON comments;
DROP POLICY IF EXISTS "Users can manage own comments" ON comments;

-- Drop triggers first (before their functions)
DROP TRIGGER IF EXISTS validate_message_participants ON messages;
DROP TRIGGER IF EXISTS application_status_change ON mentor_applications;

-- Now safe to drop functions
DROP FUNCTION IF EXISTS validate_message_participants();
DROP FUNCTION IF EXISTS mark_messages_as_read(uuid);
DROP FUNCTION IF EXISTS process_mentor_application(uuid, text, text);
DROP FUNCTION IF EXISTS notify_application_status();
DROP FUNCTION IF EXISTS is_admin();

-- Drop foreign key constraints
ALTER TABLE comments DROP CONSTRAINT IF EXISTS comments_post_id_fkey;
ALTER TABLE comments DROP CONSTRAINT IF EXISTS comments_user_id_fkey;
ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_user_id_fkey;
ALTER TABLE group_members DROP CONSTRAINT IF EXISTS group_members_group_id_fkey;
ALTER TABLE group_members DROP CONSTRAINT IF EXISTS group_members_user_id_fkey;
ALTER TABLE anonymous_posts DROP CONSTRAINT IF EXISTS anonymous_posts_group_id_fkey;
ALTER TABLE anonymous_posts DROP CONSTRAINT IF EXISTS anonymous_posts_user_id_fkey;
ALTER TABLE challenge_participants DROP CONSTRAINT IF EXISTS challenge_participants_challenge_id_fkey;
ALTER TABLE challenge_participants DROP CONSTRAINT IF EXISTS challenge_participants_user_id_fkey;
ALTER TABLE accountability_pairs DROP CONSTRAINT IF EXISTS accountability_pairs_user1_id_fkey;
ALTER TABLE accountability_pairs DROP CONSTRAINT IF EXISTS accountability_pairs_user2_id_fkey;
ALTER TABLE mentorship DROP CONSTRAINT IF EXISTS mentorship_mentor_id_fkey;
ALTER TABLE mentorship DROP CONSTRAINT IF EXISTS mentorship_mentee_id_fkey;
ALTER TABLE messages DROP CONSTRAINT IF EXISTS messages_sender_id_fkey;
ALTER TABLE messages DROP CONSTRAINT IF EXISTS messages_receiver_id_fkey;
ALTER TABLE mentor_applications DROP CONSTRAINT IF EXISTS mentor_applications_user_id_fkey;
ALTER TABLE mentor_applications DROP CONSTRAINT IF EXISTS mentor_applications_reviewed_by_fkey;
ALTER TABLE admin_users DROP CONSTRAINT IF EXISTS admin_users_id_fkey;
ALTER TABLE admin_users DROP CONSTRAINT IF EXISTS admin_users_created_by_fkey;

-- Drop indexes
DROP INDEX IF EXISTS messages_participants_idx;
DROP INDEX IF EXISTS messages_created_at_idx;

-- Drop tables in correct order
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS anonymous_posts;
DROP TABLE IF EXISTS group_members;
DROP TABLE IF EXISTS support_groups;
DROP TABLE IF EXISTS challenge_participants;
DROP TABLE IF EXISTS challenges;
DROP TABLE IF EXISTS accountability_pairs;
DROP TABLE IF EXISTS mentorship;
DROP TABLE IF EXISTS mentor_applications;
DROP TABLE IF EXISTS admin_users;

-- Remove mentor-related columns from profiles
ALTER TABLE profiles DROP COLUMN IF EXISTS is_mentor;
ALTER TABLE profiles DROP COLUMN IF EXISTS mentor_bio;
ALTER TABLE profiles DROP COLUMN IF EXISTS mentor_specialties;
ALTER TABLE profiles DROP COLUMN IF EXISTS verification_status;
ALTER TABLE profiles DROP COLUMN IF EXISTS credentials;
ALTER TABLE profiles DROP COLUMN IF EXISTS verification_notes;
ALTER TABLE profiles DROP COLUMN IF EXISTS verification_date; 