import { describe, expect, it } from 'vitest';
import * as m from '$lib/paraglide/messages';
import { locales } from '$lib/paraglide/runtime';
import { withoutBetaMark } from './modeLabel';

describe('withoutBetaMark', () => {
  // 翻訳の書き方が変わって β が外れなくなると、Neon のトップでラベルとバッジに β が二重に出る
  it.each(locales)('removes the beta mark from the actual %s translations', (locale) => {
    for (const label of [m.fullAttacker({}, { locale }), m.gachiMatch({}, { locale })]) {
      const stripped = withoutBetaMark(label);

      expect(stripped).not.toContain('β');
      expect(stripped.trim()).not.toBe('');
    }
  });

  it.each([
    ['フルアタッカーセット(β)', 'フルアタッカーセット'],
    ['Serious Match(β)', 'Serious Match'],
    ['真剣对战（β）', '真剣对战'],
    ['Full Attacker Set (β)', 'Full Attacker Set']
  ])('removes the trailing beta mark from %s', (label, expected) => {
    expect(withoutBetaMark(label)).toBe(expected);
  });

  it('leaves labels without a trailing beta mark unchanged', () => {
    expect(withoutBetaMark('ソロ')).toBe('ソロ');
    expect(withoutBetaMark('β(test)')).toBe('β(test)');
  });
});
