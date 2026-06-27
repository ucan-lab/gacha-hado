import { setLocale, type Locale, locales } from '$lib/paraglide/runtime';
import { writable } from 'svelte/store';

const LOCALE_KEY = 'locale';
export const locale = writable<Locale | null>(null);

export const initializeLocale = () => {
  if (typeof window !== 'undefined') {
    const storedLocale = localStorage.getItem(LOCALE_KEY);

    if (storedLocale && locales.includes(storedLocale as Locale)) {
      locale.set(storedLocale as Locale);
      setLocale(storedLocale as Locale, { reload: false });
    } else {
      const browserLocale = navigator.language.split('-')[0]; // "en-US" -> "en"
      const fallbackLocale = 'en';
      const resolvedLocale = locales.includes(browserLocale as Locale)
        ? (browserLocale as Locale)
        : fallbackLocale;

      locale.set(resolvedLocale as Locale);
      setLocale(resolvedLocale as Locale, { reload: false });
    }
  }
};

export const changeLocale = (newLocale: string) => {
  if (locales.includes(newLocale as Locale)) {
    locale.set(newLocale as Locale);
    localStorage.setItem(LOCALE_KEY, newLocale);
    setLocale(newLocale as Locale);
  }
};
