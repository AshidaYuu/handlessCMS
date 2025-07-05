'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // ローディング完了処理
    const timer = setTimeout(() => {
      setIsLoading(false)
      if (typeof document !== 'undefined') {
        document.body.classList.remove('loading')
      }
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (!isMounted || !isLoading) return null

  return (
    <div id="loading-screen">
      <div className="loading-container">
        <div className="loading-text" data-text="KANAUUU">KANAUUU</div>
        <div className="loading-progress">
          <div className="progress-bar"></div>
        </div>
        <div className="loading-subtitle">地方から夢は叶う</div>
      </div>
    </div>
  )
}