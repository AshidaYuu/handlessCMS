'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-gray-600 tracking-wider">ABOUT</span>
          <h2 className="text-xs text-gray-500 mt-1">私たちについて</h2>
        </div>

        {/* Main Title */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            <span className="block mb-2">大崎から未来をつくる、</span>
            <span className="block text-blue-600">挑戦のエコシステム</span>
          </h2>
        </div>

        {/* Description */}
        <div className={`max-w-3xl mx-auto text-center mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            子どもも大人も、どこにいても最新の学びとテクノロジーにアクセスできる社会。
            教育現場・企業・クリエイターがつながり、アイデアが循環する場所。
            私たちは地方から新しい価値を生み出し続けます。
          </p>
        </div>

        {/* Mission/Vision/Value Circles */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Mission */}
          <div className="flex justify-center">
            <div className="relative w-64 h-64 group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full transition-transform group-hover:scale-105" />
              <div className="relative flex flex-col items-center justify-center h-full p-8 text-center">
                <h3 className="text-xl font-bold mb-4 text-gray-900">MISSION</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  挑戦する人の背中を押し、<br />
                  夢を叶える土壌をつくる
                </p>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="flex justify-center">
            <div className="relative w-64 h-64 group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-200 rounded-full transition-transform group-hover:scale-105" />
              <div className="relative flex flex-col items-center justify-center h-full p-8 text-center">
                <h3 className="text-xl font-bold mb-4 text-gray-900">VISION</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  地方発イノベーションの<br />
                  交差点になる
                </p>
              </div>
            </div>
          </div>

          {/* Value */}
          <div className="flex justify-center">
            <div className="relative w-64 h-64 group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-teal-200 rounded-full transition-transform group-hover:scale-105" />
              <div className="relative flex flex-col items-center justify-center h-full p-8 text-center">
                <h3 className="text-xl font-bold mb-4 text-gray-900">VALUE</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Warm<br />
                  Future<br />
                  Local Pride
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            <span>COMING SOON</span>
            <span className="flex gap-1">
              <span className="w-1 h-1 bg-white rounded-full"></span>
              <span className="w-1 h-1 bg-white rounded-full"></span>
              <span className="w-1 h-1 bg-white rounded-full"></span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}