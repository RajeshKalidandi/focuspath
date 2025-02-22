import React from 'react';
import { Link } from 'react-router-dom';
import { Focus, Timer, LineChart, BookOpen, Star, Shield, Brain, Target, Award, Users } from 'lucide-react';
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

export default function Landing() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [statsRef, statsInView] = useInView({ triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Focus className="h-8 w-8 text-blue-600" />
            </motion.div>
            <span className="text-xl font-bold text-gray-900">FocusPath</span>
            <span className="hidden sm:inline-block px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full ml-2">
              NoFap
            </span>
          </div>
          <div className="flex items-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/auth"
                className="hidden sm:inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
              >
                Get Started Free
              </Link>
            </motion.div>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="relative px-6 lg:px-8 pt-32 pb-24 md:pt-40 md:pb-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <motion.h1 
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
              variants={fadeIn}
            >
              Your Journey to Freedom <br />
              <span className="text-blue-600">Starts Here</span>
            </motion.h1>
            <motion.p 
              className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto"
              variants={fadeIn}
            >
              Join thousands breaking free from addiction with FocusPath. Our NoFap app provides the tools and support you need to reclaim control and achieve lasting change.
            </motion.p>
            <motion.div 
              className="mt-10 flex items-center justify-center gap-x-6"
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to="/auth"
                className="rounded-md bg-blue-600 px-5 py-3 text-md font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Start Your Journey (Free)
              </Link>
              <Link
                to="/install"
                className="text-md font-semibold leading-6 text-gray-900 hover:text-blue-600"
              >
                Installation Guide <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
            <div className="mt-8 flex items-center justify-center gap-x-2 text-sm text-gray-500">
              <span>🔒 Private & Secure</span>
              <span>•</span>
              <span>100% Free</span>
              <span>•</span>
              <span>No App Store Needed</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        ref={statsRef}
        initial="hidden"
        animate={statsInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="bg-white py-16"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600">{stat.value}</div>
                <div className="mt-2 text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-24 bg-white sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Take Control</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to break free
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              FocusPath provides all the tools and support you need on your NoFap journey to recovery and self-improvement.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  variants={fadeIn}
                  className="flex flex-col"
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon className="h-5 w-5 text-blue-600" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Success Stories</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Hear from Our Community
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col bg-white p-6 shadow-sm rounded-lg"
              >
                <div className="flex items-center gap-x-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="flex-1 text-gray-700">{testimonial.content}</blockquote>
                <footer className="mt-4">
                  <p className="text-base font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.achievement}</p>
                </footer>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true }}
        className="relative isolate overflow-hidden bg-blue-600 py-16 sm:py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your Life?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Join thousands of others who have taken the first step towards a better life with FocusPath.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link
                to="/auth"
                className="rounded-md bg-white px-5 py-3 text-md font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
              >
                Get Started Free
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Company</h3>
              <ul className="mt-4 space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-sm text-gray-600 hover:text-gray-900">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
              <ul className="mt-4 space-y-2">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-sm text-gray-600 hover:text-gray-900">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Support</h3>
              <ul className="mt-4 space-y-2">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-sm text-gray-600 hover:text-gray-900">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
              <ul className="mt-4 space-y-2">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-sm text-gray-600 hover:text-gray-900">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-100 pt-8">
            <p className="text-sm text-gray-600 text-center">
              © {new Date().getFullYear()} FocusPath. All rights reserved. NoFap® is a registered trademark.
            </p>
          </div>
        </div>
      </footer>

      {/* Hidden SEO Content */}
      <div className="hidden">
        <h2>Best NoFap App for Addiction Recovery and Self-Improvement</h2>
        <p>
          FocusPath is the leading NoFap tracker and addiction recovery app. Features include streak tracking,
          progress monitoring, relapse prevention, meditation timer, and community support. Join thousands of
          users on their journey to overcome addiction, increase productivity, and improve mental clarity.
        </p>
        <ul>
          <li>Porn Addiction Recovery</li>
          <li>NoFap Tracker</li>
          <li>Addiction Recovery App</li>
          <li>Self-Improvement Tools</li>
          <li>Productivity Enhancement</li>
          <li>Mental Health Support</li>
          <li>Focus Improvement</li>
          <li>Habit Building</li>
          <li>Personal Growth</li>
          <li>Mindfulness Practice</li>
        </ul>
      </div>
    </div>
  );
}

const stats = [
  { value: '10,000+', label: 'Active Users' },
  { value: '2M+', label: 'Days Focused' },
  { value: '90%', label: 'Success Rate' },
  { value: '4.9/5', label: 'User Rating' },
];

const features = [
  {
    name: 'Focus Timer',
    icon: Timer,
    description: 'Stay productive with our customizable focus timer. Track your sessions and build better habits.',
  },
  {
    name: 'Progress Tracking',
    icon: LineChart,
    description: 'Monitor your journey with detailed statistics. Watch your streaks grow and celebrate milestones.',
  },
  {
    name: 'Resources & Support',
    icon: BookOpen,
    description: 'Access curated resources and educational content to support your recovery journey.',
  },
];

const testimonials = [
  {
    content: "FocusPath has been a game-changer in my recovery journey. The streak tracking and daily motivation keep me going strong.",
    author: "Anonymous",
    achievement: "365+ Days Streak"
  },
  {
    content: "The best NoFap app I've used. Clean interface, helpful features, and great community support.",
    author: "Anonymous",
    achievement: "180+ Days Streak"
  },
  {
    content: "This app helped me break free from addiction and regain control of my life. Highly recommended!",
    author: "Anonymous",
    achievement: "90+ Days Streak"
  }
];

const footerLinks = {
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Careers', href: '#' },
  ],
  resources: [
    { label: 'Success Stories', href: '#' },
    { label: 'NoFap Guide', href: '#' },
    { label: 'Research', href: '#' },
    { label: 'FAQ', href: '#' },
  ],
  support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'Feedback', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'GDPR', href: '#' },
  ],
}; 