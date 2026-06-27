import {
  setLocale,
  baseLocale,
  extractLocaleFromCookie,
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

const writeLocaleCookie = (value: Locale) => {
  const base = `${cookieName}=${value}; path=/; max-age=${cookieMaxAge}`;
  document.cookie = base;
};

export const initializeLocale = () => {
  if (typeof window === 'undefined') return;

  const cookieLocale = extractLocaleFromCookie();
  const storedLocale = localStorage.getItem(LOCALE_KEY);
  const hasStored = storedLocale && locales.includes(storedLocale as Locale);

  // 旧 localStorage['locale'] を持つユーザーで cookie とずれている場合のみ、
  // 一度だけ cookie を localStorage 値へ揃えてフルリロードし、SSR と一致させる（cookie 移行）。
  // 揃った後 (cookie === stored) は二度と入らないためループしない。
  if (hasStored && cookieLocale !== storedLocale) {
    writeLocaleCookie(storedLocale as Locale);
    locale.set(storedLocale as Locale);
    window.location.reload();
    return;
  }

  // 通常解決: cookie があればそれ（SSR と一致）、無ければブラウザ言語ネゴシエーション。
  // いずれも SSR と同じ解決のためハイドレーション不一致は出ない。
  const resolvedLocale =
    cookieLocale && locales.includes(cookieLocale) ? cookieLocale : negotiateBrowserLocale();

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
