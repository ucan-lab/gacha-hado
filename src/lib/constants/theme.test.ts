import { describe, it, expect } from 'vitest';
import { normalizeTheme, isTheme, THEMES, DEFAULT_THEME } from './theme';

describe('theme constants', () => {
  it('THEMES は dark / light のみ', () => {
    expect(THEMES).toEqual(['dark', 'light']);
  });

  it('DEFAULT_THEME は light', () => {
    expect(DEFAULT_THEME).toBe('light');
  });
});

describe('isTheme', () => {
  it('許可リストの値で true', () => {
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
