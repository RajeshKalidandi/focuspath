import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Streak {
  id: string;
  user_id: string;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
  created_at: string;
}

interface StreakState {
  currentStreak: Streak | null;
  streaks: Streak[];
  loading: boolean;
  startNewStreak: () => Promise<void>;
  endStreak: () => Promise<void>;
  fetchStreaks: () => Promise<void>;
}

export const useStreakStore = create<StreakState>((set, get) => ({
  currentStreak: null,
  streaks: [],
  loading: false,
  
  startNewStreak: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('streaks')
      .insert([{ user_id: user.id }])
      .select()
      .single();

    if (error) throw error;
    set({ currentStreak: data });
    await get().fetchStreaks();
  },

  endStreak: async () => {
    const { currentStreak } = get();
    if (!currentStreak) return;

    const { error } = await supabase
      .from('streaks')
      .update({ 
        end_date: new Date().toISOString(),
        is_active: false 
      })
      .eq('id', currentStreak.id);

    if (error) throw error;
    set({ currentStreak: null });
    await get().fetchStreaks();
  },

  fetchStreaks: async () => {
    set({ loading: true });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('streaks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    const currentStreak = data.find(streak => streak.is_active);
    set({ 
      streaks: data,
      currentStreak,
      loading: false 
    });
  }
}));