// ニュース詳細ページ
function getNewsSlugFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('slug');
}

async function fetchNewsData() {
    // 記事詳細用に本文も含めて取得
    const query = `*[_type == "post"] | order(publishedAt desc) {
        title,
        publishedAt,
        slug,
        excerpt,
        body,
        _id,
        _createdAt,
        _updatedAt
    }`;
    
    return await fetchFromSanity(query);
}

// 特定のスラッグでニュース記事を検索
function findNewsBySlug(posts, slug) {
    return posts.find(post => {
        // slugオブジェクトの current プロパティと比較
        return post.slug && post.slug.current === slug;
    });
}

// 日付フォーマット関数（既存のフォーマットと統一）
function formatDate(dateString) {
    if (!dateString) return '日付不明';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '日付不明';
    
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
}

// ニュース詳細を表示
function displayNewsDetail(post) {
    // ローディングを非表示
    const loadingEl = document.getElementById('news-detail-loading');
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
    
    // コンテンツ要素を取得
    const contentEl = document.getElementById('news-detail-content');
    const titleEl = document.getElementById('news-detail-title');
    const dateEl = document.getElementById('news-detail-date');
    const bodyEl = document.getElementById('news-detail-body');
    const breadcrumbTitleEl = document.getElementById('breadcrumb-title');
    
    if (!contentEl || !titleEl || !dateEl || !bodyEl) {
        console.error('❌ 必要な要素が見つかりません');
        showErrorState();
        return;
    }
    
    // タイトルと日付を設定
    titleEl.textContent = post.title || 'タイトルなし';
    dateEl.textContent = formatDate(post.publishedAt);
    
    // パンくずリストのタイトルを更新
    if (breadcrumbTitleEl) {
        breadcrumbTitleEl.textContent = post.title || 'お知らせ';
    }
    
    // ページタイトルを更新
    document.title = `${post.title || 'お知らせ'} - Kanauuu`;
    
    // 記事本文を設定（現在はタイトルと抜粋のみ利用可能）
    let bodyContent = '';
    
    if (post.excerpt) {
        bodyContent = `<p>${post.excerpt}</p>`;
    } else {
        // 抜粋がない場合のデフォルト表示
        bodyContent = `
            <div class="news-default-content">
                <p>この記事の詳細は、Sanity Studio で設定された内容が表示されます。</p>
                <p>現在利用可能な情報：</p>
                <ul>
                    <li><strong>タイトル:</strong> ${post.title}</li>
                    <li><strong>公開日:</strong> ${formatDate(post.publishedAt)}</li>
                    <li><strong>スラッグ:</strong> ${post.slug ? post.slug.current : '不明'}</li>
                </ul>
                <p class="news-detail-note">
                    <em>※ より詳細な記事内容を表示するには、Sanity Studio で記事の本文を設定してください。</em>
                </p>
            </div>
        `;
    }
    
    bodyEl.innerHTML = bodyContent;
    
    // コンテンツを表示（元から表示されているので不要だが念のため）
    // contentEl.style.display = 'block';
    
    console.log('✅ ニュース詳細表示完了:', post.title);
}

// エラー状態を表示（無効化）
function showErrorState() {
    const loadingEl = document.getElementById('news-detail-loading');
    
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
    
    // エラー表示は行わない
    console.log('❌ エラーが発生しましたが、表示は行いません');
}

// ニュース詳細ページの初期化
async function initNewsDetail() {
    try {
        // URLからスラッグを取得
        const slug = getNewsSlugFromURL();
        
        if (!slug) {
            console.error('❌ スラッグが指定されていません');
            showErrorState();
            return;
        }
        
        console.log('🔍 記事を検索中:', slug);
        
        // ニュースデータを取得
        const posts = await fetchNewsData();
        
        if (!posts || posts.length === 0) {
            console.error('❌ ニュースデータが空です');
            showErrorState();
            return;
        }
        
        // 指定されたスラッグの記事を検索
        const post = findNewsBySlug(posts, slug);
        
        if (!post) {
            console.error('❌ 指定された記事が見つかりません:', slug);
            showErrorState();
            return;
        }
        
        // 記事を表示
        displayNewsDetail(post);
        
    } catch (error) {
        console.error('❌ ニュース詳細の初期化エラー:', error);
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

// ページ読み込み完了時に初期化
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 ニュース詳細ページを初期化中...');
    initNewsDetail();
    initMobileMenu();
});

// エクスポート（デバッグ用）
window.newsDetailFunctions = {
    getNewsSlugFromURL,
    fetchNewsData,
    findNewsBySlug,
    formatDate,
    displayNewsDetail,
    showErrorState
};