-- Drop existing foreign key if it exists
ALTER TABLE posts
DROP CONSTRAINT IF EXISTS posts_user_id_fkey;

-- Add foreign key reference to profiles
ALTER TABLE posts
ADD CONSTRAINT posts_user_id_fkey
FOREIGN KEY (user_id) REFERENCES profiles(id)
ON DELETE CASCADE;

-- Do the same for comments
ALTER TABLE comments
DROP CONSTRAINT IF EXISTS comments_user_id_fkey;

ALTER TABLE comments
ADD CONSTRAINT comments_user_id_fkey
FOREIGN KEY (user_id) REFERENCES profiles(id)
ON DELETE CASCADE; 