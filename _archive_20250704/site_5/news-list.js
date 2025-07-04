// ニュース一覧ページ
async function fetchNewsData() {
    // すべての記事を取得（ページネーション用）
    const query = `*[_type == "post"] | order(publishedAt desc) {
        title,
        publishedAt,
        slug,
        excerpt,
        _id,
        _createdAt,
        _updatedAt
    }`;
    
    return await fetchFromSanity(query);
}

// 日付フォーマット関数（既存のフォーマットと統一）
function formatDate(dateString) {
    if (!dateString) return '日付不明';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '日付不明';
    
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
}

// ページネーション設定
const ITEMS_PER_PAGE = 10;
let currentPage = 1;
let allPosts = [];

// ニュース一覧を表示
function displayNewsList(posts, page = 1) {
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
    
    // ページネーション計算
    const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
    currentPage = Math.max(1, Math.min(page, totalPages));
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentPosts = posts.slice(startIndex, endIndex);
    
    // ニュース一覧HTMLを生成
    const newsHTML = currentPosts.map((post, index) => {
        const formattedDate = formatDate(post.publishedAt);
        const slug = post.slug ? post.slug.current : '';
        const title = post.title || 'タイトルなし';
        const excerpt = post.excerpt || '';
        
        return `
            <article class="news-list-item news-fade-in" style="animation-delay: ${index * 0.1}s">
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
    
    // ページネーションHTMLを生成
    const paginationHTML = createPagination(totalPages, currentPage);
    
    // HTMLを挿入
    containerEl.innerHTML = `
        <div class="news-list-articles">
            ${newsHTML}
        </div>
        ${posts.length > ITEMS_PER_PAGE ? paginationHTML : ''}
    `;
    
    // ページネーションのイベントリスナーを設定
    attachPaginationListeners();
    
    console.log(`✅ ${posts.length}件中 ${currentPosts.length}件のニュースを表示しました（ページ ${currentPage}/${totalPages}）`);
}

// ページネーションHTML生成
function createPagination(totalPages, currentPage) {
    if (totalPages <= 1) return '';
    
    let paginationHTML = '<nav class="news-pagination" aria-label="ページナビゲーション">';
    
    // 前へボタン
    paginationHTML += `
        <button class="pagination-btn pagination-prev" 
                ${currentPage === 1 ? 'disabled' : ''} 
                data-page="${currentPage - 1}"
                aria-label="前のページ">
            ← 前へ
        </button>
    `;
    
    // ページ番号
    paginationHTML += '<div class="pagination-numbers">';
    
    // ページ番号の表示ロジック
    const maxVisible = 5; // 表示する最大ページ数
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    // 最初のページと省略記号
    if (startPage > 1) {
        paginationHTML += `<button class="pagination-number" data-page="1">1</button>`;
        if (startPage > 2) {
            paginationHTML += `<span class="pagination-ellipsis">...</span>`;
        }
    }
    
    // ページ番号
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="pagination-number ${i === currentPage ? 'active' : ''}" 
                    data-page="${i}"
                    ${i === currentPage ? 'aria-current="page"' : ''}>
                ${i}
            </button>
        `;
    }
    
    // 最後のページと省略記号
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<span class="pagination-ellipsis">...</span>`;
        }
        paginationHTML += `<button class="pagination-number" data-page="${totalPages}">${totalPages}</button>`;
    }
    
    paginationHTML += '</div>';
    
    // 次へボタン
    paginationHTML += `
        <button class="pagination-btn pagination-next" 
                ${currentPage === totalPages ? 'disabled' : ''} 
                data-page="${currentPage + 1}"
                aria-label="次のページ">
            次へ →
        </button>
    `;
    
    paginationHTML += '</nav>';
    
    return paginationHTML;
}

// ページネーションのイベントリスナー
function attachPaginationListeners() {
    const paginationButtons = document.querySelectorAll('[data-page]');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const page = parseInt(e.target.dataset.page);
            if (!isNaN(page)) {
                // ページトップにスムーススクロール
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // 少し遅延してからページを切り替え（スクロール中の見た目を考慮）
                setTimeout(() => {
                    displayNewsList(allPosts, page);
                }, 300);
            }
        });
    });
}

// エラー状態を表示（無効化）
function showErrorState() {
    const loadingEl = document.getElementById('news-list-loading');
    
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
    
    // エラー表示は行わない
    console.log('❌ エラーが発生しましたが、表示は行いません');
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
        
        // グローバル変数に保存
        allPosts = sortedPosts;
        
        // ニュース一覧を表示
        displayNewsList(sortedPosts);
        
    } catch (error) {
        console.error('❌ ニュース一覧の初期化エラー:', error);
        // エラー表示をしない - 代わりに空の配列で表示
        displayNewsList([]);
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