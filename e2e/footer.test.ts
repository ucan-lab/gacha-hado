import { expect, test } from '@playwright/test';

// CSP の style-src が *.vercel.app しか許可しておらず、localhost の preview では CSS が当たらない。
// レイアウトを測るため、このファイルでは CSP を無視する。
// 既定の高さ 720px ではトップの内容が画面を超えて余白が再現しないため、縦長にする
test.use({ bypassCSP: true, viewport: { width: 1280, height: 1200 } });

const cases = [
  { theme: 'neon', path: '/' },
  { theme: 'classic-light', path: '/' },
  { theme: 'neon', path: '/about' },
  { theme: 'neon', path: '/release-note' }
];

for (const { theme, path } of cases) {
  test(`フッター位置: ${theme} の ${path} でフッターがページ下端に付き、下に余白が出ない`, async ({
    page
  }) => {
    // テーマはクライアントで localStorage の値が cookie より優先される
    await page.addInitScript((t) => localStorage.setItem('theme', t), theme);
    await page.goto(path);
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);

    const { footerBottom, docHeight, viewport } = await page.evaluate(() => ({
      footerBottom: Math.round(
        document.querySelector('footer')!.getBoundingClientRect().bottom + window.scrollY
      ),
      docHeight: document.documentElement.scrollHeight,
      viewport: window.innerHeight
    }));

    expect(footerBottom).toBe(docHeight);
    expect(docHeight).toBeGreaterThanOrEqual(viewport);
  });
}
