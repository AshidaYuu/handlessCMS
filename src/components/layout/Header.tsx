'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { navigation } from '@/config/site'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 h-20 border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
            <Image
              src="/assets/images/logo.png"
              alt="Kanauuu"
              width={40}
              height={40}
              className="w-10 h-auto"
            />
            <span className="text-2xl font-bold text-gray-900">Kanauuu</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center gap-1 text-gray-900 hover:text-blue-600 transition-colors"
              >
                <span className="text-sm font-medium">{item.title}</span>
                <span className="text-xs text-gray-600 group-hover:text-blue-500">
                  {item.description}
                </span>
              </Link>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden lg:block">
            <Link
              href="/#contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              <span className="block text-sm">CONTACT</span>
              <span className="block text-xs opacity-90">お問い合わせ</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col gap-1 p-2"
            aria-label="メニューを開く"
          >
            <span className={`w-6 h-0.5 bg-gray-900 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-gray-900 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-gray-900 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
            <nav className="py-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-6 py-3 text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <span className="block font-medium">{item.title}</span>
                  <span className="block text-sm text-gray-600">{item.description}</span>
                </Link>
              ))}
              <div className="px-6 pt-4">
                <Link
                  href="/#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block bg-blue-600 text-white px-6 py-3 rounded-md font-medium text-center hover:bg-blue-700 transition-colors"
                >
                  CONTACT
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}