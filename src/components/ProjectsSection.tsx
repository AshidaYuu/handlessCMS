'use client'

import { useState, useRef, useEffect } from 'react'

export default function ProjectsSection() {
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const lastX = useRef(0)
  const lastTime = useRef(Date.now())

  const originalProjects = [
    {
      id: 'card-1',
      title: '学習塾',
      subtitle: 'Learning',
      description: 'AIが一人ひとりの弱点を分析し、最短ルートで"わかった！"へ導きます。',
      image: '/assets/images/project-img1.jpeg'
    },
    {
      id: 'card-2',
      title: 'プログラミングスクール',
      subtitle: 'Programming',
      description: 'マインクラフトの世界で「遊び」ながら論理的思考と創造力を育成。',
      image: '/assets/images/project-img2.png'
    },
    {
      id: 'card-3',
      title: 'ピアノ教室',
      subtitle: 'Piano',
      description: '小学生中心。音楽で培う表現力が、学びへの自信を育みます。',
      image: '/assets/images/project-img3.png'
    },
    {
      id: 'card-4',
      title: 'Web制作・SNS運用',
      subtitle: 'Digital',
      description: '製作費0円、月9,000円から。地元企業の"顔"をアップデートし、ファンが集まるブランドへ。',
      image: '/assets/images/project-img4.png'
    },
    {
      id: 'card-5',
      title: 'AI・NANDE',
      subtitle: 'Medical AI',
      description: '地方発・看護領域特化AIアプリ 現場の声から生まれた実用機能で、忙しい医療スタッフの判断を支援します',
      image: '/assets/images/project-img5.png'
    }
  ]

  // 無限スクロール用に3セット作成
  const projects = [...originalProjects, ...originalProjects, ...originalProjects]

  // 無限スクロールのための位置調整
  const checkInfiniteScroll = () => {
    if (!galleryRef.current) return
    
    const scrollLeft = galleryRef.current.scrollLeft
    const scrollWidth = galleryRef.current.scrollWidth
    const setWidth = (scrollWidth / 3) // 1セットの幅
    
    // 最初のセットの終わりに近づいたら真ん中のセットに瞬間移動
    if (scrollLeft < setWidth * 0.1) {
      galleryRef.current.scrollLeft = scrollLeft + setWidth
    }
    // 最後のセットの始まりに近づいたら真ん中のセットに瞬間移動
    else if (scrollLeft > setWidth * 1.9) {
      galleryRef.current.scrollLeft = scrollLeft - setWidth
    }
  }

  // 慣性スクロールのアニメーション
  useEffect(() => {
    if (!isDragging && Math.abs(velocity) > 0.5) {
      const decelerate = () => {
        if (galleryRef.current) {
          galleryRef.current.scrollLeft += velocity
          setVelocity(v => v * 0.95) // 減衰率
          
          checkInfiniteScroll()
          
          if (Math.abs(velocity) > 0.5) {
            animationRef.current = requestAnimationFrame(decelerate)
          }
        }
      }
      animationRef.current = requestAnimationFrame(decelerate)
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDragging, velocity])

  // 初期位置を中央のセットに設定
  useEffect(() => {
    if (galleryRef.current) {
      const setWidth = galleryRef.current.scrollWidth / 3
      galleryRef.current.scrollLeft = setWidth
    }
  }, [])

  const handlePrev = () => {
    if (galleryRef.current) {
      const cardWidth = 340
      const currentScroll = galleryRef.current.scrollLeft
      const targetScroll = Math.max(0, Math.floor(currentScroll / cardWidth) * cardWidth - cardWidth)
      smoothScrollTo(targetScroll)
    }
  }

  const handleNext = () => {
    if (galleryRef.current) {
      const cardWidth = 340
      const currentScroll = galleryRef.current.scrollLeft
      const maxScroll = galleryRef.current.scrollWidth - galleryRef.current.clientWidth
      const targetScroll = Math.min(maxScroll, Math.ceil(currentScroll / cardWidth) * cardWidth + cardWidth)
      smoothScrollTo(targetScroll)
    }
  }

  const smoothScrollTo = (target: number) => {
    if (!galleryRef.current) return
    
    const start = galleryRef.current.scrollLeft
    const distance = target - start
    const duration = 300
    let startTime: number | null = null

    const animation = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // イージング関数（ease-out-cubic）
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      
      if (galleryRef.current) {
        galleryRef.current.scrollLeft = start + distance * easeOutCubic
      }
      
      if (progress < 1) {
        requestAnimationFrame(animation)
      }
    }
    
    requestAnimationFrame(animation)
  }

  // ドラッグ機能（改善版）
  const handleMouseDown = (e: React.MouseEvent) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    setIsDragging(true)
    setStartX(e.pageX)
    setScrollLeft(galleryRef.current?.scrollLeft || 0)
    setVelocity(0)
    lastX.current = e.pageX
    lastTime.current = Date.now()
    
    // デフォルトの動作を防ぐ
    e.preventDefault()
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !galleryRef.current) return
    
    e.preventDefault()
    const currentX = e.pageX
    const currentTime = Date.now()
    const deltaX = currentX - startX
    const deltaTime = currentTime - lastTime.current
    
    // スクロール更新（感度を上げる）
    galleryRef.current.scrollLeft = scrollLeft - deltaX
    
    // 速度計算
    if (deltaTime > 0) {
      const newVelocity = (currentX - lastX.current) / deltaTime * 16 // 16ms = 60fps
      setVelocity(-newVelocity * 2) // 感度を上げる
    }
    
    lastX.current = currentX
    lastTime.current = currentTime
    
    // 無限スクロールチェック
    checkInfiniteScroll()
  }

  // タッチイベント（改善版）
  const handleTouchStart = (e: React.TouchEvent) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    
    const touch = e.touches[0]
    setIsDragging(true)
    setStartX(touch.pageX)
    setScrollLeft(galleryRef.current?.scrollLeft || 0)
    setVelocity(0)
    lastX.current = touch.pageX
    lastTime.current = Date.now()
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !galleryRef.current) return
    
    const touch = e.touches[0]
    const currentX = touch.pageX
    const currentTime = Date.now()
    const deltaX = currentX - startX
    const deltaTime = currentTime - lastTime.current
    
    // スクロール更新
    galleryRef.current.scrollLeft = scrollLeft - deltaX
    
    // 速度計算
    if (deltaTime > 0) {
      const newVelocity = (currentX - lastX.current) / deltaTime * 16
      setVelocity(-newVelocity * 2)
    }
    
    lastX.current = currentX
    lastTime.current = currentTime
    
    // 無限スクロールチェック
    checkInfiniteScroll()
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <section id="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <div className="section-header">
            <span className="section-label">PROJECTS</span>
            <span className="section-subtitle">プロジェクト</span>
          </div>
          
          <div className="projects-description">
            <p>地方から生まれる新しい価値創造。教育・技術・地域をつなぎ、<br />大崎から未来を切り拓く5つの挑戦をご紹介します。</p>
          </div>
          
          <div className="nav-buttons">
            <button 
              className="nav-btn prev-btn" 
              aria-label="前へ"
              onClick={handlePrev}
            >
              ←
            </button>
            <button 
              className="nav-btn next-btn" 
              aria-label="次へ"
              onClick={handleNext}
            >
              →
            </button>
          </div>
        </div>
        
        <div 
          className={`projects-gallery ${isDragging ? 'dragging' : ''}`}
          ref={galleryRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onScroll={() => checkInfiniteScroll()}
        >
          <div 
            className="gallery-track"
          >
            {projects.map((project, index) => (
              <div key={`${project.id}-${index}`} className={`project-card ${project.id}`}>
                <div 
                  className="card-image"
                  style={{ backgroundImage: `url(${project.image})` }}
                >
                  <div className="card-text-content">
                    <div className="main-heading">{project.title}</div>
                  </div>
                  <div className="sub-heading">{project.subtitle}</div>
                  <div className="bottom-caption">{project.description}</div>
                  <div className="card-button">
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="projects-cta">
          <a href="#" className="view-more-btn-dark">
            <span>COMING SOON</span>
            <div className="btn-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}