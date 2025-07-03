// ニュース一覧ページのJavaScript
// 既存のニュース機能を壊さずに、一覧表示機能を追加

// 静的JSONからニュースデータを取得（既存機能と同じ方式）
async function fetchNewsData() {
    try {
        console.log('🔍 ニュースデータを取得中...');
        const response = await fetch('./news-data.json');
        
        if (!response.ok) {
            throw new Error('ニュースデータの読み込みに失敗');
        }
        
        const data = await response.json();
        console.log('✅ ニュースデータ取得成功:', data);
        return data;
    } catch (error) {
        console.error('❌ ニュースデータ取得エラー:', error);
        throw error;
    }
}

// 日付フォーマット関数（既存のフォーマットと統一）
function formatDate(dateString) {
    if (!dateString) return '日付不明';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '日付不明';
    
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
}

// ニュース一覧を表示
function displayNewsList(posts) {
    // ローディングを非表示
    const loadingEl = document.getElementById('news-list-loading');
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
    
    const containerEl = document.getElementById('news-list-container');
    const emptyEl = document.getElementById('news-list-empty');
    
    if (!containerEl) {
        console.error('❌ ニュース一覧コンテナが見つかりません');
        showErrorState();
        return;
    }
    
    // 投稿がない場合
    if (!posts || posts.length === 0) {
        if (emptyEl) {
            emptyEl.style.display = 'block';
        }
        return;
    }
    
    // ニュース一覧HTMLを生成
    const newsHTML = posts.map(post => {
        const formattedDate = formatDate(post.publishedAt);
        const slug = post.slug ? post.slug.current : '';
        const title = post.title || 'タイトルなし';
        const excerpt = post.excerpt || '';
        
        return `
            <article class="news-list-item">
                <div class="news-list-item-content">
                    <time class="news-list-date">${formattedDate}</time>
                    <h2 class="news-list-title">
                        <a href="news-detail.html?slug=${encodeURIComponent(slug)}" class="news-list-link">
                            ${title}
                        </a>
                    </h2>
                    ${excerpt ? `<p class="news-list-excerpt">${excerpt}</p>` : ''}
                </div>
                <div class="news-list-item-meta">
                    <a href="news-detail.html?slug=${encodeURIComponent(slug)}" class="news-list-read-more">
                        詳細を見る →
                    </a>
                </div>
            </article>
        `;
    }).join('');
    
    containerEl.innerHTML = newsHTML;
    containerEl.style.display = 'block';
    
    console.log(`✅ ${posts.length}件のニュースを表示しました`);
}

// エラー状態を表示
function showErrorState() {
    const loadingEl = document.getElementById('news-list-loading');
    const errorEl = document.getElementById('news-list-error');
    
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
    
    if (errorEl) {
        errorEl.style.display = 'block';
    }
    
    console.log('❌ エラー状態を表示');
}

// ニュース一覧ページの初期化
async function initNewsList() {
    try {
        console.log('📄 ニュース一覧を初期化中...');
        
        // ニュースデータを取得
        const posts = await fetchNewsData();
        
        // 投稿日順にソート（新しい順）
        const sortedPosts = posts.sort((a, b) => {
            const dateA = new Date(a.publishedAt || 0);
            const dateB = new Date(b.publishedAt || 0);
            return dateB.getTime() - dateA.getTime();
        });
        
        // ニュース一覧を表示
        displayNewsList(sortedPosts);
        
    } catch (error) {
        console.error('❌ ニュース一覧の初期化エラー:', error);
        showErrorState();
    }
}

// モバイルメニューの処理（既存機能と統一）
function initMobileMenu() {
    const menuBtn = document.querySelector('.header-menu-btn');
    const nav = document.querySelector('.header-nav');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
}

// スムーススクロール（既存機能と統一）
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ページ読み込み完了時に初期化
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 ニュース一覧ページを初期化中...');
    initNewsList();
    initMobileMenu();
    initSmoothScroll();
});

// エクスポート（デバッグ用）
window.newsListFunctions = {
    fetchNewsData,
    formatDate,
    displayNewsList,
    showErrorState,
    initNewsList
};