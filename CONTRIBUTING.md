# コントリビューションガイド

## はじめに

このリポジトリは **[Bun](https://bun.sh/)** をパッケージマネージャーとして使用しています。
環境のセットアップ手順（インストール・起動コマンド）は [README.md](./README.md#セットアップ) を参照してください。

## ローカル検証ループ

PR を出す前に、CI と同じ手順をローカルで実行して通過を確認してください。

```bash
bun install --frozen-lockfile
bun run lint
bun run check
bun run test:unit -- --run
bun run build-storybook
```

> [!NOTE]
> **CI が実行しないステップ**: `bun run build`（本番ビルド）と `bun run test:e2e`（Playwright E2E テスト）は CI に含まれていません。
> E2E テストはローカルで `bun run test:e2e` を実行して確認してください。

## ブランチ戦略

| ブランチ  | 役割             |
| --------- | ---------------- |
| `develop` | ステージング環境 |
| `main`    | 本番環境         |

- 通常の開発は `develop` をベースにブランチを切り、PR を `develop` 向けに出します。
- `develop` → `main` のリリース PR は [git-pr-release](https://github.com/x-motemen/git-pr-release) により自動生成されます。
- `main` へのマージで Vercel へ自動デプロイされます。`main` push 時には release-drafter がリリースノートを自動発行します。

## ワークツリー開発の推奨

複数ブランチの並行作業には `git worktree` を推奨します。

```bash
git worktree add .worktrees/<名前> <ブランチ>
```

`.worktrees/` は `.gitignore` に登録済みのため、誤ってコミットされることはありません。

> [!IMPORTANT]
> 新しいワークツリーでは依存関係と Paraglide の生成ファイルが存在しないため、以下を必ず実行してください。
>
> ```bash
> bun install
> bun run prepare
> ```
>
> `bun run prepare` を省略すると `$lib/paraglide` が未解決となり `bun run check` が失敗します。

## コミット規約

```
<type>: <description>
```

コミットメッセージは Conventional Commits 形式で書き、`type` は英語、`description` は日本語で記述してください。

| type       | 用途                         |
| ---------- | ---------------------------- |
| `feat`     | 新機能の追加                 |
| `fix`      | バグ修正                     |
| `refactor` | 動作を変えないコードの改善   |
| `docs`     | ドキュメントの変更           |
| `test`     | テストの追加・修正           |
| `chore`    | ビルド設定・依存関係の更新等 |
| `perf`     | パフォーマンス改善           |
| `ci`       | CI/CD 設定の変更             |

## PR の進め方

1. `develop` ブランチをベースに作業ブランチを作成する。
2. コミットし、`develop` 向けに PR を作成する。
3. CI（lint / check / test:unit / build-storybook）がすべて通ることを確認する。
4. レビューを受けてマージする。

## Claude によるレビュー・実装支援

GitHub Actions 上で Claude Code が動きます（`.github/workflows/claude.yml` / `claude-review.yml`）。

- `develop` 宛ての PR には自動でコードレビューが付きます。再レビューは PR に `claude-review` ラベルを貼ると 1 回走ります（ラベルは自動で外れます）。再レビューでは前回の指摘とそれへの返信を読んだうえで、解消済みの指摘は再掲しません（すべて解消していれば「前回指摘は解消済み。新規指摘なし。」とだけ投稿します）。fork からの PR は自動レビュー対象外です（`@claude` でのレビュー依頼も行わず、人間がレビューします）。
- Issue や PR のコメントで `@claude` にメンションすると、レビュー依頼や実装依頼（例: `@claude この Issue を実装して`）ができます。起動できるのはリポジトリの write 権限保持者のみです。
- `@claude` の前後は半角スペースで区切ってください。`@claude、レビューして` のように直後が全角文字だと検出されず、無反応になります。

## i18n ルール

翻訳ファイルは `messages/` ディレクトリで管理しています。

- 文言を追加・変更する場合は **`messages/ja.json`・`messages/en.json`・`messages/zh.json` の3ファイルをすべて更新**してください。
- 更新後は `bun run prepare` を実行して Paraglide の生成ファイルを更新してください。
  - `src/lib/paraglide/` は `.gitignore` に含まれているため、生成ファイル自体はコミット不要です。
