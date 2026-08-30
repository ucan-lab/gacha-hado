import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';

// ストアは import 時に localStorage を読むため、ケースごとにモジュールを読み直す
beforeEach(() => {
  localStorage.clear();
  vi.resetModules();
});

describe('settings - uniqueParameters', () => {
  it('defaults to false when nothing is stored', async () => {
    const { uniqueParameters } = await import('./settings');
    expect(get(uniqueParameters)).toBe(false);
  });

  it('restores the stored value', async () => {
    localStorage.setItem('uniqueParameters', 'true');
    const { uniqueParameters } = await import('./settings');
    expect(get(uniqueParameters)).toBe(true);
  });

  it('falls back to false for an invalid stored value', async () => {
    localStorage.setItem('uniqueParameters', 'yes');
    const { uniqueParameters } = await import('./settings');
    expect(get(uniqueParameters)).toBe(false);
  });

  it('persists updates to localStorage', async () => {
    const { uniqueParameters } = await import('./settings');
    uniqueParameters.set(true);
    expect(localStorage.getItem('uniqueParameters')).toBe('true');
    uniqueParameters.set(false);
    expect(localStorage.getItem('uniqueParameters')).toBe('false');
  });
});
