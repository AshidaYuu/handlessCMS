/**
 * 手動でSanityからニュースデータを取得してJSONを更新
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Sanity設定
const SANITY_PROJECT_ID = 'rt90f87e';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-01-01';

// ニュースデータを取得
async function fetchNewsFromSanity() {
  return new Promise((resolve, reject) => {
    const query = '*[_type == "post"] | order(publishedAt desc)[0...4] {title, publishedAt, slug, excerpt}';
    const encodedQuery = encodeURIComponent(query);
    const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodedQuery}`;
    
    console.log('📡 Sanity APIからデータを取得中...');
    console.log('URL:', url);
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          console.log('✅ Sanityからデータ取得成功');
          console.log('応答:', JSON.stringify(jsonData, null, 2));
          resolve(jsonData.result || []);
        } catch (error) {
          console.error('❌ JSON解析エラー:', error);
          reject(error);
        }
      });
    }).on('error', (error) => {
      console.error('❌ HTTP リクエストエラー:', error);
      reject(error);
    });
  });
}

// JSONファイルを更新
function updateNewsJson(posts) {
  const outputPath = path.join(__dirname, '../site_5/news-data.json');
  
  try {
    fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));
    console.log('✅ news-data.json を更新しました');
    console.log('📁 パス:', outputPath);
    console.log('📊 投稿数:', posts.length);
    
    // 更新されたデータを表示
    posts.forEach((post, index) => {
      const date = new Date(post.publishedAt).toLocaleDateString('ja-JP');
      console.log(`${index + 1}. ${date} - ${post.title}`);
    });
    
  } catch (error) {
    console.error('❌ ファイル書き込みエラー:', error);
    throw error;
  }
}

// メイン関数
async function main() {
  try {
    console.log('🚀 ニュースデータ更新スクリプトを開始...');
    console.log('⏰ 開始時刻:', new Date().toLocaleString('ja-JP'));
    
    const posts = await fetchNewsFromSanity();
    
    if (posts && posts.length > 0) {
      updateNewsJson(posts);
      console.log('🎉 ニュースデータの更新が完了しました！');
    } else {
      console.warn('⚠️ 投稿データが取得できませんでした');
    }
    
  } catch (error) {
    console.error('❌ スクリプト実行エラー:', error);
    process.exit(1);
  }
}

// スクリプト実行
if (require.main === module) {
  main();
}

module.exports = { fetchNewsFromSanity, updateNewsJson };