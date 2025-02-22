import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Install FocusPath - Step by Step Guide',
  description: 'Easy installation guide for FocusPath. Install our free app on any device in minutes without using app stores.',
}

export default function InstallPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Install FocusPath
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Follow these simple steps to install FocusPath on your device. No app store required.
          </p>
        </div>

        <div className="mt-16 sm:mt-20">
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
            {/* iOS Installation */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">iOS Installation</h2>
              <ol className="mt-8 space-y-6">
                <li className="flex gap-x-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white">
                    1
                  </span>
                  <div>
                    <strong>Open Safari</strong>
                    <p className="mt-2 text-gray-600">
                      Launch Safari browser on your iOS device and visit our website.
                    </p>
                  </div>
                </li>
                <li className="flex gap-x-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white">
                    2
                  </span>
                  <div>
                    <strong>Tap Share Button</strong>
                    <p className="mt-2 text-gray-600">
                      Tap the Share button (square with arrow) at the bottom of Safari.
                    </p>
                  </div>
                </li>
                <li className="flex gap-x-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white">
                    3
                  </span>
                  <div>
                    <strong>Add to Home Screen</strong>
                    <p className="mt-2 text-gray-600">
                      Scroll down and tap "Add to Home Screen". Tap "Add" to confirm.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Android Installation */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">Android Installation</h2>
              <ol className="mt-8 space-y-6">
                <li className="flex gap-x-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white">
                    1
                  </span>
                  <div>
                    <strong>Open Chrome</strong>
                    <p className="mt-2 text-gray-600">
                      Launch Chrome browser on your Android device and visit our website.
                    </p>
                  </div>
                </li>
                <li className="flex gap-x-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white">
                    2
                  </span>
                  <div>
                    <strong>Open Menu</strong>
                    <p className="mt-2 text-gray-600">
                      Tap the three dots menu in the top-right corner of Chrome.
                    </p>
                  </div>
                </li>
                <li className="flex gap-x-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white">
                    3
                  </span>
                  <div>
                    <strong>Install App</strong>
                    <p className="mt-2 text-gray-600">
                      Select "Install app" or "Add to Home screen" from the menu.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Quick Install with QR Code</h2>
            <p className="mt-4 text-gray-600">
              Scan this QR code with your phone's camera to instantly visit our website and install FocusPath.
            </p>
            <div className="mt-8 flex justify-center">
              {/* Add QR code image here */}
              <div className="h-48 w-48 bg-gray-200 rounded-lg flex items-center justify-center">
                QR Code Placeholder
              </div>
            </div>
          </div>

          {/* Additional Help */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Need Help?</h2>
            <p className="mt-4 text-gray-600">
              If you're having trouble installing FocusPath, please contact our support team or visit our help center.
            </p>
            <div className="mt-8">
              <a
                href="/help"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Visit Help Center →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 