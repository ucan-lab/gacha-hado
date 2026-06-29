import { expect, test } from '@playwright/test';

test('QRモーダル開閉: QRボタンクリックでモーダル表示、クローズボタンで非表示', async ({
  context,
  page,
  baseURL
}) => {
  await context.addCookies([{ name: 'PARAGLIDE_LOCALE', value: 'ja', url: baseURL }]);

  await page.goto('/');

  await page.getByRole('button', { name: 'QRコード' }).click();
  await expect(page.locator('input[readonly]')).toBeVisible();

  await page.getByRole('button', { name: '閉じる' }).click();
  await expect(page.locator('input[readonly]')).not.toBeVisible();
});

test('共有URL表示: モーダル内 input の value が SHARE_URL と一致する', async ({
  context,
  page,
  baseURL
}) => {
  await context.addCookies([{ name: 'PARAGLIDE_LOCALE', value: 'ja', url: baseURL }]);

  await page.goto('/');

  await page.getByRole('button', { name: 'QRコード' }).click();
  await expect(page.locator('input[readonly]')).toHaveValue('https://gacha-hado.vercel.app');
});

test('コピー操作: 共有URLがクリップボードにコピーされ緑チェックアイコンが表示される', async ({
  context,
  page,
  baseURL
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await context.addCookies([{ name: 'PARAGLIDE_LOCALE', value: 'ja', url: baseURL }]);

  await page.goto('/');

  await page.getByRole('button', { name: 'QRコード' }).click();
  const copyButton = page.getByRole('button', { name: 'リンクコピー' });
  await copyButton.click();

  // アイコン切替に加え、実際にクリップボードへ共有URLが書き込まれたことも検証する
  await expect(copyButton.locator('.text-green-600')).toBeVisible();
  const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboardText).toBe('https://gacha-hado.vercel.app');
});

test('言語メニュー開閉: Language ボタンで開き、再クリックで閉じる', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Language' }).click();
  await expect(page.getByRole('button', { name: '日本語' })).toBeVisible();

  await page.getByRole('button', { name: 'Language' }).click();
  await expect(page.getByRole('button', { name: '日本語' })).not.toBeVisible();
});

test('現在ロケールのチェックマーク: en 固定時に English 項目のみチェックアイコンが表示される', async ({
  context,
  page,
  baseURL
}) => {
  await context.addCookies([{ name: 'PARAGLIDE_LOCALE', value: 'en', url: baseURL }]);

  await page.goto('/');
  await page.getByRole('button', { name: 'Language' }).click();

  const englishButton = page.getByRole('button', { name: 'English' });
  await expect(englishButton.locator('.text-green-500')).toBeVisible();

  const jaButton = page.getByRole('button', { name: '日本語' });
  await expect(jaButton.locator('.text-green-500')).not.toBeVisible();

  const zhButton = page.getByRole('button', { name: '中文' });
  await expect(zhButton.locator('.text-green-500')).not.toBeVisible();
});

test('ロケール選択でメニューが閉じ言語切替が反映される: ja 起点で English 選択後にリロードで lang=en', async ({
  context,
  page,
  baseURL
}) => {
  await context.addCookies([{ name: 'PARAGLIDE_LOCALE', value: 'ja', url: baseURL }]);

  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja');

  await page.getByRole('button', { name: 'Language' }).click();
  await page.getByRole('button', { name: 'English' }).click();

  await page.waitForLoadState('load');

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('button', { name: '日本語' })).not.toBeVisible();

  const cookies = await context.cookies();
  expect(cookies.find((c) => c.name === 'PARAGLIDE_LOCALE')?.value).toBe('en');
});

test('ハンバーガー遷移後リセット: ページ遷移後にハンバーガーメニューが閉じている', async ({
  context,
  page,
  baseURL
}) => {
  await context.addCookies([{ name: 'PARAGLIDE_LOCALE', value: 'ja', url: baseURL }]);

  await page.goto('/');

  await page.getByRole('button', { name: 'メニュー' }).click();
  await expect(
    page.locator('.hamburger-menu-container').getByRole('link', { name: 'ソロ' })
  ).toBeVisible();

  await page.locator('.hamburger-menu-container').getByRole('link', { name: 'ソロ' }).click();
  await page.waitForURL('**/solo');

  await expect(page.locator('.hamburger-menu-container')).not.toBeVisible();
});
