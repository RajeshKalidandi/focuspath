/*
  Initial data for social features:
  1. Create initial support groups
  2. Add verified mentors
  3. Set up initial group leaders
*/

-- Create initial support groups
INSERT INTO support_groups (id, name, description, created_by, is_private, max_members) VALUES
  (
    gen_random_uuid(),
    'Newcomers Circle',
    'A welcoming space for those just starting their recovery journey. Share your story, ask questions, and connect with others who understand.',
    (SELECT id FROM auth.users ORDER BY created_at ASC LIMIT 1),
    false,
    50
  ),
  (
    gen_random_uuid(),
    'Career Focus',
    'Discuss strategies for maintaining focus at work, setting professional boundaries, and achieving career goals while staying on track with recovery.',
    (SELECT id FROM auth.users ORDER BY created_at ASC LIMIT 1),
    false,
    30
  ),
  (
    gen_random_uuid(),
    'Mindfulness & Meditation',
    'Learn and practice mindfulness techniques, meditation exercises, and stress management strategies together.',
    (SELECT id FROM auth.users ORDER BY created_at ASC LIMIT 1),
    false,
    40
  ),
  (
    gen_random_uuid(),
    'Physical Wellness',
    'Share workout routines, nutrition tips, and strategies for channeling energy into healthy physical activities.',
    (SELECT id FROM auth.users ORDER BY created_at ASC LIMIT 1),
    false,
    35
  );

-- Create initial verified mentors
WITH mentor_data AS (
  SELECT id FROM auth.users ORDER BY created_at ASC LIMIT 5
)
UPDATE profiles
SET 
  is_mentor = true,
  mentor_bio = CASE 
    WHEN id = (SELECT id FROM mentor_data OFFSET 0 LIMIT 1) THEN 
      'Certified life coach with 5+ years of experience in addiction recovery. Specializing in mindfulness and career development.'
    WHEN id = (SELECT id FROM mentor_data OFFSET 1 LIMIT 1) THEN 
      'Former addiction counselor turned mentor. Expert in cognitive behavioral techniques and stress management.'
    WHEN id = (SELECT id FROM mentor_data OFFSET 2 LIMIT 1) THEN 
      'Wellness coach and meditation instructor. Helping others find balance through mindfulness and healthy habits.'
    WHEN id = (SELECT id FROM mentor_data OFFSET 3 LIMIT 1) THEN 
      'Recovery advocate with 3+ years of experience. Focus on physical fitness and productivity enhancement.'
    WHEN id = (SELECT id FROM mentor_data OFFSET 4 LIMIT 1) THEN 
      'Mental health professional specializing in addiction recovery. Expert in goal setting and accountability.'
  END,
  mentor_specialties = CASE 
    WHEN id = (SELECT id FROM mentor_data OFFSET 0 LIMIT 1) THEN 
      ARRAY['Mindfulness', 'Career Development', 'Goal Setting']
    WHEN id = (SELECT id FROM mentor_data OFFSET 1 LIMIT 1) THEN 
      ARRAY['CBT Techniques', 'Stress Management', 'Relapse Prevention']
    WHEN id = (SELECT id FROM mentor_data OFFSET 2 LIMIT 1) THEN 
      ARRAY['Meditation', 'Wellness', 'Healthy Habits']
    WHEN id = (SELECT id FROM mentor_data OFFSET 3 LIMIT 1) THEN 
      ARRAY['Physical Fitness', 'Productivity', 'Time Management']
    WHEN id = (SELECT id FROM mentor_data OFFSET 4 LIMIT 1) THEN 
      ARRAY['Mental Health', 'Accountability', 'Personal Growth']
  END
WHERE id IN (SELECT id FROM mentor_data);

-- Add group leaders
INSERT INTO group_members (group_id, user_id, role)
SELECT 
  g.id as group_id,
  u.id as user_id,
  'leader' as role
FROM support_groups g
CROSS JOIN (
  SELECT id FROM auth.users 
  WHERE id IN (SELECT id FROM profiles WHERE is_mentor = true)
  ORDER BY created_at ASC
  LIMIT 4
) u;

-- Add some initial anonymous posts
INSERT INTO anonymous_posts (group_id, user_id, content)
SELECT 
  g.id as group_id,
  u.id as user_id,
  CASE g.name
    WHEN 'Newcomers Circle' THEN 
      'Taking the first step was hard, but I''m grateful to have found this supportive community. Looking forward to growing together.'
    WHEN 'Career Focus' THEN
      'Found that setting clear work boundaries and taking regular breaks has helped immensely with maintaining focus and productivity.'
    WHEN 'Mindfulness & Meditation' THEN
      'Started with just 5 minutes of meditation each morning. Amazing how such a small change can make such a big difference.'
    WHEN 'Physical Wellness' THEN
      'Exercise has been my anchor. When urges hit, I channel that energy into a workout. It''s been transformative.'
  END as content
FROM support_groups g
CROSS JOIN (
  SELECT id FROM auth.users ORDER BY created_at ASC LIMIT 1
) u; 