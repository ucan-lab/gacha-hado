import { expect, test } from '@playwright/test';

test('テーマ切替: メニューで選んだテーマが cookie 経由で次回ロードの SSR にも反映される', async ({
  context,
  page,
  baseURL
}) => {
  await context.addCookies([{ name: 'PARAGLIDE_LOCALE', value: 'ja', url: baseURL }]);

  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  const trigger = page.getByRole('button', { name: 'テーマ' });
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('button', { name: 'ネオン' }).click();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'neon');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');

  // リロード後の HTML はクライアントの JS より先に SSR が cookie から data-theme を決める
  const response = await page.reload();
  expect(await response?.text()).toContain('data-theme="neon"');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'neon');

  await page.getByRole('button', { name: 'テーマ' }).click();
  await expect(page.getByRole('button', { name: 'ネオン' })).toHaveAttribute(
    'aria-current',
    'true'
  );
});
