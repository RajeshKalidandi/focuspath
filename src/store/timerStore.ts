import { create } from 'zustand';

interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  intervalId: number | null;
  startTimer: (minutes: number) => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  timeLeft: 0,
  isRunning: false,
  intervalId: null,

  startTimer: (minutes: number) => {
    const { intervalId } = get();
    if (intervalId) clearInterval(intervalId);
    
    const newIntervalId = setInterval(() => {
      get().tick();
    }, 1000);

    set({ 
      timeLeft: minutes * 60,
      isRunning: true,
      intervalId: newIntervalId as unknown as number
    });
  },

  pauseTimer: () => {
    const { intervalId } = get();
    if (intervalId) clearInterval(intervalId);
    set({ isRunning: false, intervalId: null });
  },

  resetTimer: () => {
    const { intervalId } = get();
    if (intervalId) clearInterval(intervalId);
    set({ timeLeft: 0, isRunning: false, intervalId: null });
  },

  tick: () => {
    const { timeLeft, intervalId } = get();
    if (timeLeft <= 0) {
      if (intervalId) clearInterval(intervalId);
      set({ isRunning: false, intervalId: null });
      return;
    }
    set({ timeLeft: timeLeft - 1 });
  }
}));