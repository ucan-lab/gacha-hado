# エージェント向け開発ガイドライン

このリポジトリで作業する際は、まず [CONTRIBUTING.md](./CONTRIBUTING.md) を読み、その開発ガイドラインに従ってください。

CONTRIBUTING.md には以下が記載されています。

- ローカル検証ループ（CI と同じ `lint` / `check` / `test:unit` / `build-storybook`）
- ブランチ戦略（`develop` = ステージング, `main` = 本番）
- ワークツリー開発の手順
- コミット規約（`<type>: <description>` 形式）
- i18n ルール（`messages/{ja,en,zh}.json` の全更新 + `bun run prepare`）

プロジェクト概要・技術スタック・ディレクトリ構成は [README.md](./README.md) を参照してください。

## コミット・PRの言語ルール

- コミットメッセージは Conventional Commits 形式で書く。
- `type` は英語のまま使い、`description` は日本語で書く。
- PRタイトルとPR本文は日本語で書く。
- ライブラリ名、コマンド名、エラー名、ファイル名などの固有名詞は英語のままでよい。
- PR本文には、テンプレートに沿って「概要（変更内容）」「影響」「検証」を含める。

例:

```text
test: Svelteコンポーネントの単体テストを追加
```
