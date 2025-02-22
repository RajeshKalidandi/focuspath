import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Focus, Download, ArrowRight, Smartphone, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QRInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [deviceType, setDeviceType] = useState<'ios' | 'android' | 'other'>('other');
  const [installationStep, setInstallationStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setDeviceType('ios');
    } else if (/android/.test(userAgent)) {
      setDeviceType('android');
    }

    // Handle PWA install prompt for Android
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    // Handle successful installation
    window.addEventListener('appinstalled', () => {
      setShowSuccess(true);
    });

    // Auto trigger installation prompt for Android
    const triggerInstallPrompt = async () => {
      if (deviceType === 'android' && deferredPrompt) {
        try {
          await handleInstall();
        } catch (error) {
          console.error('Installation prompt failed:', error);
        }
      }
    };

    const timer = setTimeout(triggerInstallPrompt, 1500);
    return () => clearTimeout(timer);
  }, [deviceType, deferredPrompt]);

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

  const iOSSteps = [
    'Tap the share button ⬆️ at the bottom of your screen',
    'Scroll down and tap "Add to Home Screen" 📱',
    'Tap "Add" to install FocusPath ✨'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center p-6">
      <AnimatePresence>
        {showSuccess ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="rounded-full bg-green-50 p-4"
              >
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </motion.div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Installation Successful!
            </h1>
            <p className="text-gray-600 mb-8">
              You can now access FocusPath from your home screen. Let's begin your journey!
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center justify-center w-full bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition-colors"
            >
              Get Started
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <motion.div
              className="flex justify-center mb-6"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="rounded-full bg-blue-50 p-4">
                <Focus className="h-12 w-12 text-blue-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to FocusPath!
              </h1>
              <p className="text-gray-600 mb-6">
                Let's get you set up with the app on your {deviceType === 'ios' ? 'iPhone' : 'device'} 📱
              </p>
            </motion.div>

            {deviceType === 'ios' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-blue-50 rounded-lg p-6 mb-6"
              >
                <h3 className="font-semibold mb-4 text-blue-900">Quick Installation Steps:</h3>
                <ol className="space-y-4 text-left">
                  {iOSSteps.map((step, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`flex items-center gap-3 ${
                        index === installationStep ? 'text-blue-700 font-medium' : 'text-gray-600'
                      }`}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                        {index + 1}
                      </span>
                      {step}
                    </motion.li>
                  ))}
                </ol>
              </motion.div>
            )}

            {deviceType === 'android' && deferredPrompt && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleInstall}
                className="w-full bg-blue-600 text-white rounded-lg px-6 py-3 flex items-center justify-center gap-2 mb-6"
              >
                <Download className="h-5 w-5" />
                Install FocusPath
              </motion.button>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/auth"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Continue to Web Version
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 