// Sanity設定
const sanityConfig = {
    projectId: 'rt90f87e', // HandlessCMSプロジェクトID
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: true
};

// Sanityクライアントの初期化
const sanityClient = window.sanityClient ? window.sanityClient(sanityConfig) : null;

// ニュースデータを取得してUIに反映
async function loadNewsFromSanity() {
    const newsListEl = document.getElementById('news-list');
    const newsLoadingEl = document.getElementById('news-loading');
    const newsFallbackEl = document.getElementById('news-fallback');
    
    if (!sanityClient) {
        console.warn('Sanity client not available, showing fallback news');
        showFallbackNews();
        return;
    }
    
    try {
        // Sanityからニュース（投稿）データを取得
        const query = `*[_type == "post"] | order(publishedAt desc)[0...4] {
            title,
            publishedAt,
            slug,
            excerpt
        }`;
        
        const posts = await sanityClient.fetch(query);
        
        if (posts && posts.length > 0) {
            displayNews(posts);
        } else {
            console.warn('No posts found, showing fallback news');
            showFallbackNews();
        }
    } catch (error) {
        console.error('Sanity fetch error:', error);
        showFallbackNews();
    }
}

// ニュースを表示する関数
function displayNews(posts) {
    const newsListEl = document.getElementById('news-list');
    const newsLoadingEl = document.getElementById('news-loading');
    
    // ローディングを非表示
    if (newsLoadingEl) {
        newsLoadingEl.style.display = 'none';
    }
    
    // ニュース一覧を生成
    const newsHTML = posts.map(post => {
        const date = new Date(post.publishedAt);
        const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
        
        return `
            <article class="news-item">
                <time class="news-date">${formattedDate}</time>
                <h3 class="news-title-item">${post.title}</h3>
            </article>
        `;
    }).join('');
    
    newsListEl.innerHTML = newsHTML;
}

// フォールバック表示
function showFallbackNews() {
    const newsLoadingEl = document.getElementById('news-loading');
    const newsFallbackEl = document.getElementById('news-fallback');
    
    if (newsLoadingEl) {
        newsLoadingEl.style.display = 'none';
    }
    
    if (newsFallbackEl) {
        newsFallbackEl.style.display = 'block';
    }
}

