import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, Timer, BookOpen, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { LineChart } from 'lucide-react';

function Layout() {
  const signOut = useAuthStore(state => state.signOut);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-around items-center">
            <NavLink to="/" className={({ isActive }) => 
              `flex flex-col items-center p-2 ${isActive ? 'text-blue-600' : 'text-gray-600'}`
            }>
              <Home size={24} />
              <span className="text-xs mt-1">Home</span>
            </NavLink>
            <NavLink to="/timer" className={({ isActive }) => 
              `flex flex-col items-center p-2 ${isActive ? 'text-blue-600' : 'text-gray-600'}`
            }>
              <Timer className="w-6 h-6" />
              <span className="text-xs mt-1">Timer</span>
            </NavLink>
            <NavLink to="/progress" className={({ isActive }) => 
              `flex flex-col items-center p-2 ${isActive ? 'text-blue-600' : 'text-gray-600'}`
            }>
              <LineChart className="w-6 h-6" />
              <span className="text-xs mt-1">Progress</span>
            </NavLink>
            <NavLink to="/resources" className={({ isActive }) => 
              `flex flex-col items-center p-2 ${isActive ? 'text-blue-600' : 'text-gray-600'}`
            }>
              <BookOpen className="w-6 h-6" />
              <span className="text-xs mt-1">Resources</span>
            </NavLink>
            <button 
              onClick={() => signOut()}
              className="flex flex-col items-center p-2 text-gray-600"
            >
              <LogOut size={24} />
              <span className="text-xs mt-1">Logout</span>
            </button>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 pb-20 pt-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;