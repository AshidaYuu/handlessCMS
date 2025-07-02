# Sanityプロジェクト作成ステップバイステップガイド

## 1. アカウント作成
1. https://www.sanity.io/ にアクセス
2. 右上の「Get started」をクリック
3. サインアップ方法を選択：
   - Googleアカウント（推奨）
   - GitHubアカウント
   - メールアドレス

## 2. プロジェクト作成
1. ログイン後、「Create new project」ボタンをクリック
2. 以下の情報を入力：
   - **Project name**: handlessCMS（または任意の名前）
   - **Organization**: Personal（個人利用の場合）
   - **Plan**: Free（無料プラン）

## 3. プロジェクトID確認
作成完了画面に表示される情報：
```
✅ Project created successfully!

Project details:
- Name: handlessCMS
- ID: xxxxxxxx ← これがプロジェクトID！
- Dataset: production
```

## 4. プロジェクトIDの使用場所
このIDは以下のファイルで使用します：
- `/sanity/.env`
- `/frontend/.env.local`
- `/sanity/sanity.cli.ts`

## よくある質問

**Q: プロジェクトIDはどこで確認できる？**
A: Sanity Manage > プロジェクト選択 > Settings > General

**Q: 無料プランの制限は？**
A: 
- 3ユーザーまで
- 10GBアセット
- 500k APIリクエスト/月
- 個人・小規模プロジェクトには十分です

**Q: プロジェクトを削除したい場合は？**
A: Settings > Danger Zone > Delete project