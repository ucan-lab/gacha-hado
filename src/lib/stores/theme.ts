import { writable } from 'svelte/store';
import { THEMES, DEFAULT_THEME, normalizeTheme, type Theme } from '$lib/constants/theme';

const isBrowser = typeof window !== 'undefined';
const isDocument = typeof document !== 'undefined';

const getStoredTheme = (): Theme => {
  if (!isBrowser) return DEFAULT_THEME;
  return normalizeTheme(localStorage.getItem('theme'));
};

// テーマの適用。ストアは Theme 型で、値は境界(getStoredTheme)で正規化済みのため
// ここでは Theme を受け取り、ストアと DOM/cookie の状態を一致させる。
const applyTheme = (theme: Theme): Theme => {
  if (!isDocument) return theme;

  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.remove(...THEMES);
  document.documentElement.classList.add(theme);
  document.cookie = `theme=${theme}; path=/; max-age=31536000`; // 1年

  return theme;
};

// テーマのストア
export const theme = writable<Theme>(getStoredTheme());
theme.subscribe((value) => applyTheme(value));
