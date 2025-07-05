'use client'

import { useEffect, useState } from 'react'

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideInterval = 4000 // 4秒

  const slides = [
    '/assets/images/mv-slideimg1.jpg',
    '/assets/images/mv-slideimg2.jpg',
    '/assets/images/mv-slideimg3.jpg',
    '/assets/images/mv-slideimg4.jpg',
    '/assets/images/mv-slideimg5.jpg'
  ]

  useEffect(() => {
    // sub-textを表示（ローディング遷移完了後に表示）
    const subText = document.querySelector('.sub-text')
    if (subText) {
      setTimeout(() => {
        subText.classList.add('show')
      }, 4500) // ローディング遷移完了後に表示
    }

    // 自動スライド（ふわっと遷移完了後に開始）
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, slideInterval)
      
      return () => clearInterval(interval)
    }, 6000) // ローディング遷移完了後に開始

    return () => clearTimeout(timeout)
  }, [slides.length])

  useEffect(() => {
    // プログレスバーのアニメーションをリセット
    const progressBar = document.querySelector('.slide-progress-bar') as HTMLElement
    if (progressBar) {
      progressBar.style.animation = 'none'
      setTimeout(() => {
        progressBar.style.animation = `progressAnimationHorizontal ${slideInterval}ms linear`
      }, 10)
    }
  }, [currentSlide])

  const handleDotClick = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section id="main-visual">
      <div className="mv-background-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`mv-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide})` }}
          />
        ))}
      </div>
      
      <div className="mv-overlay"></div>
      
      <div className="mv-container">
        <div className="mv-content">
          <h1 className="mv-title">
            <span className="main-text" data-text="地方から夢は叶う">地方から夢は叶う</span>
            <div className="title-with-progress">
              <span className="sub-text" data-text="KANAUUU">KANAUUU</span>
              {/* プログレスバー（横型） */}
              <div className="slide-progress-line horizontal">
                <div className="slide-progress-bar"></div>
              </div>
            </div>
          </h1>
          <div className="mv-description">
            <p className="description" data-text="地方から挑戦する人々の背中を押し、夢を叶える土壌をつくる">
              地方から挑戦する人々の背中を押し、<br />夢を叶える土壌をつくる
            </p>
            <p className="mv-mission" data-text="大崎の子どもたちと企業、そして地域そのものの未来を共創します">
              大崎の子どもたちと企業、そして地域そのものの未来を共創します
            </p>
            
            {/* ドット（横型） */}
            <div className="slide-dots horizontal">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`slide-dot ${index === currentSlide ? 'active' : ''}`}
                  data-slide={index}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>SCROLL</span>
      </div>
    </section>
  )
}