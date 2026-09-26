import { describe, expect, it } from 'vitest';
import { isStuckAtBottom } from './stuckAtBottom';

const entry = (intersectionRatio: number, top: number) => ({
  intersectionRatio,
  boundingClientRect: { top } as DOMRectReadOnly
});

describe('isStuckAtBottom', () => {
  it('is stuck when the element pokes out below the viewport', () => {
    expect(isStuckAtBottom(entry(0.99, 580))).toBe(true);
  });

  it('is not stuck when the element is fully visible in its natural position', () => {
    expect(isStuckAtBottom(entry(1, 580))).toBe(false);
  });

  it('is not stuck when the element leaves through the top of the viewport', () => {
    expect(isStuckAtBottom(entry(0.5, -40))).toBe(false);
  });
});
