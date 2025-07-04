'use client'

import { useEffect } from 'react'

export function useAnimations() {
  useEffect(() => {
    // Ensure body has loading class initially
    document.body.classList.add('loading')

    // Mission section accordion
    const missionItems = document.querySelectorAll('.mission-item')
    const missionImages = document.querySelectorAll('.mission-image')
    
    missionItems.forEach((item, index) => {
      const header = item.querySelector('.item-header')
      
      header?.addEventListener('click', () => {
        // 他のアイテムを閉じる
        missionItems.forEach((otherItem, otherIndex) => {
          if (otherIndex !== index) {
            otherItem.classList.remove('active')
          }
        })
        
        // 画像を切り替え
        missionImages.forEach((img, imgIndex) => {
          img.classList.toggle('active', imgIndex === index)
        })
        
        // 現在のアイテムをトグル
        item.classList.toggle('active')
      })
    })

    // Team gallery animation
    const galleryRows = document.querySelectorAll('.gallery-row')
    galleryRows.forEach((row, index) => {
      const isEven = index % 2 === 0
      const animationDuration = 30 + (index * 5)
      
      row.setAttribute('style', `animation-duration: ${animationDuration}s; animation-direction: ${isEven ? 'normal' : 'reverse'}`)
    })

    // Scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        }
      })
    }, observerOptions)

    // Observe elements
    document.querySelectorAll('.fade-in, .title-animation').forEach(el => {
      observer.observe(el)
    })

    return () => {
      observer.disconnect()
    }
  }, [])
}