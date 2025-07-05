// ローディングとマウスストーカー
document.addEventListener('DOMContentLoaded', function() {
    // ローディングアニメーション制御
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;
    const subText = document.querySelector('.sub-text');
    
    // ローディング完了処理
    function completeLoading() {
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 1s ease';
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    if (body) {
                        body.classList.remove('loading');
                    }
                }, 1000);
            }
        }, 2000); // ローディング表示時間
    }
    
    // ローディング開始
    completeLoading();
    
    // ページ内リンクのスムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80; // ヘッダーの高さ分
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ハンバーガーメニュー制御
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    let isMenuOpen = false;
    
    if (hamburgerMenu && mobileMenuOverlay) {
        hamburgerMenu.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                hamburgerMenu.classList.add('active');
                mobileMenuOverlay.classList.add('active');
                body.style.overflow = 'hidden';
            } else {
                hamburgerMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        // メニューリンククリックで閉じる
        mobileMenuOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                isMenuOpen = false;
                hamburgerMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }

    // GSAPアニメーション
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // フェードインアニメーション
        gsap.utils.toArray('.fade-in').forEach(element => {
            gsap.fromTo(element, 
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 80%',
                        once: true
                    }
                }
            );
        });

        // タイトルアニメーション
        gsap.utils.toArray('.title-animation').forEach(element => {
            gsap.fromTo(element,
                {
                    opacity: 0,
                    x: -50
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 80%',
                        once: true
                    }
                }
            );
        });
    }

    // Main Visual Slider - 少し遅延させて確実に要素を取得
    setTimeout(() => {
        const slides = document.querySelectorAll('.mv-slide');
        const dots = document.querySelectorAll('.slide-dot');
        const progressBar = document.querySelector('.slide-progress-bar');
        let currentSlide = 0;
        const slideInterval = 4000; // 4秒
        let autoSlideTimer;
        
        console.log('Slides found:', slides.length);
        console.log('Dots found:', dots.length);
        console.log('Progress bar found:', !!progressBar);
        
        // sub-textを表示
        const subText = document.querySelector('.sub-text');
        if (subText) {
            subText.classList.add('show');
        }
        
        function showSlide(index) {
            console.log('Showing slide:', index);
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            resetProgress();
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            console.log('Next slide:', currentSlide);
            showSlide(currentSlide);
        }
        
        function resetProgress() {
            if (progressBar) {
                progressBar.style.animation = 'none';
                setTimeout(() => {
                    progressBar.style.animation = `progressAnimationHorizontal ${slideInterval}ms linear`;
                }, 10);
            }
        }
        
        function startAutoSlide() {
            console.log('Starting auto slide');
            autoSlideTimer = setInterval(nextSlide, slideInterval);
        }
        
        function stopAutoSlide() {
            console.log('Stopping auto slide');
            clearInterval(autoSlideTimer);
        }
        
        // Dot click events
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                console.log('Dot clicked:', index);
                currentSlide = index;
                showSlide(currentSlide);
                stopAutoSlide();
                startAutoSlide();
            });
        });
        
        // Initialize slider
        if (slides.length > 0) {
            console.log('Initializing slider with', slides.length, 'slides');
            showSlide(currentSlide);
            startAutoSlide();
        } else {
            console.error('No slides found!');
        }
    }, 1000); // 1秒遅延

    // プロジェクトスライダー
    const projectPrev = document.querySelector('.prev-btn');
    const projectNext = document.querySelector('.next-btn');
    const galleryTrack = document.querySelector('.gallery-track');
    let currentPosition = 0;
    
    if (projectPrev && projectNext && galleryTrack) {
        const cardWidth = 320; // カード幅 + gap
        const maxScroll = galleryTrack.scrollWidth - galleryTrack.parentElement.offsetWidth;
        
        projectPrev.addEventListener('click', () => {
            currentPosition = Math.max(0, currentPosition - cardWidth);
            galleryTrack.style.transform = `translateX(-${currentPosition}px)`;
        });
        
        projectNext.addEventListener('click', () => {
            currentPosition = Math.min(maxScroll, currentPosition + cardWidth);
            galleryTrack.style.transform = `translateX(-${currentPosition}px)`;
        });
    }

    // チームギャラリー無限スクロール
    const galleryRows = document.querySelectorAll('.gallery-row');
    
    galleryRows.forEach((row, index) => {
        const isEven = index % 2 === 0;
        const animationDuration = 30 + (index * 5);
        
        row.style.animationDuration = `${animationDuration}s`;
        row.style.animationDirection = isEven ? 'normal' : 'reverse';
    });
});

// アニメーションキーフレーム定義
const style = document.createElement('style');
style.textContent = `
@keyframes slideProgress {
    from { width: 0%; }
    to { width: 100%; }
}
`;
document.head.appendChild(style);