// ローディングとマウスストーカー
document.addEventListener('DOMContentLoaded', function() {
    // Sanityからニュースを読み込み
    loadNewsFromSanity();
    // ローディングアニメーション制御
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;
    const subText = document.querySelector('.sub-text');
    
    // ローディング完了処理
    function completeLoading() {
        setTimeout(() => {
            // ローディングテキストをMVの位置に移動
            const loadingText = document.querySelector('.loading-text');
            const mvContainer = document.querySelector('.mv-container');
            
            if (loadingText && mvContainer && subText) {
                // 他の要素を先にフェードアウト
                const loadingProgress = document.querySelector('.loading-progress');
                const loadingSubtitle = document.querySelector('.loading-subtitle');
                
                if (loadingProgress) {
                    loadingProgress.style.opacity = '0';
                    loadingProgress.style.transition = 'opacity 0.3s ease';
                }
                if (loadingSubtitle) {
                    loadingSubtitle.style.opacity = '0';
                    loadingSubtitle.style.transition = 'opacity 0.3s ease';
                }
                
                setTimeout(() => {
                    // MVコンテナの位置を計算
                    const subTextRect = subText.getBoundingClientRect();
                    const loadingRect = loadingText.getBoundingClientRect();
                    
                    // 移動距離を計算
                    const deltaX = subTextRect.left - loadingRect.left;
                    const deltaY = subTextRect.top - loadingRect.top;
                    
                    // ローディングテキストを移動開始
                    loadingText.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.85)`;
                    loadingText.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';
                    
                    // 背景も同時にフェードアウト開始
                    setTimeout(() => {
                        loadingScreen.style.opacity = '0';
                        loadingScreen.style.transition = 'opacity 0.6s ease';
                    }, 200);
                    
                    // 移動完了後の処理
                    setTimeout(() => {
                        body.classList.remove('loading');
                        
                        // MVのKANAUUUを表示
                        subText.classList.add('show');
                        
                        // ローディング画面を完全に削除
                        setTimeout(() => {
                            loadingScreen.style.display = 'none';
                        }, 600);
                    }, 800);
                }, 150);
            }
        }, 2200); // 2.2秒後にスライド開始
    }
    
    // ページロード完了を待つ
    if (document.readyState === 'complete') {
        completeLoading();
    } else {
        window.addEventListener('load', completeLoading);
    }



    // ミッションセクションのホバー効果
    const missionItems = document.querySelectorAll('.mission-item');
    const missionImages = document.querySelectorAll('.mission-image');
    
    missionItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const category = this.getAttribute('data-category');
            
            // 全てのアイテムからactiveクラスを削除
            missionItems.forEach(item => item.classList.remove('active'));
            missionImages.forEach(img => img.classList.remove('active'));
            
            // 現在のアイテムにactiveクラスを追加
            this.classList.add('active');
            
            // 対応する画像にactiveクラスを追加
            const targetImage = document.querySelector(`.mission-image[data-category="${category}"]`);
            if (targetImage) {
                targetImage.classList.add('active');
            }
        });
        
        // クリック時の動作も同様に
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // 全てのアイテムからactiveクラスを削除
            missionItems.forEach(item => item.classList.remove('active'));
            missionImages.forEach(img => img.classList.remove('active'));
            
            // 現在のアイテムにactiveクラスを追加
            this.classList.add('active');
            
            // 対応する画像にactiveクラスを追加
            const targetImage = document.querySelector(`.mission-image[data-category="${category}"]`);
            if (targetImage) {
                targetImage.classList.add('active');
            }
        });
    });

    // Projectsスライダー機能（無限ループ版）
    const galleryTrack = document.querySelector('.gallery-track');
    const projectCards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (galleryTrack && projectCards.length > 0) {
        let currentIndex = 0;
        const totalCards = projectCards.length;
        let isTransitioning = false;
        let clonedForward = [];
        let clonedBackward = [];
        
        // 無限ループ用のクローンを作成
        function createInfiniteLoop() {
            // 既存のクローンをクリア
            clonedForward.forEach(clone => clone.remove());
            clonedBackward.forEach(clone => clone.remove());
            clonedForward = [];
            clonedBackward = [];
            
            // 元のカードを配列として取得
            const originalCards = Array.from(document.querySelectorAll('.project-card'));
            
            // 後ろにクローンを追加
            originalCards.forEach(card => {
                const clone = card.cloneNode(true);
                clone.classList.add('cloned');
                // クローンカードにも適切なスタイルを設定
                gsap.set(clone, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)"
                });
                galleryTrack.appendChild(clone);
                clonedForward.push(clone);
            });
            
            // 前にクローンを追加
            originalCards.reverse().forEach(card => {
                const clone = card.cloneNode(true);
                clone.classList.add('cloned');
                // クローンカードにも適切なスタイルを設定
                gsap.set(clone, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)"
                });
                galleryTrack.insertBefore(clone, galleryTrack.firstChild);
                clonedBackward.unshift(clone);
            });
            
            // インデックスを調整（元のカードが見えるように）
            currentIndex = totalCards;
        }
        
        // 画面サイズに応じた設定を取得
        function getSliderSettings() {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1200) {
                return { 
                    cardWidth: 320, 
                    gap: 20, 
                    visibleCards: 3
                };
            } else if (screenWidth >= 768) {
                return { 
                    cardWidth: 300, 
                    gap: 20, 
                    visibleCards: 2
                };
            } else {
                // モバイルサイズを調整 - ビューポート幅に基づいて計算
                const vw = window.innerWidth;
                let padding, gap;
                
                if (vw <= 375) {
                    padding = 64; // 375px以下: 16px * 4
                    gap = 12;
                } else {
                    padding = 80; // 768px以下: 20px * 4  
                    gap = 16;
                }
                
                const cardWidth = Math.max(280, vw - padding);
                return { 
                    cardWidth: cardWidth, 
                    gap: gap, 
                    visibleCards: 1
                };
            }
        }
        
        // スライダー位置を更新
        function updateSlider(smooth = true, isTouchInput = false) {
            const settings = getSliderSettings();
            const translateX = -currentIndex * (settings.cardWidth + settings.gap);
            
            if (smooth && !isTransitioning) {
                // タッチ操作時は高速、ボタン操作時は滑らか
                const duration = isTouchInput ? 300 : 600;
                const easing = isTouchInput ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'cubic-bezier(0.23, 1, 0.32, 1)';
                
                galleryTrack.style.transition = `transform ${duration}ms ${easing}`;
                isTransitioning = true;
                setTimeout(() => {
                    isTransitioning = false;
                }, duration);
            } else {
                galleryTrack.style.transition = 'none';
            }
            
            galleryTrack.style.transform = `translateX(${translateX}px)`;
            
            // 無限ループのための境界チェック
            if (smooth) {
                const duration = isTouchInput ? 300 : 600;
                setTimeout(() => {
                    if (currentIndex >= totalCards * 2) {
                        currentIndex = totalCards;
                        galleryTrack.style.transition = 'none';
                        galleryTrack.style.transform = `translateX(${-currentIndex * (settings.cardWidth + settings.gap)}px)`;
                    } else if (currentIndex <= 0) {
                        currentIndex = totalCards;
                        galleryTrack.style.transition = 'none';
                        galleryTrack.style.transform = `translateX(${-currentIndex * (settings.cardWidth + settings.gap)}px)`;
                    }
                }, duration);
            }
        }
        
        // 次へ
        function nextSlide(isTouchInput = false) {
            if (isTransitioning) return;
            currentIndex++;
            updateSlider(true, isTouchInput);
        }
        
        // 前へ
        function prevSlide(isTouchInput = false) {
            if (isTransitioning) return;
            currentIndex--;
            updateSlider(true, isTouchInput);
        }
        
        // ボタンイベント
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        // タッチ/スワイプ＆マウスドラッグ操作
        let startX = 0;
        let startY = 0;
        let isDragging = false;
        let hasMoved = false;
        let isMouseDown = false;
        
        // タッチイベント
        galleryTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
            hasMoved = false;
        }, { passive: true });
        
        galleryTrack.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const deltaX = Math.abs(e.touches[0].clientX - startX);
            const deltaY = Math.abs(e.touches[0].clientY - startY);
            
            if (deltaX > deltaY && deltaX > 10) {
                e.preventDefault();
                hasMoved = true;
            }
        }, { passive: false });
        
        galleryTrack.addEventListener('touchend', (e) => {
            if (!isDragging || !hasMoved) {
                isDragging = false;
                return;
            }
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide(true);
                } else {
                    prevSlide(true);
                }
            }
            
            isDragging = false;
            hasMoved = false;
        }, { passive: true });
        
        // マウスドラッグイベント（PC用）
        galleryTrack.addEventListener('mousedown', (e) => {
            e.preventDefault();
            startX = e.clientX;
            startY = e.clientY;
            isMouseDown = true;
            hasMoved = false;
            galleryTrack.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            
            const deltaX = Math.abs(e.clientX - startX);
            const deltaY = Math.abs(e.clientY - startY);
            
            if (deltaX > deltaY && deltaX > 10) {
                hasMoved = true;
            }
        });
        
        document.addEventListener('mouseup', (e) => {
            if (!isMouseDown) return;
            
            galleryTrack.style.cursor = 'grab';
            
            if (hasMoved) {
                const endX = e.clientX;
                const diff = startX - endX;
                
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        nextSlide(true);
                    } else {
                        prevSlide(true);
                    }
                }
            }
            
            isMouseDown = false;
            hasMoved = false;
        });
        
        // マウスがエリアを離れた時の処理
        galleryTrack.addEventListener('mouseleave', () => {
            if (isMouseDown) {
                galleryTrack.style.cursor = 'grab';
                isMouseDown = false;
                hasMoved = false;
            }
        });
        
        // 画面リサイズ時の更新
        window.addEventListener('resize', () => {
            createInfiniteLoop();
            updateSlider(false);
        });
        
        // 初期化
        createInfiniteLoop();
        updateSlider(false);
    }
    
    
    
    // Teamセクションのアウトライン描画アニメーション
    const teamSection = document.getElementById('team-section');
    const osakilSvgObject = document.getElementById('osaki-svg-object');
    
    if (teamSection && osakilSvgObject) {
        osakilSvgObject.addEventListener('load', function() {
            try {
                const svgDoc = osakilSvgObject.contentDocument;
                if (svgDoc) {
                    const paths = svgDoc.querySelectorAll('path');
                    
                    // 全てのpathにアニメーション設定
                    paths.forEach((path, index) => {
                        const pathLength = path.getTotalLength();
                        path.style.stroke = 'rgba(255, 255, 255, 0.4)';
                        path.style.strokeWidth = '2';
                        path.style.fill = 'none';
                        path.style.strokeDasharray = pathLength;
                        path.style.strokeDashoffset = pathLength;
                        path.style.transition = `stroke-dashoffset ${3 + index * 0.5}s ease-out`;
                    });
                    
                    const observerOptions = {
                        threshold: 0.3,
                        rootMargin: '0px 0px -100px 0px'
                    };
                    
                    const teamObserver = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                paths.forEach((path, index) => {
                                    setTimeout(() => {
                                        path.style.strokeDashoffset = '0';
                                    }, index * 200);
                                });
                            }
                        });
                    }, observerOptions);
                    
                    teamObserver.observe(teamSection);
                }
            } catch (error) {
                console.log('SVGアニメーションが利用できません:', error);
            }
        });
    }
    
    
    // GSAP ScrollTriggerを登録
    gsap.registerPlugin(ScrollTrigger);

    // MISSION円のサイズを強制的に修正する関数
    function fixMissionCircleSize() {
        if (window.innerWidth > 768) {
            const missionCircle = document.querySelector('.mission-circle');
            if (missionCircle) {
                missionCircle.style.width = '220px';
                missionCircle.style.height = '220px';
                missionCircle.style.minWidth = '220px';
                missionCircle.style.minHeight = '220px';
                missionCircle.style.maxWidth = '220px';
                missionCircle.style.maxHeight = '220px';
                missionCircle.style.transform = 'scale(1)';
                gsap.set(missionCircle, {
                    scale: 1,
                    width: "220px",
                    height: "220px"
                });
            }
        }
    }

    // ページ読み込み時とリサイズ時にサイズを修正
    fixMissionCircleSize();
    window.addEventListener('resize', fixMissionCircleSize);


    // 各セクションのテキスト要素を取得
    const aboutTitle = document.querySelector('.large-title');
    const aboutDescription = document.querySelector('.about-description');
    const teamTitle = document.querySelector('.team-title');
    const teamDescription = document.querySelector('.team-description p');
    const newsDescription = document.querySelector('.news-description p');
    const contactDescription = document.querySelector('.contact-description p');

    // ABOUT セクションアニメーション
    if (aboutTitle) {
        gsap.fromTo(aboutTitle, 
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".about-main-title",
                    start: "top 85%",
                    end: "bottom 70%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }

    if (aboutDescription) {
        gsap.fromTo(aboutDescription,
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                delay: 0.1,
                scrollTrigger: {
                    trigger: ".about-description-section",
                    start: "top 95%",
                    end: "bottom 70%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }

    const circles = document.querySelectorAll('.circle-item');
    if (circles.length > 0) {
        gsap.fromTo(circles,
            {
                opacity: 0,
                y: 20,
                scale: 1
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: "power2.out",
                stagger: 0.08,
                scrollTrigger: {
                    trigger: ".about-circles-section",
                    start: "top 90%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse"
                },
                onComplete: () => {
                    // 全ての circle のテキストをクリアに設定
                    const circleTexts = document.querySelectorAll('.circle-item .circle-content p');
                    circleTexts.forEach(text => {
                        gsap.set(text, {
                            filter: "none",
                            transform: "none",
                            willChange: "auto"
                        });
                    });
                    
                    // PC時に円のサイズを確実に220pxに設定
                    if (window.innerWidth > 768) {
                        const circles = document.querySelectorAll('.circle-item');
                        circles.forEach(circle => {
                            gsap.set(circle, {
                                width: "220px",
                                height: "220px"
                            });
                        });
                        // MISSION円を特別に修正
                        fixMissionCircleSize();
                    }
                }
            }
        );
    }

    // MISSION セクションアニメーション
    gsap.fromTo('.section-header', {
        opacity: 0,
        y: 20
    }, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '#mission-section',
            start: "top 95%",
            end: "bottom 70%",
            toggleActions: "play none none reverse"
        }
    });

    gsap.fromTo('.mission-visual', {
        opacity: 0,
        y: 20
    }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.mission-visual',
            start: "top 90%",
            end: "bottom 60%",
            toggleActions: "play none none reverse"
        }
    });

    gsap.fromTo('.mission-item', {
        opacity: 0,
        y: 20
    }, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: {
            trigger: '.mission-details',
            start: "top 90%",
            end: "bottom 60%",
            toggleActions: "play none none reverse"
        }
    });

    // VALUE section (.value-simple) アニメーション - 文字分割なし
    gsap.fromTo('.value-simple p', {
        opacity: 0,
        y: 20
    }, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.04,
        scrollTrigger: {
            trigger: '.value-simple',
            start: "top 90%",
            end: "bottom 60%",
            toggleActions: "play none none reverse"
        }
    });

    // PROJECTS セクションアニメーション
    gsap.fromTo('.projects-header', {
        opacity: 0,
        y: -80,
        filter: "blur(10px)"
    }, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
            trigger: '#projects-section',
            start: "top 95%",
            end: "bottom 70%",
            toggleActions: "play none none reverse"
        }
    });

    // Project cards animation - only for non-cloned cards to avoid interference
    gsap.fromTo('.project-card:not(.cloned)', {
        opacity: 0,
        y: 100,
        scale: 0.8,
        filter: "blur(15px)"
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.15,
        scrollTrigger: {
            trigger: '.projects-gallery',
            start: "top 90%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
            onComplete: () => {
                // Ensure all cloned cards are also visible
                gsap.set('.project-card.cloned', {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)"
                });
            }
        }
    });

    // NEWS セクションアニメーション
    gsap.fromTo('#news-section .section-header', {
        opacity: 0,
        y: -50
    }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '#news-section',
            start: "top 95%",
            end: "bottom 70%",
            toggleActions: "play none none reverse"
        }
    });

    if (newsDescription) {
        gsap.fromTo(newsDescription, {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.news-description',
                start: "top 90%",
                end: "bottom 60%",
                toggleActions: "play none none reverse"
            }
        });
    }

    gsap.fromTo('.news-item', {
        opacity: 0,
        y: 20
    }, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: {
            trigger: '.news-list',
            start: "top 90%",
            end: "bottom 60%",
            toggleActions: "play none none reverse"
        }
    });

    // TEAM セクションアニメーション
    gsap.fromTo('#team-section .section-header', {
        opacity: 0,
        y: -50
    }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '#team-section',
            start: "top 95%",
            end: "bottom 70%",
            toggleActions: "play none none reverse"
        }
    });

    if (teamTitle) {
        gsap.fromTo(teamTitle, {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.team-title',
                start: "top 90%",
                end: "bottom 60%",
                toggleActions: "play none none reverse"
            }
        });
    }

    if (teamDescription) {
        gsap.fromTo(teamDescription, {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.1,
            scrollTrigger: {
                trigger: '.team-description',
                start: "top 90%",
                end: "bottom 60%",
                toggleActions: "play none none reverse"
            }
        });
    }

    gsap.fromTo('.team-image', {
        opacity: 0,
        y: 20
    }, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.03,
        scrollTrigger: {
            trigger: '.team-gallery',
            start: "top 90%",
            end: "bottom 60%",
            toggleActions: "play none none reverse"
        }
    });

    // CONTACT セクションアニメーション
    gsap.fromTo('#contact-section .section-header', {
        opacity: 0,
        y: -50
    }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '#contact-section',
            start: "top 95%",
            end: "bottom 70%",
            toggleActions: "play none none reverse"
        }
    });

    if (contactDescription) {
        gsap.fromTo(contactDescription, {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.contact-description',
                start: "top 90%",
                end: "bottom 60%",
                toggleActions: "play none none reverse"
            }
        });
    }

    gsap.fromTo('.contact-circle-btn', {
        opacity: 0,
        y: 20
    }, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.contact-button-wrapper',
            start: "top 90%",
            end: "bottom 60%",
            toggleActions: "play none none reverse"
        }
    });

    
    // ヘッダーのスクロール効果
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // ヘッダーの表示/非表示機能を無効化（常に表示）
        // if (currentScrollY > lastScrollY && currentScrollY > 200) {
        //     header.classList.add('hidden');
        // } else {
        //     header.classList.remove('hidden');
        // }
    });
    
    // ハンバーガーメニュー機能
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    // ハンバーガーメニューボタンのクリックイベント
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            
            // bodyのスクロールを制御
            if (mobileMenuOverlay.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // モバイルメニューのリンククリック時にメニューを閉じる
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // オーバーレイクリック時にメニューを閉じる
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                hamburgerMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // スムーススクロール機能
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // スムーススクロール機能
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // メインビジュアルの背景スライダー
    const slides = document.querySelectorAll('.mv-slide');
    const slideDots = document.querySelectorAll('.slide-dot');
    const progressBar = document.querySelector('.slide-progress-bar');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        let isTransitioning = false;
        
        // 背景画像を設定
        slides.forEach((slide, index) => {
            const bgUrl = slide.getAttribute('data-bg');
            slide.style.backgroundImage = `url(${bgUrl})`;
        });
        
        function updateSlideIndicators() {
            // ドットのアクティブ状態を更新
            slideDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
            
            // プログレスバーのアニメーションをリセット
            if (progressBar) {
                progressBar.style.animation = 'none';
                setTimeout(() => {
                    progressBar.style.animation = 'progressAnimationHorizontal 4s linear infinite';
                }, 10);
            }
        }
        
        function nextSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            
            const currentSlideEl = slides[currentSlide];
            const nextSlideIndex = (currentSlide + 1) % slides.length;
            const nextSlideEl = slides[nextSlideIndex];
            
            // 現在のスライドをフェードアウト
            currentSlideEl.classList.add('prev');
            currentSlideEl.classList.remove('active');
            
            // 次のスライドをプリセット
            nextSlideEl.classList.add('next');
            
            // 少し遅延して次のスライドをアクティブに
            setTimeout(() => {
                nextSlideEl.classList.remove('next');
                nextSlideEl.classList.add('active');
            }, 50);
            
            // アニメーション完了後のクリーンアップ
            setTimeout(() => {
                currentSlideEl.classList.remove('prev');
                currentSlide = nextSlideIndex;
                updateSlideIndicators();
                isTransitioning = false;
            }, 300);
        }
        
        function goToSlide(index) {
            if (isTransitioning || index === currentSlide) return;
            isTransitioning = true;
            
            const currentSlideEl = slides[currentSlide];
            const targetSlideEl = slides[index];
            
            currentSlideEl.classList.remove('active');
            targetSlideEl.classList.add('active');
            
            setTimeout(() => {
                currentSlide = index;
                updateSlideIndicators();
                isTransitioning = false;
            }, 300);
        }
        
        // ドットクリックイベント
        slideDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        // 初期化
        updateSlideIndicators();
        
        // 4秒ごとにスライド切り替え（アニメーション時間を考慮）
        const slideInterval = setInterval(nextSlide, 4000);
        
        // プリロードでスムーズな表示
        const preloadImages = [];
        slides.forEach((slide, index) => {
            const img = new Image();
            img.src = slide.getAttribute('data-bg');
            preloadImages.push(img);
        });
        
        // パララックス効果を削除（白色空間の原因となるため）
        // window.addEventListener('scroll', () => {
        //     const scrolled = window.pageYOffset;
        //     const activeSlide = document.querySelector('.mv-slide.active');
        //     if (activeSlide) {
        //         const speed = 0.5;
        //         activeSlide.style.transform = `scale(1) translateY(${scrolled * speed}px)`;
        //     }
        // });
    }
});