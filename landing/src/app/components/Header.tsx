import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/icon-192x192.png"
            alt="FocusPath Logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-xl font-bold text-gray-900">FocusPath</span>
          <span className="hidden sm:inline-block px-2 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full ml-2">
            NoFap
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            About
          </Link>
          <Link href="/install" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Install
          </Link>
          <Link
            href="/install"
            className="hidden sm:inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Get Started Free
          </Link>
        </div>
      </nav>
    </header>
  )
} 