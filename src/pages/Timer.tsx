import React, { useState } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { useTimerStore } from '../store/timerStore';

function Timer() {
  const { timeLeft, isRunning, startTimer, pauseTimer, resetTimer } = useTimerStore();
  const [selectedMinutes, setSelectedMinutes] = useState(25);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const timeOptions = [
    { value: 25, label: '25 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 hour' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Clock className="text-blue-700" />
          Focus Timer
        </h2>

        <div className="text-center space-y-8">
          <div className="text-6xl font-bold text-blue-700 font-mono">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>

          <div className="space-y-4">
            {!isRunning && timeLeft === 0 && (
              <div className="flex justify-center gap-2">
                {timeOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedMinutes(option.value)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      selectedMinutes === option.value
                        ? 'bg-blue-700 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-center gap-4">
              {!isRunning && timeLeft === 0 ? (
                <button
                  onClick={() => startTimer(selectedMinutes)}
                  className="bg-blue-700 text-white py-3 px-6 rounded-md hover:bg-blue-800 transition-colors flex items-center gap-2"
                >
                  <Play size={20} />
                  Start Focus Session
                </button>
              ) : (
                <>
                  <button
                    onClick={isRunning ? pauseTimer : () => startTimer(Math.ceil(timeLeft / 60))}
                    className="bg-blue-700 text-white py-3 px-6 rounded-md hover:bg-blue-800 transition-colors flex items-center gap-2"
                  >
                    {isRunning ? (
                      <>
                        <Pause size={20} />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play size={20} />
                        Resume
                      </>
                    )}
                  </button>
                  <button
                    onClick={resetTimer}
                    className="bg-gray-200 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-300 transition-colors flex items-center gap-2"
                  >
                    <RotateCcw size={20} />
                    Reset
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Tips for a Productive Focus Session</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Find a quiet, comfortable space</li>
          <li>Put your phone on silent mode</li>
          <li>Stay hydrated</li>
          <li>Take deep breaths if you feel urges</li>
          <li>Remember your goals and why you started</li>
        </ul>
      </div>
    </div>
  );
}

export default Timer