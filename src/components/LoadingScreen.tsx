'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [phase, setPhase] = useState<'loading' | 'transitioning' | 'hiding'>('loading')

  useEffect(() => {
    // 初期状態でスクロール無効
    document.body.style.overflow = 'hidden'
    
    // ローディング完了処理
    const timer1 = setTimeout(() => {
      setPhase('transitioning')
      
      // ふわっと遷移開始
      const timer2 = setTimeout(() => {
        setPhase('hiding')
        
        // 完全に非表示
        const timer3 = setTimeout(() => {
          setIsVisible(false)
          document.body.style.overflow = ''
        }, 800) // 最終フェードアウト
        
        return () => clearTimeout(timer3)
      }, 1200) // 遷移エフェクト時間
      
      return () => clearTimeout(timer2)
    }, 2500) // 2.5秒表示

    return () => {
      clearTimeout(timer1)
      document.body.style.overflow = ''
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* メイン背景オーバーレイ */}
      <div 
        className={`loading-overlay ${phase}`}
      />
      
      {/* ローディングコンテンツ */}
      <div 
        id="loading-screen"
        className={`loading-screen ${phase}`}
      >
        <div className="loading-container">
          <div className="loading-text" data-text="KANAUUU">KANAUUU</div>
          <div className="loading-progress">
            <div className="progress-bar"></div>
          </div>
          <div className="loading-subtitle">地方から夢は叶う</div>
        </div>
        
        {/* パーティクル効果 */}
        <div className="loading-particles">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className={`particle particle-${i}`} />
          ))}
        </div>
      </div>
    </>
  )
}