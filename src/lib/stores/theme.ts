import { writable } from 'svelte/store';

const getInitialTheme = () => {
  if (typeof document !== 'undefined') {
    return (
      localStorage.getItem('theme') || document.documentElement.getAttribute('data-theme') || 'dark'
    );
  }
  return 'dark';
};

export const theme = writable(getInitialTheme());

theme.subscribe((value) => {
  if (typeof document !== 'undefined') {
    localStorage.setItem('theme', value);
    document.documentElement.setAttribute('data-theme', value);
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(value);
    document.cookie = `theme=${value}; path=/; max-age=31536000`; // 1年
  }
});
