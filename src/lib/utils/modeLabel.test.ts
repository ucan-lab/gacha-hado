import { describe, expect, it } from 'vitest';
import { withoutBetaMark } from './modeLabel';

describe('withoutBetaMark', () => {
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
