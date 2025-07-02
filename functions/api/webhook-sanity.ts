/**
 * Cloudflare Pages Function (TypeScript版)
 * Sanity Webhookを受信してGitHub Actionsをトリガー
 */

interface Env {
  GITHUB_TOKEN: string;
  SANITY_PROJECT_ID: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  
  try {
    console.log('📡 Sanity Webhookを受信');
    
    // リクエストボディを取得
    const body = await request.json() as any;
    console.log('Body:', JSON.stringify(body, null, 2));
    
    // 投稿の変更のみ処理
    if (body._type === 'post') {
      console.log(`📝 投稿の変更を検知: ${body._id}`);
      
      // GitHub APIでRepository Dispatchをトリガー
      const githubResponse = await fetch(
        'https://api.github.com/repos/AshidaYuu/handlessCMS/dispatches',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `token ${env.GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
            'User-Agent': 'HandlessCMS-Webhook/1.0',
          },
          body: JSON.stringify({
            event_type: 'sanity-update',
            client_payload: {
              type: body._type,
              id: body._id,
              timestamp: new Date().toISOString(),
              action: 'post-updated'
            }
          })
        }
      );
      
      if (githubResponse.ok) {
        console.log('✅ GitHub Actions をトリガーしました');
        return new Response(JSON.stringify({
          success: true,
          message: 'GitHub Actions triggered successfully'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        const errorText = await githubResponse.text();
        throw new Error(`GitHub API error: ${githubResponse.status} - ${errorText}`);
      }
    }
    
    // 投稿以外の変更は無視
    return new Response(JSON.stringify({
      success: true,
      message: 'Non-post change, ignored'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('❌ Webhookエラー:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// GETリクエスト（ヘルスチェック用）
export const onRequestGet: PagesFunction<Env> = async () => {
  return new Response(JSON.stringify({
    status: 'OK',
    message: 'Sanity Webhook Handler is running on Cloudflare Pages',
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};