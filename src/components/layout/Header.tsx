'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <header id="header">
        <div className="header-container">
          <div className="logo">
            <Image
              src="/assets/images/logo.png"
              alt="Kanauuu"
              width={40}
              height={40}
            />
            <span className="logo-text">Kanauuu</span>
          </div>
          
          <nav className="nav-menu">
            <ul>
              <li><a href="#about-section">ABOUT<span>私たちについて</span></a></li>
              <li><a href="#mission-section">OUR CORE<span>私たちの軸</span></a></li>
              <li><a href="#projects-section">PROJECTS<span>プロジェクト</span></a></li>
              <li><a href="#news-section">NEWS<span>お知らせ</span></a></li>
              <li><a href="#team-section">OUR TEAM<span>私たちのチーム</span></a></li>
              <li><a href="#contact-section">CONTACT<span>お問い合わせ</span></a></li>
            </ul>
          </nav>
          
          <button className="hamburger-menu" aria-label="メニューを開く">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
          
          <div className="mobile-menu-overlay">
            <nav className="mobile-nav">
              <ul>
                <li><a href="#about-section">ABOUT<span>私たちについて</span></a></li>
                <li><a href="#mission-section">OUR CORE<span>私たちの軸</span></a></li>
                <li><a href="#projects-section">PROJECTS<span>プロジェクト</span></a></li>
                <li><a href="#news-section">NEWS<span>お知らせ</span></a></li>
                <li><a href="#team-section">OUR TEAM<span>私たちのチーム</span></a></li>
                <li><a href="#contact-section">CONTACT<span>お問い合わせ</span></a></li>
              </ul>
            </nav>
          </div>
          
          <div className="header-contact">
            <a href="#contact-section" className="contact-btn">
              <span className="btn-text">CONTACT</span>
              <span className="btn-subtext">お問い合わせ</span>
            </a>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header id="header">
      <div className="header-container">
        <Link href="/" className="logo">
          <Image
            src="/assets/images/logo.png"
            alt="Kanauuu"
            width={40}
            height={40}
          />
          <span className="logo-text">Kanauuu</span>
        </Link>
        
        <nav className="nav-menu">
          <ul>
            <li><a href="#about-section">ABOUT<span>私たちについて</span></a></li>
            <li><a href="#mission-section">OUR CORE<span>私たちの軸</span></a></li>
            <li><a href="#projects-section">PROJECTS<span>プロジェクト</span></a></li>
            <li><a href="#news-section">NEWS<span>お知らせ</span></a></li>
            <li><a href="#team-section">OUR TEAM<span>私たちのチーム</span></a></li>
            <li><a href="#contact-section">CONTACT<span>お問い合わせ</span></a></li>
          </ul>
        </nav>
        
        {/* ハンバーガーメニューボタン */}
        <button 
          className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
          aria-label="メニューを開く"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        
        {/* モバイルメニューオーバーレイ */}
        <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}>
          <nav className="mobile-nav">
            <ul>
              <li><a href="#about-section" onClick={() => setIsMenuOpen(false)}>ABOUT<span>私たちについて</span></a></li>
              <li><a href="#mission-section" onClick={() => setIsMenuOpen(false)}>OUR CORE<span>私たちの軸</span></a></li>
              <li><a href="#projects-section" onClick={() => setIsMenuOpen(false)}>PROJECTS<span>プロジェクト</span></a></li>
              <li><a href="#news-section" onClick={() => setIsMenuOpen(false)}>NEWS<span>お知らせ</span></a></li>
              <li><a href="#team-section" onClick={() => setIsMenuOpen(false)}>OUR TEAM<span>私たちのチーム</span></a></li>
              <li><a href="#contact-section" onClick={() => setIsMenuOpen(false)}>CONTACT<span>お問い合わせ</span></a></li>
            </ul>
          </nav>
        </div>
        
        <div className="header-contact">
          <a href="#contact-section" className="contact-btn">
            <span className="btn-text">CONTACT</span>
            <span className="btn-subtext">お問い合わせ</span>
          </a>
        </div>
      </div>
    </header>
  )
}