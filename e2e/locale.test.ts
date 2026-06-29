import { expect, test, type Page } from '@playwright/test';

// ハイドレーション不一致は Svelte が console.warn/error に "hydration" を含む形で出すため、
// それを捕捉して #138 の「ちらつき/不一致が出ない」ことの証拠にする
const collectHydrationIssues = (page: Page): string[] => {
  const messages: string[] = [];
  page.on('console', (msg) => {
    if ((msg.type() === 'error' || msg.type() === 'warning') && /hydrat/i.test(msg.text())) {
      messages.push(`${msg.type()}: ${msg.text()}`);
    }
  });
  return messages;
};

test('成功: PARAGLIDE_LOCALE cookie の選択ロケールが SSR の <html lang> に反映される', async ({
  context,
  page
}) => {
  await context.addCookies([
    { name: 'PARAGLIDE_LOCALE', value: 'en', url: 'http://localhost:4173' }
  ]);
  const hydrationIssues = collectHydrationIssues(page);

  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.waitForLoadState('networkidle');
  expect(hydrationIssues).toEqual([]);
});

test('フォールバック: 未対応のブラウザ言語(fr-FR)では SSR・クライアントとも ja に揃う', async ({
  browser
}) => {
  // cookie/localStorage 無し・ブラウザ言語のみ fr-FR の新規ユーザーを再現
  const ctx = await browser.newContext({ locale: 'fr-FR' });
  const page = await ctx.newPage();
  const hydrationIssues = collectHydrationIssues(page);

  await page.goto('/');

  // en 固定をやめ baseLocale(ja) に寄せた結果、SSR は en ではなく ja
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
  await page.waitForLoadState('networkidle');
  expect(hydrationIssues).toEqual([]);

  await ctx.close();
});

test('切替→フルリロード: UI でロケールを切替えると cookie 経由で次回ロードにも永続する', async ({
  browser
}) => {
  // ブラウザ言語 ja-JP の利用者を再現し、初期 SSR が ja であることを起点にする
  const ctx = await browser.newContext({ locale: 'ja-JP' });
  const page = await ctx.newPage();

  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja');

  // 言語メニューを開いて English を選択 (changeLocale が setLocale 既定の reload を伴う)
  await page.getByRole('button', { name: 'Language' }).click();
  await page.getByRole('menuitemradio', { name: 'English' }).click();

  // フルリロードの完了を明示的に待ってから検証する（リロード前の旧 document を見ないため）
  await page.waitForLoadState('load');

  // フルリロード後、SSR が cookie を読んで en でレンダリングされる
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');

  const cookies = await ctx.cookies();
  expect(cookies.find((c) => c.name === 'PARAGLIDE_LOCALE')?.value).toBe('en');

  await ctx.close();
});

test('移行: localStorage[locale] のみ保持する旧ユーザーは cookie 移行後に SSR と一致する', async ({
  browser
}) => {
  // ブラウザ言語 ja-JP・cookie 無しで、旧システムで en を選択済み(localStorage['locale']='en')を再現
  const ctx = await browser.newContext({ locale: 'ja-JP' });
  const page = await ctx.newPage();
  await page.addInitScript(() => localStorage.setItem('locale', 'en'));

  // 初回ロード: SSR は cookie 不在で ja。initializeLocale が cookie 移行のため
  // setLocale(既定 reload) で PARAGLIDE_LOCALE を書きフルリロードする。
  await page.goto('/');
  await page.waitForLoadState('load');

  // 移行後は SSR が cookie=en を読み <html lang="en"> に収束する
  // (旧実装は reload:false のため lang が ja のまま残り、この検証は失敗する)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  const cookies = await ctx.cookies();
  expect(cookies.find((c) => c.name === 'PARAGLIDE_LOCALE')?.value).toBe('en');

  await ctx.close();
});
