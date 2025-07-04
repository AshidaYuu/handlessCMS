/**
 * Sanity Webhook ハンドラー
 * Sanityからのwebhookを受信してGitHub Actionsをトリガー
 */

const express = require('express');
const crypto = require('crypto');
const { Octokit } = require('@octokit/rest');

const app = express();
const port = process.env.PORT || 3000;

// 環境変数
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = 'AshidaYuu';
const GITHUB_REPO = 'handlessCMS';
const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET || 'your-webhook-secret';

// GitHub API クライアント
const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

// JSON パーシング
app.use(express.json());

// ログ用ミドルウェア
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ヘルスチェック
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Sanity Webhook Handler is running',
    timestamp: new Date().toISOString()
  });
});

// Sanity Webhook エンドポイント
app.post('/webhook/sanity', async (req, res) => {
  try {
    console.log('📡 Sanity webhookを受信しました');
    console.log('Headers:', req.headers);
    console.log('Body:', JSON.stringify(req.body, null, 2));

    // webhook署名の検証（オプション）
    const signature = req.headers['sanity-webhook-signature'];
    if (signature && SANITY_WEBHOOK_SECRET) {
      const expectedSignature = crypto
        .createHmac('sha256', SANITY_WEBHOOK_SECRET)
        .update(JSON.stringify(req.body))
        .digest('hex');
      
      if (signature !== expectedSignature) {
        console.error('❌ Webhook署名が無効です');
        return res.status(401).json({ error: 'Invalid signature' });
      }
    }

    // 投稿関連の変更のみ処理
    const { _type, _id } = req.body;
    if (_type === 'post') {
      console.log(`📝 投稿の変更を検知: ${_id}`);
      
      // GitHub Actions をトリガー
      const result = await octokit.rest.repos.createDispatchEvent({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        event_type: 'sanity-update',
        client_payload: {
          type: _type,
          id: _id,
          timestamp: new Date().toISOString(),
          action: 'post-updated'
        }
      });

      console.log('✅ GitHub Actions をトリガーしました:', result.status);
      
      res.json({
        success: true,
        message: 'GitHub Actions triggered successfully',
        github_response: result.status
      });
    } else {
      console.log(`ℹ️ 投稿以外の変更のため無視: ${_type}`);
      res.json({
        success: true,
        message: 'Non-post change, ignored'
      });
    }

  } catch (error) {
    console.error('❌ Webhookハンドラーエラー:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// 手動トリガー用エンドポイント（テスト用）
app.post('/trigger', async (req, res) => {
  try {
    console.log('🔧 手動トリガーを実行中...');
    
    const result = await octokit.rest.repos.createDispatchEvent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      event_type: 'sanity-update',
      client_payload: {
        type: 'manual',
        timestamp: new Date().toISOString(),
        action: 'manual-trigger'
      }
    });

    console.log('✅ 手動トリガー成功:', result.status);
    
    res.json({
      success: true,
      message: 'Manual trigger successful',
      github_response: result.status
    });

  } catch (error) {
    console.error('❌ 手動トリガーエラー:', error);
    res.status(500).json({
      error: 'Manual trigger failed',
      message: error.message
    });
  }
});

// サーバー起動
app.listen(port, () => {
  console.log(`🚀 Webhook Handler が起動しました: http://localhost:${port}`);
  console.log(`📡 Sanity Webhook URL: http://localhost:${port}/webhook/sanity`);
  console.log(`🔧 手動トリガー URL: http://localhost:${port}/trigger`);
});

module.exports = app;