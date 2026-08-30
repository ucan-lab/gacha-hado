import { writable } from 'svelte/store';

const STORAGE_KEY = 'uniqueParameters';

const isBrowser = typeof localStorage !== 'undefined';

const getStoredUniqueParameters = (): boolean => {
  if (!isBrowser) return false;

  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    // プライベートモード等、localStorage へのアクセス自体が例外になる環境がある
    return false;
  }
};

// チーム内でパラメータを被らせない設定（デュオ/トリオのみ効く）
export const uniqueParameters = writable<boolean>(getStoredUniqueParameters());

uniqueParameters.subscribe((value) => {
  if (!isBrowser) return;

  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // 保存できなくてもセッション中は設定を有効にする
  }
});
