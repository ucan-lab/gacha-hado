import { writable } from 'svelte/store';

const isBrowser = typeof window !== 'undefined';
const isDocument = typeof document !== 'undefined';

const getStoredTheme = (): string => {
  if (!isBrowser) return 'auto';
  return localStorage.getItem('theme') || 'auto';
};

// テーマの適用
const applyTheme = (theme: string): string => {
  if (!isDocument) return theme;

  let effectiveTheme = theme;

  if (theme === 'auto') {
    effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', effectiveTheme);
  document.documentElement.classList.remove('dark', 'light');
  document.documentElement.classList.add(effectiveTheme);
  document.cookie = `theme=${theme}; path=/; max-age=31536000`; // 1年

  return theme;
};

// テーマのストア
export const theme = writable(getStoredTheme());
theme.subscribe((value: string) => applyTheme(value));

// システムのテーマ変更を監視し、適用するリスナー
const initializeThemeListener = () => {
  if (!isBrowser) return;

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    theme.update((current) => (current === 'auto' ? applyTheme('auto') : current));
  });
};

initializeThemeListener();
