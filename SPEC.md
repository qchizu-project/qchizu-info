# 全国Q地図 紹介ページ（info.qchizu.jp）仕様書

## 概要

全国Q地図の紹介サイト。Astro + Markdown で構成し、GitHub経由でXserverへ自動デプロイする。
シンプルでメンテナンスしやすく、かつ、拡張性の高い手法を採用する。

## 技術スタック

- **SSG**: Astro 5.x
- **記事形式**: Markdown（Content Collections）
- **ホスティング**: Xserver
- **デプロイ**: GitHub Actions（タグ push でトリガー）

---

## 進捗状況

### 完了した事項

- [x] Astroプロジェクト初期化
- [x] ディレクトリ構造作成
- [x] Content Collections設定（`src/content.config.ts`）
- [x] レイアウト実装（`Base.astro`, `Article.astro`）
- [x] コンポーネント実装（`Header.astro`, `Footer.astro`）
- [x] ページ実装（`index.astro`, `[slug].astro`）
- [x] WordPress移行スクリプト作成（`scripts/migrate-wp.js`）
- [x] WordPress記事移行実行（34記事: 投稿8件、固定ページ26件）
- [x] 画像ファイル移行（日本語ファイル名対応済み）
- [x] GitHub Actionsデプロイワークフロー作成（`.github/workflows/deploy.yml`）
- [x] GitHubリポジトリ作成・push（https://github.com/qchizu/qchizu-info プライベート）
- [x] トップページをpost-21の内容に変更
- [x] CSSの調整（シンプル化、テーマカラー維持、見出しスタイル整備）
- [x] **記事の構成整理・ナビゲーション改善**
  - 記事を3種類に分類（page: 8件、guide: 12件、post: 9件）
  - ドロップダウン式ナビゲーション実装（ハンバーガーメニュー対応）
  - 一覧ページ作成（`/posts`, `/guides`）
  - type別の日付表示（post: 目立たせる、guide: 控えめ、page: 非表示）
  - 不要記事削除（`qchizu.md`, `knowledge.md`）
  - ファビコン設定

### 未完了の事項

- [ ] **各記事の記載内容整理**
  - 内容の確認・更新
  - 必要に応じて記事を統合

- [ ] **記事の書き方の整理**
  - 公用文の書き方に倣う
  - 例: 「及び」「又は」「御利用」など

- [ ] **GitHub Secretsの登録**
  - `SSH_PRIVATE_KEY`: SSH秘密鍵
  - `SSH_HOST`: Xserverホスト名
  - `SSH_USER`: SSHユーザー名
  - 既存のqchizuリポジトリと共有可能

- [ ] **リダイレクト設定**
  - 現行サイトのURLから一部変更になるため、リダイレクトを設定
  - `.htaccess` または Xserver側で対応

---

## ディレクトリ構成

```
qchizu-info/
├── src/
│   ├── content/
│   │   └── articles/       # 記事（*.md）
│   ├── layouts/
│   │   ├── Base.astro      # 共通HTMLレイアウト
│   │   └── Article.astro   # 記事レイアウト
│   ├── components/
│   │   ├── Header.astro
│   │   └── Footer.astro
│   └── pages/
│       ├── index.astro     # トップページ（post-21の内容）
│       ├── [slug].astro    # 記事ページ
│       ├── posts.astro     # ブログ一覧
│       └── guides.astro    # 使い方ガイド一覧
├── public/
│   └── images/             # 画像ファイル
├── scripts/
│   └── migrate-wp.js       # WordPress移行スクリプト
├── .github/
│   └── workflows/
│       └── deploy.yml      # デプロイワークフロー
└── astro.config.mjs
```

## 記事の書き方

ファイル: `src/content/articles/{slug}.md`

```markdown
---
title: "記事タイトル"
description: "記事の概要（OGP用）"
date: 2024-01-15
type: guide
order: 10
---

本文をここに書く。

## 見出しはh2から

![画像の説明](/images/example.png)
```

### フロントマター項目

| 項目 | 必須 | 説明 |
|------|------|------|
| title | ○ | ページタイトル |
| description | ○ | 概要（100文字程度） |
| date | ○ | 作成日又は更新日 |
| type | ○ | 記事種別: `page`（固定ページ）、`guide`（使い方ガイド）、`post`（ブログ） |
| order | - | メニュー表示順（小さい順） |

### 記事種別（type）

| type | 呼称 | 用途 | 日付表示 |
|------|------|------|---------|
| `page` | ページ | サイト運営情報（about, 連絡先等） | 非表示 |
| `guide` | 使い方ガイド | 地図機能・コンテンツの説明 | 控えめ（更新日） |
| `post` | ブログ | 技術記事、ニュース | 目立たせる（投稿日） |

### 表記ルール（公用文の書き方）

| 項目 | 表記例 |
|------|--------|
| 接続詞 | 及び、並びに、又は、若しくは |
| 敬語 | 御利用、御覧、御確認 |
| 送り仮名 | 行う、行なう→行う |

## デプロイ手順

1. 記事を編集・追加
2. main/master ブランチに push
3. タグを作成: `git tag v20260131 && git push origin v20260131`
4. GitHub Actions が自動でビルド・デプロイ

### タグの命名規則

- 形式: `vYYYYMMDD`（例: `v20260131`）
- 同日に複数回デプロイする場合: `v20260131-2`

## 運用ルール

- 画像は `/public/images/` に配置し、記事からは `/images/xxx.png` で参照
- 記事のslug（ファイル名）は英数字とハイフンのみ使用

---

## WordPress移行（完了）

### 移行元

- URL: https://info.qchizu.jp
- 対象: 投稿（post）及び固定ページ（page）
- 記事数: 34件（投稿8件、固定ページ26件）

### 移行スクリプト

```bash
# 移行スクリプト実行
npm run migrate
# または
node scripts/migrate-wp.js
```

### 注意事項

- 移行済みの記事は手動で内容を確認・調整すること
- 日本語ファイル名の画像はURLデコード済み
