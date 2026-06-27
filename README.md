# ガチャHADO

ARスポーツ「[HADO](https://hado-official.com/)」をより楽しむためのエンジョイアプリです。
プレイヤーの装備パラメーター（弾速・弾の大きさ・チャージ速度・シールド）を、重み付き抽選でランダムに決定する「ガチャ」を回せます。

🔗 **公開URL: https://gacha-hado.vercel.app**

> [!NOTE]
> このアプリは公式アプリではありません。HADO を楽しむための非公式ファンメイドアプリです。

## 主な機能

- **プレイヤー数別ガチャ**: ソロ（1人）／デュオ（2人）／トリオ（3人）
- **フルアタッカーセット（β）**: シールド1固定のアタッカーのみが選ばれる構成
- **ガチマッチ（β）**: 人気な編成のみが選択される構成
- **排出率テーブル**: 各パラメーターパターンの重みと排出率を一覧表示
- **HADOについて**: ルール・パラメーター・役割・編成などの解説ページ
- **リリースノート**: 更新履歴の表示
- **多言語対応**: 日本語 / 英語 / 中国語（`ja` / `en` / `zh`）
- **ダークモード**: ライト／ダークテーマ切り替え
- **共有機能**: リンクコピー・QRコード表示

## 技術スタック

| 領域 | 採用技術 |
| --- | --- |
| フレームワーク | [SvelteKit 2](https://svelte.dev/docs/kit) / [Svelte 5](https://svelte.dev/) |
| 言語 | TypeScript |
| スタイリング | [Tailwind CSS 4](https://tailwindcss.com/) |
| 国際化 (i18n) | [Paraglide (inlang)](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) |
| アイコン | [@tabler/icons-svelte](https://tabler.io/icons) |
| デプロイ | [Vercel](https://vercel.com/)（`@sveltejs/adapter-vercel`） |
| UIカタログ | [Storybook](https://storybook.js.org/) |
| テスト | [Vitest](https://vitest.dev/)（ユニット） / [Playwright](https://playwright.dev/)（E2E） |
| パッケージ管理 | [Bun](https://bun.sh/) |

## セットアップ

[Bun](https://bun.sh/) を利用しています。

```bash
# 依存関係のインストール
bun install

# 開発サーバーの起動
bun run dev

# ブラウザを自動で開く場合
bun run dev -- --open
```

> npm を利用する場合は `bun` を `npm` に読み替えてください（`npm install` / `npm run dev`）。

## 開発コマンド

| コマンド | 説明 |
| --- | --- |
| `bun run dev` | 開発サーバーを起動 |
| `bun run build` | 本番ビルドを生成 |
| `bun run preview` | 本番ビルドをローカルでプレビュー |
| `bun run check` | `svelte-check` による型チェック |
| `bun run format` | Prettier でフォーマット |
| `bun run lint` | Prettier チェック + ESLint |
| `bun run test` | ユニット + E2E テストを実行 |
| `bun run test:unit` | Vitest（ユニットテスト） |
| `bun run test:e2e` | Playwright（E2Eテスト） |
| `bun run storybook` | Storybook を起動（http://localhost:6006） |

## ディレクトリ構成

```
src/
├── lib/
│   ├── components/   # 共通コンポーネント（Header, Footer, Player, ParameterPage* など）
│   ├── stores/       # Svelteストア・ガチャ生成ロジック（createParameterStore など）
│   ├── utils/        # パラメーターパターン定義・カラー・ロケール等のユーティリティ
│   └── i18n.ts       # Paraglide の初期化
├── routes/           # 各ページ（solo, duo, trio, full-atacker, gachi, drop-rate, about, ...）
└── stories/          # Storybook 用のストーリー
messages/             # i18n 翻訳ファイル（ja.json / en.json / zh.json）
e2e/                  # Playwright E2E テスト
static/               # 静的アセット（フォント・favicon・manifest など）
```

## ガチャの仕組み

各パラメーターパターンは `"5311"`（弾速5・弾の大きさ3・チャージ1・シールド1）のような4桁の文字列と、出やすさを表す `weight`（重み）の組で定義されています。
`src/lib/stores/createParameterStore.ts` が、重みに比例した確率でパターンを抽選するファクトリになっており、各モード（トリオ／フルアタッカー）はパターン定義を差し替えて利用しています。

各パターンと排出率はアプリ内の「排出率」ページで確認できます。

## 多言語対応 (i18n)

翻訳は `messages/{ja,en,zh}.json` で管理し、[Paraglide](https://inlang.com/) によりビルド時に型安全なメッセージ関数（`$lib/paraglide/messages`）を生成しています。
文言を追加・変更する場合は各言語の JSON を更新してください。

## デプロイ

`main`（または運用ブランチ）への反映で Vercel に自動デプロイされます。アダプターは `@sveltejs/adapter-vercel` を使用しています。

## ライセンス

[MIT License](./LICENSE) のもとで公開しています。
