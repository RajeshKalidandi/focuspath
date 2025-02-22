import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Timer from './pages/Timer';
import Progress from './pages/Progress';
import Resources from './pages/Resources';
import Landing from './pages/Landing';
import InstallGuide from './pages/InstallGuide';
import QRInstall from './pages/QRInstall';

// Configure React Router future flags
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthStore();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
    </div>;
  }
  
  return user ? <>{children}</> : <Navigate to="/" />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthStore();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
    </div>;
  }
  
  return user ? <Navigate to="/home" /> : <>{children}</>;
}

function App() {
  const initialize = useAuthStore(state => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter future={router.future}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={
          <PublicRoute>
            <Landing />
          </PublicRoute>
        } />
        <Route path="/auth" element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        } />
        <Route path="/install" element={
          <PublicRoute>
            <InstallGuide />
          </PublicRoute>
        } />
        <Route path="/qr" element={
          <PublicRoute>
            <QRInstall />
          </PublicRoute>
        } />

        {/* Protected routes */}
        <Route path="/home" element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
          <Route index element={<Home />} />
          <Route path="timer" element={<Timer />} />
          <Route path="progress" element={<Progress />} />
          <Route path="resources" element={<Resources />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;