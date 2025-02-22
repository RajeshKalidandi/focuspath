import Image from "next/image";
import Link from "next/link";
import Header from './components/Header'
import Footer from './components/Footer'
import TrustIndicators from './components/TrustIndicators'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative px-6 lg:px-8 pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Your Journey to Freedom <br />
                <span className="text-indigo-600">Starts Here</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                Join thousands breaking free from addiction with FocusPath. Our NoFap app provides the tools, community, and support you need to reclaim control and achieve lasting change.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/install"
                  className="rounded-md bg-indigo-600 px-5 py-3 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Start Your Journey (Free)
                </Link>
                <Link href="/about" className="text-md font-semibold leading-6 text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="mt-8 flex items-center justify-center gap-x-2 text-sm text-gray-500">
                <span>🔒 Private & Secure</span>
                <span>•</span>
                <span>100% Free</span>
                <span>•</span>
                <span>No App Store Needed</span>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <TrustIndicators />

        {/* Features Section */}
        <section className="py-24 bg-white sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Take Control</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to break free
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                FocusPath provides all the tools and support you need on your NoFap journey to recovery and self-improvement.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.name} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                      {feature.icon}
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Installation Section */}
        <section className="py-24 bg-gray-50 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Install FocusPath in 3 Easy Steps
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Get started with FocusPath in minutes. No app store required.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-3 lg:gap-x-8">
                {installSteps.map((step, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-sm p-8">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-600 text-white">
                      {index + 1}
                    </div>
                    <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative isolate overflow-hidden bg-indigo-600 py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Transform Your Life?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
                Join thousands of others who have taken the first step towards a better life with FocusPath.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/install"
                  className="rounded-md bg-white px-5 py-3 text-md font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50"
                >
                  Get Started Free
                </Link>
                <Link href="/about" className="text-md font-semibold leading-6 text-white">
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const features = [
  {
    name: 'Progress Tracking',
    icon: '📈',
    description: 'Track your NoFap journey with detailed statistics and insights. Watch your streaks grow and celebrate your milestones.',
  },
  {
    name: 'Community Support',
    icon: '👥',
    description: 'Join a supportive community of individuals on the same journey. Share experiences anonymously and get motivation.',
  },
  {
    name: 'Privacy Focused',
    icon: '🔒',
    description: 'Your data stays private. We use end-to-end encryption and never share your information with third parties.',
  },
]

const installSteps = [
  {
    title: 'Visit Website',
    description: 'Open your mobile browser and visit our website. No app store download required.',
  },
  {
    title: 'Add to Home Screen',
    description: 'Click the "Add to Home Screen" button in your browser menu to install FocusPath.',
  },
  {
    title: 'Start Your Journey',
    description: 'Open FocusPath from your home screen and begin your journey to a better life.',
  },
]
