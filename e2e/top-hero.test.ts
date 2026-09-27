import { expect, test } from '@playwright/test';

// CSP の style-src が *.vercel.app しか許可しておらず、localhost の preview では CSS が当たらない。
// ヒーローのはみ出しとアニメーションを測るため、このファイルでは CSP を無視する
test.use({ bypassCSP: true });

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('theme', 'neon'));
});

// エナジーボールの集中線と粒子は SVG の外へはみ出す描き方をしている
for (const width of [320, 390]) {
  test(`トップのヒーロー: ${width}px 幅で横スクロールが出ない`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');
    await expect(page.locator('svg.hero')).toBeVisible();

    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });
}

const heroAnimations = () =>
  document
    .getAnimations()
    .filter((a) => (a.effect as KeyframeEffect | null)?.target?.closest('svg.hero, .logo'))
    .map((a) => (a as CSSAnimation).animationName);

test('トップのヒーロー: 動きを減らす設定ではアニメーションが止まる', async ({ page }) => {
  // 通常の設定で動いていることを先に確かめ、検出漏れで空になっているだけの誤判定を防ぐ
  await page.goto('/');
  await expect(page.locator('svg.hero')).toBeVisible();
  expect((await page.evaluate(heroAnimations)).length).toBeGreaterThan(0);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(page.locator('svg.hero')).toBeVisible();
  expect(await page.evaluate(heroAnimations)).toEqual([]);

  // 止めたときに不透明度 1 に戻ると、球の上の白い閃光が光り続ける
  const opacity = (selector: string) =>
    page
      .locator(selector)
      .first()
      .evaluate((el) => Number(getComputedStyle(el).opacity));
  expect(await opacity('svg.hero .flash')).toBeLessThan(0.2);
  expect(await opacity('svg.hero .aura')).toBeLessThan(0.6);
});
