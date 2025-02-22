import React, { useEffect } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { Trophy, Calendar, AlertTriangle } from 'lucide-react';
import { useStreakStore } from '../store/streakStore';

function Progress() {
  const { currentStreak, streaks, loading, fetchStreaks, startNewStreak, endStreak } = useStreakStore();

  useEffect(() => {
    fetchStreaks();
  }, [fetchStreaks]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Trophy className="text-blue-700" />
          Current Streak
        </h2>
        
        {currentStreak ? (
          <div className="space-y-4">
            <p className="text-4xl font-bold text-blue-700">
              {formatDistanceToNow(new Date(currentStreak.start_date), { addSuffix: false })}
            </p>
            <p className="text-gray-600">
              Started on {format(new Date(currentStreak.start_date), 'MMMM d, yyyy')}
            </p>
            <button
              onClick={() => endStreak()}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <AlertTriangle size={20} />
              Log Relapse
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-gray-600">No active streak</p>
            <button
              onClick={() => startNewStreak()}
              className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-colors"
            >
              Start New Streak
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Calendar className="text-blue-700" />
          History
        </h2>
        
        <div className="space-y-4">
          {streaks.map(streak => (
            <div
              key={streak.id}
              className="border-l-4 border-blue-700 pl-4 py-2"
            >
              <p className="font-semibold">
                {formatDistanceToNow(new Date(streak.start_date), { addSuffix: false })}
              </p>
              <p className="text-sm text-gray-600">
                {format(new Date(streak.start_date), 'MMM d, yyyy')} - 
                {streak.end_date ? format(new Date(streak.end_date), ' MMM d, yyyy') : ' Present'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Progress