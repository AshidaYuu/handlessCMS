// Sanity設定
const SANITY_CONFIG = {
    projectId: 'rt90f87e',
    dataset: 'production',
    apiVersion: '2023-10-01',
    useCdn: true
};

// Sanity CDNからデータを取得
async function fetchFromSanity(query) {
    try {
        const url = `https://${SANITY_CONFIG.projectId}.apicdn.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Sanity API エラー: ${response.status}`);
        }
        
        const data = await response.json();
        return data.result || [];
        
    } catch (error) {
        console.warn('Sanity取得失敗、フォールバック使用:', error.message);
        
        // フォールバック
        try {
            const response = await fetch('./news-data.json');
            if (response.ok) {
                return await response.json();
            }
        } catch (fallbackError) {
            console.error('フォールバックも失敗:', fallbackError);
        }
        
        throw error;
    }
}

// グローバルに公開
window.fetchFromSanity = fetchFromSanity;