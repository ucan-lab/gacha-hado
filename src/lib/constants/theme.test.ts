import { describe, it, expect } from 'vitest';
import { normalizeTheme, isTheme, resolveCurrentTheme, THEMES, DEFAULT_THEME } from './theme';

describe('theme constants', () => {
  it('THEMES は neon / light / dark のみ', () => {
    expect(THEMES).toEqual(['neon', 'light', 'dark']);
  });

  it('DEFAULT_THEME は light', () => {
    expect(DEFAULT_THEME).toBe('light');
  });
});

describe('isTheme', () => {
  it('許可リストの値で true', () => {
    expect(isTheme('neon')).toBe(true);
    expect(isTheme('dark')).toBe(true);
    expect(isTheme('light')).toBe(true);
  });

  it('許可リスト外・非文字列で false', () => {
    expect(isTheme('hacker')).toBe(false);
    expect(isTheme('')).toBe(false);
    expect(isTheme(null)).toBe(false);
    expect(isTheme(undefined)).toBe(false);
    expect(isTheme(123)).toBe(false);
  });
});

describe('normalizeTheme', () => {
  it('許可リストの値はそのまま返す', () => {
    expect(normalizeTheme('neon')).toBe('neon');
    expect(normalizeTheme('dark')).toBe('dark');
    expect(normalizeTheme('light')).toBe('light');
  });

  it('許可リスト外の文字列は light に正規化する', () => {
    expect(normalizeTheme('auto')).toBe('light');
    expect(normalizeTheme('hacker')).toBe('light');
  });

  it('空白を含む不正値（classList を壊しうる値）は light に正規化する', () => {
    expect(normalizeTheme('dark light')).toBe('light');
    expect(normalizeTheme(' dark ')).toBe('light');
  });

  it('null / undefined は light にフォールバックする', () => {
    expect(normalizeTheme(null)).toBe('light');
    expect(normalizeTheme(undefined)).toBe('light');
  });
});

describe('resolveCurrentTheme', () => {
  it('SSR ではストアが既定値のままでも cookie 由来のテーマを使う', () => {
    expect(resolveCurrentTheme(false, 'light', 'neon')).toBe('neon');
    expect(resolveCurrentTheme(false, 'light', 'dark')).toBe('dark');
  });

  it('SSR で許可リスト外の値は既定値に正規化する', () => {
    expect(resolveCurrentTheme(false, 'neon', '" onerror="alert(1)')).toBe('light');
    expect(resolveCurrentTheme(false, 'neon', undefined)).toBe('light');
  });

  it('クライアントではストアの値を使う', () => {
    expect(resolveCurrentTheme(true, 'dark', 'neon')).toBe('dark');
  });
});
