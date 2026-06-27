import {
  setLocale,
  baseLocale,
  cookieName,
  cookieMaxAge,
  type Locale,
  locales
} from '$lib/paraglide/runtime';
import { writable } from 'svelte/store';

const LOCALE_KEY = 'locale';
export const locale = writable<Locale | null>(null);

// navigator.languages を優先順に評価し、サポート済みロケールが無ければ baseLocale(ja) を返す
const negotiateBrowserLocale = (): Locale => {
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];

  for (const lang of candidates) {
    const base = lang.split('-')[0]; // "en-US" -> "en"
    if (locales.includes(base as Locale)) {
      return base as Locale;
    }
  }

  return baseLocale;
};

// document.cookie を直接読み、サポート済みロケールのみ返す（paraglide のキャッシュを介さず
// 書き込み直後の読み戻し確認に使えるようにする）
const readLocaleCookie = (): Locale | null => {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${cookieName}=([^;]*)`));
  const value = match?.[1];
  return value && locales.includes(value as Locale) ? (value as Locale) : null;
};

const writeLocaleCookie = (value: Locale) => {
  document.cookie = `${cookieName}=${value}; path=/; max-age=${cookieMaxAge}`;
};

export const initializeLocale = () => {
  if (typeof window === 'undefined') return;

  const cookieLocale = readLocaleCookie();
  const storedRaw = localStorage.getItem(LOCALE_KEY);
  const storedLocale =
    storedRaw && locales.includes(storedRaw as Locale) ? (storedRaw as Locale) : null;

  // 旧 localStorage['locale'] を持つユーザーで cookie とずれている場合のみ、
  // 一度だけ cookie を localStorage 値へ揃えてフルリロードし、SSR と一致させる（cookie 移行）。
  if (storedLocale && cookieLocale !== storedLocale) {
    writeLocaleCookie(storedLocale);
    // cookie が実際に反映された場合のみ reload する。cookie 無効環境では反映されず、
    // reload しても同じ分岐に戻るため、無限リロードを避けて reload しない（client 側のみ適用）。
    if (readLocaleCookie() === storedLocale) {
      locale.set(storedLocale);
      window.location.reload();
      return;
    }
    locale.set(storedLocale);
    setLocale(storedLocale, { reload: false });
    return;
  }

  // 通常解決: cookie があればそれ（SSR と一致）、無ければブラウザ言語ネゴシエーション。
  // いずれも SSR と同じ解決のためハイドレーション不一致は出ない。
  const resolvedLocale = cookieLocale ?? negotiateBrowserLocale();

  locale.set(resolvedLocale);
  setLocale(resolvedLocale, { reload: false });
};

export const changeLocale = (newLocale: string) => {
  if (locales.includes(newLocale as Locale)) {
    locale.set(newLocale as Locale);
    localStorage.setItem(LOCALE_KEY, newLocale);
    // setLocale が cookie(PARAGLIDE_LOCALE) と paraglide 側 localStorage の両方へ書き込む
    setLocale(newLocale as Locale);
  }
};
