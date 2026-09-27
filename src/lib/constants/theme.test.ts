import { describe, it, expect } from 'vitest';
import { normalizeTheme, isTheme, resolveCurrentTheme, THEMES, DEFAULT_THEME } from './theme';

describe('theme constants', () => {
  it('THEMES は neon / classic-light / classic-dark のみ', () => {
    expect(THEMES).toEqual(['neon', 'classic-light', 'classic-dark']);
  });

  it('DEFAULT_THEME は neon', () => {
    expect(DEFAULT_THEME).toBe('neon');
  });
});

describe('isTheme', () => {
  it('許可リストの値で true', () => {
    expect(isTheme('neon')).toBe(true);
    expect(isTheme('classic-dark')).toBe(true);
    expect(isTheme('classic-light')).toBe(true);
  });

  it('許可リスト外・非文字列で false', () => {
    expect(isTheme('hacker')).toBe(false);
    expect(isTheme('')).toBe(false);
    expect(isTheme(null)).toBe(false);
    expect(isTheme(undefined)).toBe(false);
    expect(isTheme(123)).toBe(false);
  });

  it('改名前の light / dark は許可リスト外', () => {
    expect(isTheme('light')).toBe(false);
    expect(isTheme('dark')).toBe(false);
  });
});

describe('normalizeTheme', () => {
  it('許可リストの値はそのまま返す', () => {
    expect(normalizeTheme('neon')).toBe('neon');
    expect(normalizeTheme('classic-dark')).toBe('classic-dark');
    expect(normalizeTheme('classic-light')).toBe('classic-light');
  });

  it('改名前の light / dark は neon に移行する', () => {
    expect(normalizeTheme('light')).toBe('neon');
    expect(normalizeTheme('dark')).toBe('neon');
  });

  it('許可リスト外の文字列は neon に正規化する', () => {
    expect(normalizeTheme('auto')).toBe('neon');
    expect(normalizeTheme('hacker')).toBe('neon');
  });

  it('空白を含む不正値（classList を壊しうる値）は neon に正規化する', () => {
    expect(normalizeTheme('classic-dark classic-light')).toBe('neon');
    expect(normalizeTheme(' classic-dark ')).toBe('neon');
  });

  it('null / undefined は neon にフォールバックする', () => {
    expect(normalizeTheme(null)).toBe('neon');
    expect(normalizeTheme(undefined)).toBe('neon');
  });
});

describe('resolveCurrentTheme', () => {
  it('SSR ではストアが既定値のままでも cookie 由来のテーマを使う', () => {
    expect(resolveCurrentTheme(false, 'neon', 'classic-light')).toBe('classic-light');
    expect(resolveCurrentTheme(false, 'neon', 'classic-dark')).toBe('classic-dark');
  });

  it('SSR で許可リスト外の値は既定値に正規化する', () => {
    expect(resolveCurrentTheme(false, 'classic-dark', '" onerror="alert(1)')).toBe('neon');
    expect(resolveCurrentTheme(false, 'classic-dark', undefined)).toBe('neon');
  });

  it('クライアントではストアの値を使う', () => {
    expect(resolveCurrentTheme(true, 'classic-dark', 'neon')).toBe('classic-dark');
  });
});
