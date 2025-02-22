import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStreakStore } from '../store/streakStore';
import { Trophy, Timer, BookOpen } from 'lucide-react';
import { format } from 'date-fns';

const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  }
];

function Home() {
  const navigate = useNavigate();
  const { currentStreak, fetchStreaks } = useStreakStore();
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    fetchStreaks();
    // Set a random quote
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [fetchStreaks]);

  const quickActions = [
    {
      title: 'Start Timer',
      description: 'Focus on productive activities',
      icon: Timer,
      path: '/timer',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      title: 'View Progress',
      description: 'Track your journey',
      icon: Trophy,
      path: '/progress',
      color: 'bg-green-100 text-green-700'
    },
    {
      title: 'Resources',
      description: 'Learn and grow',
      icon: BookOpen,
      path: '/resources',
      color: 'bg-orange-100 text-orange-700'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quote of the Day */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-600 mb-3">Quote of the Day</h2>
        <blockquote className="border-l-4 border-blue-700 pl-4 py-2">
          <p className="text-xl font-medium text-gray-800 mb-2">{quote.text}</p>
          <footer className="text-gray-600">― {quote.author}</footer>
        </blockquote>
      </div>

      {/* Current Streak */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-600 mb-3">Current Streak</h2>
        {currentStreak ? (
          <div>
            <p className="text-3xl font-bold text-blue-700">
              {format(new Date(currentStreak.start_date), 'do MMMM yyyy')}
            </p>
            <p className="text-gray-600 mt-1">Keep going strong!</p>
          </div>
        ) : (
          <p className="text-gray-600">No active streak. Start your journey today!</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => navigate(action.path)}
            className="bg-white rounded-lg shadow-md p-4 text-left hover:shadow-lg transition-shadow"
          >
            <div className={`rounded-lg p-2 inline-block ${action.color}`}>
              <action.icon size={24} />
            </div>
            <h3 className="font-semibold mt-3 mb-1">{action.title}</h3>
            <p className="text-sm text-gray-600">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home