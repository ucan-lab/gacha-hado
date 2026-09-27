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

const UNIQUE_PARAMETERS_PATHS = ['/duo', '/trio'];

// ガチマッチは専用の抽選を通るため、設定が効くのはデュオ/トリオのページだけ
export const isUniqueParametersAvailable = (pathname: string): boolean =>
  UNIQUE_PARAMETERS_PATHS.includes(pathname);

uniqueParameters.subscribe((value) => {
  if (!isBrowser) return;

  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // 保存できなくてもセッション中は設定を有効にする
  }
});
