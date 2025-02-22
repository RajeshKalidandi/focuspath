import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Chrome, ArrowLeft, Focus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AndroidInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isAndroid, setIsAndroid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Check if Android
    const userAgent = navigator.userAgent.toLowerCase();
    setIsAndroid(/android/.test(userAgent));

    // Handle PWA install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    // Handle successful installation
    window.addEventListener('appinstalled', () => {
      setShowSuccess(true);
    });
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowSuccess(true);
      }
    }
  };

  const steps = [
    'Open this page in Chrome browser',
    'Tap the menu button (⋮) at the top right',
    'Select "Install app" or "Add to Home Screen"',
    'Follow the installation prompts'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 1 }}
              className="rounded-full bg-blue-50 p-4"
            >
              <Focus className="h-12 w-12 text-blue-600" />
            </motion.div>
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Install FocusPath
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Follow these steps to install FocusPath on your Android device
          </p>

          {!isAndroid && (
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                ⚠️ This installation method works only on Android devices using Chrome browser.
              </p>
            </div>
          )}

          {showSuccess ? (
            <div className="text-center">
              <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Installation Successful!</h2>
              <p className="text-gray-600 mb-6">You can now access FocusPath from your home screen.</p>
              <Link
                to="/auth"
                className="inline-flex items-center justify-center w-full bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <>
              <ol className="space-y-4 mb-8">
                {steps.map((step, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </motion.li>
                ))}
              </ol>

              {deferredPrompt && (
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleInstall}
                  className="w-full bg-blue-600 text-white rounded-lg px-6 py-3 flex items-center justify-center gap-2 mb-6"
                >
                  <Chrome className="h-5 w-5" />
                  Install Now
                </motion.button>
              )}

              <div className="text-center">
                <Link
                  to="/auth"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Continue to Web Version
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 