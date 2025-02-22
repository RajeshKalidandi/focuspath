import React from 'react';
import { Link } from 'react-router-dom';
import { Focus, Smartphone, Globe, Download, ArrowLeft, CheckCircle2, Zap, Lock, Wifi, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function InstallGuide() {
  const [ref, inView] = useInView({ triggerOnce: true });

  const mobileAppBenefits = [
    {
      icon: Zap,
      title: "Faster Access",
      description: "Launch the app instantly from your home screen"
    },
    {
      icon: Wifi,
      title: "Offline Support",
      description: "Use all features even without internet connection"
    },
    {
      icon: Lock,
      title: "Enhanced Privacy",
      description: "Discrete app icon and secure local storage"
    },
    {
      icon: Clock,
      title: "Better Performance",
      description: "Smoother experience and faster loading times"
    }
  ];

  const webAppBenefits = [
    {
      icon: Globe,
      title: "Universal Access",
      description: "Use on any device with a web browser"
    },
    {
      icon: Download,
      title: "No Installation",
      description: "Start immediately without downloading"
    },
    {
      icon: CheckCircle2,
      title: "Always Updated",
      description: "Get the latest features instantly"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <nav className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <motion.h1 
                variants={fadeIn}
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
              >
                Install FocusPath
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto"
              >
                Choose how you want to use FocusPath. Install as a mobile app for the best experience or use the web version for instant access.
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Mobile App Installation */}
        <motion.section
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mt-16 px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900">Install Mobile App</h2>
                <p className="mt-2 text-gray-600">Get the best experience with our mobile app</p>
                
                <div className="mt-8 grid gap-8 md:grid-cols-2">
                  {/* iOS Instructions */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">iOS Installation</h3>
                    <ol className="space-y-3">
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-blue-600 text-sm font-medium text-blue-600">1</span>
                        <span>Open Safari and visit <span className="font-mono text-sm bg-gray-100 px-2 py-0.5 rounded">app.rajeshkalidandi.online</span></span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-blue-600 text-sm font-medium text-blue-600">2</span>
                        <span>Tap the Share button</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-blue-600 text-sm font-medium text-blue-600">3</span>
                        <span>Select "Add to Home Screen"</span>
                      </li>
                    </ol>
                  </div>

                  {/* Android Instructions */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Android Installation</h3>
                    <ol className="space-y-3">
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-blue-600 text-sm font-medium text-blue-600">1</span>
                        <span>Open Chrome and visit <span className="font-mono text-sm bg-gray-100 px-2 py-0.5 rounded">app.rajeshkalidandi.online</span></span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-blue-600 text-sm font-medium text-blue-600">2</span>
                        <span>Tap the menu (⋮)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-blue-600 text-sm font-medium text-blue-600">3</span>
                        <span>Select "Install app"</span>
                      </li>
                    </ol>
                  </div>
                </div>

                {/* Mobile Benefits */}
                <div className="mt-12">
                  <h3 className="text-lg font-semibold mb-6">Mobile App Benefits</h3>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {mobileAppBenefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        variants={fadeIn}
                        className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50"
                      >
                        <benefit.icon className="h-8 w-8 text-blue-600 mb-3" />
                        <h4 className="font-medium text-gray-900">{benefit.title}</h4>
                        <p className="mt-2 text-sm text-gray-600">{benefit.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Web Version Benefits */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="mt-16 px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="bg-blue-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900">Web Version</h2>
              <p className="mt-2 text-gray-600">Access FocusPath instantly from any browser</p>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {webAppBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    className="flex flex-col items-center text-center p-4 rounded-lg bg-white"
                  >
                    <benefit.icon className="h-8 w-8 text-blue-600 mb-3" />
                    <h4 className="font-medium text-gray-900">{benefit.title}</h4>
                    <p className="mt-2 text-sm text-gray-600">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link
                  to="/auth"
                  className="inline-flex items-center rounded-md bg-blue-600 px-5 py-3 text-md font-semibold text-white shadow-sm hover:bg-blue-500"
                >
                  Continue to Web Version
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* QR Code Section */}
        <section className="mt-16 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Quick Install</h2>
              <p className="mt-2 text-gray-600">Scan this QR code to open FocusPath on your mobile device</p>
              <div className="mt-6 flex justify-center">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://app.rajeshkalidandi.online/qr"
                  alt="FocusPath QR Code"
                  className="h-48 w-48"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 