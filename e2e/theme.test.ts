import { expect, test } from '@playwright/test';

test('初回訪問: cookie が無ければ SSR が neon を出力する', async ({ context, page, baseURL }) => {
  await context.addCookies([{ name: 'PARAGLIDE_LOCALE', value: 'ja', url: baseURL }]);

  const response = await page.goto('/');
  expect(await response?.text()).toContain('data-theme="neon"');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'neon');
});

test('テーマ切替: メニューで選んだテーマが cookie 経由で次回ロードの SSR にも反映される', async ({
  context,
  page,
  baseURL
}) => {
  await context.addCookies([{ name: 'PARAGLIDE_LOCALE', value: 'ja', url: baseURL }]);

  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'neon');

  const trigger = page.getByRole('button', { name: 'テーマ' });
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('button', { name: 'クラシック ダーク' }).click();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'classic-dark');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');

  // リロード後の HTML はクライアントの JS より先に SSR が cookie から data-theme を決める
  const response = await page.reload();
  expect(await response?.text()).toContain('data-theme="classic-dark"');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'classic-dark');

  await page.getByRole('button', { name: 'テーマ' }).click();
  await expect(page.getByRole('button', { name: 'クラシック ダーク' })).toHaveAttribute(
    'aria-current',
    'true'
  );
});

for (const legacyTheme of ['light', 'dark']) {
  test(`移行: 改名前の theme=${legacyTheme} を保存した旧ユーザーは neon に移り、cookie と localStorage も書き換わる`, async ({
    browser,
    baseURL
  }) => {
    const ctx = await browser.newContext({ locale: 'ja-JP' });
    await ctx.addCookies([{ name: 'theme', value: legacyTheme, url: baseURL }]);
    const page = await ctx.newPage();
    await page.addInitScript((value) => {
      // 初回ロードの前だけ旧値を仕込み、移行後の書き換えを上書きしない
      if (!sessionStorage.getItem('seeded')) {
        localStorage.setItem('theme', value);
        sessionStorage.setItem('seeded', '1');
      }
    }, legacyTheme);

    const response = await page.goto('/');
    expect(await response?.text()).toContain('data-theme="neon"');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'neon');

    await expect
      .poll(async () => (await ctx.cookies()).find((c) => c.name === 'theme')?.value)
      .toBe('neon');
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('neon');

    await ctx.close();
  });
}
