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

  it('follows changes made in another tab', async () => {
    const { uniqueParameters } = await import('./settings');

    window.dispatchEvent(
      new StorageEvent('storage', { key: 'uniqueParameters', newValue: 'true' })
    );
    expect(get(uniqueParameters)).toBe(true);

    window.dispatchEvent(new StorageEvent('storage', { key: 'theme', newValue: 'false' }));
    expect(get(uniqueParameters)).toBe(true);
  });
});

describe('settings - isUniqueParametersAvailable', () => {
  it.each(['/duo', '/trio'])('is available on %s', async (pathname) => {
    const { isUniqueParametersAvailable } = await import('./settings');
    expect(isUniqueParametersAvailable(pathname)).toBe(true);
  });

  it.each(['/', '/solo', '/full-attacker', '/gachi', '/drop-rate'])(
    'is not available on %s',
    async (pathname) => {
      const { isUniqueParametersAvailable } = await import('./settings');
      expect(isUniqueParametersAvailable(pathname)).toBe(false);
    }
  );
});
