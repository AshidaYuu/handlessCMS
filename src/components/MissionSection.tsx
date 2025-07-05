'use client'

import { useState } from 'react'

export default function MissionSection() {
  const [activeItem, setActiveItem] = useState('mission')

  const handleItemClick = (item: string) => {
    setActiveItem(item)
  }

  return (
    <section id="mission-section">
      <div className="mission-container">
        <div className="section-header">
          <span className="section-label">OUR CORE</span>
          <span className="section-subtitle">私たちの軸</span>
        </div>
        
        <div className="mission-content-wrapper">
          <div className="mission-visual">
            <div className="mission-images">
              <div 
                className={`mission-image mission-img-1 ${activeItem === 'mission' ? 'active' : ''}`} 
                data-category="mission"
              >
                <div className="image-placeholder mission-bg"></div>
              </div>
              <div 
                className={`mission-image mission-img-2 ${activeItem === 'vision' ? 'active' : ''}`} 
                data-category="vision"
              >
                <div className="image-placeholder vision-bg"></div>
              </div>
              <div 
                className={`mission-image mission-img-3 ${activeItem === 'value' ? 'active' : ''}`} 
                data-category="value"
              >
                <div className="image-placeholder value-bg"></div>
              </div>
            </div>
          </div>
          
          <div className="mission-details">
            <div 
              className={`mission-item ${activeItem === 'mission' ? 'active' : ''}`} 
              data-category="mission"
              onClick={() => handleItemClick('mission')}
            >
              <div className="item-header">
                <div className="item-header-content">
                  <h3>MISSION</h3>
                  <div className="mobile-mini-image mission-bg"></div>
                </div>
                <div className="expand-btn">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="item-content">
                <h4>「挑戦する人の背中を押し、夢を叶える土壌をつくる」</h4>
                <p>子どもも大人も、どこにいても、最新の学びとテクノロジーにアクセスできる社会を大崎から広げます。</p>
              </div>
            </div>
            
            <div 
              className={`mission-item ${activeItem === 'vision' ? 'active' : ''}`} 
              data-category="vision"
              onClick={() => handleItemClick('vision')}
            >
              <div className="item-header">
                <div className="item-header-content">
                  <h3>VISION</h3>
                  <div className="mobile-mini-image vision-bg"></div>
                </div>
                <div className="expand-btn">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="item-content">
                <h4>「地方発イノベーションの交差点になる」</h4>
                <p>教育現場・企業・クリエイターがつながり、アイデアが循環する&ldquo;挑戦のエコシステム&rdquo;を育みます。</p>
              </div>
            </div>
            
            <div 
              className={`mission-item ${activeItem === 'value' ? 'active' : ''}`} 
              data-category="value"
              onClick={() => handleItemClick('value')}
            >
              <div className="item-header">
                <div className="item-header-content">
                  <h3>VALUE</h3>
                  <div className="mobile-mini-image value-bg"></div>
                </div>
                <div className="expand-btn">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="item-content">
                <h4>「Warm - Future - Local Pride」</h4>
                <div className="value-simple">
                  <p><strong>1) 伴走者として寄り添う温かさ</strong></p>
                  <p><strong>2) 常に一歩先を取り入れる未来志向</strong></p>
                  <p><strong>3) 故郷を誇り、地域と共に歩む姿勢</strong></p>
                </div>
              </div>
            </div>
            
            <div className="view-more-section">
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
        </div>
      </div>
    </section>
  )
}