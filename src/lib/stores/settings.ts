import { writable } from 'svelte/store';

const STORAGE_KEY = 'uniqueParameters';

// Node 25 以降は SSR 側にも localStorage が生えるため、theme ストアと同じく window で判定する
const isBrowser = typeof window !== 'undefined';

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

// 別タブでの切り替えを反映する。storage イベントは変更したタブ自身には届かない
if (isBrowser) {
  window.addEventListener('storage', (event) => {
    if (event.key !== STORAGE_KEY) return;
    uniqueParameters.set(event.newValue === 'true');
  });
}
