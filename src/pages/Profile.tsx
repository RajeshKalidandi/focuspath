import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Award, Target, Trophy, Edit2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';

interface Profile {
  id: string;
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  total_streak_days: number;
  longest_streak: number;
  preferences: any;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon_url: string;
  category: string;
  earned_at: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  target_date: string;
  milestone_type: string;
  progress: any;
  completed: boolean;
  completed_at: string;
}

function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchProfile();
    fetchBadges();
    fetchMilestones();
  }, []);

  async function fetchProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return;
    }

    setProfile(data);
    setLoading(false);
  }

  async function fetchBadges() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('user_badges')
      .select(`
        badges (
          id,
          name,
          description,
          icon_url,
          category
        ),
        earned_at
      `)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching badges:', error);
      return;
    }

    setBadges(data.map((item: any) => ({
      ...item.badges,
      earned_at: item.earned_at
    })));
  }

  async function fetchMilestones() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('milestones')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching milestones:', error);
      return;
    }

    setMilestones(data);
  }

  async function onSubmitProfile(data: any) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        display_name: data.display_name,
        bio: data.bio
      })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating profile:', error);
      return;
    }

    setIsEditing(false);
    fetchProfile();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <User className="text-blue-700" />
            Profile
          </h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-700 hover:text-blue-800"
          >
            <Edit2 size={20} />
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                {...register('display_name')}
                defaultValue={profile?.display_name}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                {...register('bio')}
                defaultValue={profile?.bio}
                rows={4}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">{profile?.display_name || profile?.username}</h3>
              <p className="text-gray-600">{profile?.bio || 'No bio yet'}</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-blue-50 rounded-lg p-4 flex-1">
                <p className="text-sm text-gray-600">Total Days</p>
                <p className="text-2xl font-bold text-blue-700">{profile?.total_streak_days || 0}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 flex-1">
                <p className="text-sm text-gray-600">Longest Streak</p>
                <p className="text-2xl font-bold text-green-700">{profile?.longest_streak || 0}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Badges Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Award className="text-blue-700" />
          Badges
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges.map(badge => (
            <div
              key={badge.id}
              className="bg-blue-50 rounded-lg p-4 text-center"
            >
              <div className="bg-white rounded-full p-3 mx-auto mb-3 w-16 h-16 flex items-center justify-center">
                <img
                  src={badge.icon_url}
                  alt={badge.name}
                  className="w-10 h-10"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/40';
                  }}
                />
              </div>
              <h3 className="font-semibold mb-1">{badge.name}</h3>
              <p className="text-sm text-gray-600">{badge.description}</p>
              <p className="text-xs text-blue-700 mt-2">
                Earned {format(new Date(badge.earned_at), 'MMM d, yyyy')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Target className="text-blue-700" />
          Milestones
        </h2>
        
        <div className="space-y-4">
          {milestones.map(milestone => (
            <div
              key={milestone.id}
              className={`border-l-4 ${
                milestone.completed ? 'border-green-500' : 'border-blue-700'
              } pl-4 py-2`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{milestone.title}</h3>
                  <p className="text-sm text-gray-600">{milestone.description}</p>
                  {milestone.target_date && (
                    <p className="text-sm text-blue-700">
                      Target: {format(new Date(milestone.target_date), 'MMM d, yyyy')}
                    </p>
                  )}
                </div>
                {milestone.completed && (
                  <div className="bg-green-100 rounded-full p-2">
                    <Trophy className="text-green-700" size={20} />
                  </div>
                )}
              </div>
              {!milestone.completed && milestone.progress && (
                <div className="mt-2">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-700 rounded-full h-2"
                      style={{
                        width: `${(milestone.progress.current / milestone.progress.target) * 100}%`
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile; 