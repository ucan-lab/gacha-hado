import { setLocale, baseLocale, type Locale, locales } from '$lib/paraglide/runtime';
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

export const initializeLocale = () => {
  if (typeof window === 'undefined') return;

  const storedLocale = localStorage.getItem(LOCALE_KEY);
  const resolvedLocale =
    storedLocale && locales.includes(storedLocale as Locale)
      ? (storedLocale as Locale)
      : negotiateBrowserLocale();

  locale.set(resolvedLocale);
  // cookie strategy 有効時、setLocale が PARAGLIDE_LOCALE cookie も書き込むため、
  // 既存 localStorage['locale'] 利用者の cookie 移行も初回クライアントで一度ここで行われる
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
