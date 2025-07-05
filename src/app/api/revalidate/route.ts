import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Sanityからのwebhook署名検証（オプション）
    // const signature = request.headers.get('sanity-webhook-signature')
    
    console.log('Revalidation webhook received:', body)
    
    // 記事関連のページを再検証
    revalidatePath('/')
    revalidatePath('/news')
    
    // 特定の記事が更新された場合
    if (body._type === 'post' && body.slug?.current) {
      revalidatePath(`/news/${body.slug.current}`)
    }
    
    // 全ての記事ページを再検証（安全策）
    revalidateTag('posts')
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      message: 'Content updated successfully'
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Error revalidating content' },
      { status: 500 }
    )
  }
}

// GET method for testing
export async function GET() {
  return NextResponse.json({ 
    message: 'Revalidation endpoint is working',
    timestamp: new Date().toISOString()
  })
}