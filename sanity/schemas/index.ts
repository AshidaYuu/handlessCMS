/**
 * スキーマのエントリーポイント
 * ここで定義したスキーマがSanity Studioで使用されます
 */

// 個別のスキーマをインポート
import post from './post'
import author from './author'
import category from './category'
import blockContent from './blockContent'

// すべてのスキーマをエクスポート
export const schemaTypes = [post, author, category, blockContent]