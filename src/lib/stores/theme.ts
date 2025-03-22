import { writable } from 'svelte/store';

const isBrowser = typeof window !== 'undefined';
const isDocument = typeof document !== 'undefined';

const getStoredTheme = (): string => {
  if (!isBrowser) return 'light';
  return localStorage.getItem('theme') ?? 'light';
};

// テーマの適用
const applyTheme = (theme: string): string => {
  if (!isDocument) return theme;

  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.remove('dark', 'light');
  document.documentElement.classList.add(theme);
  document.cookie = `theme=${theme}; path=/; max-age=31536000`; // 1年

  return theme;
};

// テーマのストア
export const theme = writable(getStoredTheme());
theme.subscribe((value: string) => applyTheme(value));
