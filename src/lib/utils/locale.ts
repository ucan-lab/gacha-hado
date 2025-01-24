import {
  setLanguageTag,
  type AvailableLanguageTag,
  availableLanguageTags
} from '$lib/paraglide/runtime';
import { writable } from 'svelte/store';

const LOCALE_KEY = 'locale';
export const locale = writable<AvailableLanguageTag | null>(null);

export const initializeLocale = () => {
  if (typeof window !== 'undefined') {
    const storedLocale = localStorage.getItem(LOCALE_KEY);

    if (storedLocale && availableLanguageTags.includes(storedLocale as AvailableLanguageTag)) {
      locale.set(storedLocale as AvailableLanguageTag);
      setLanguageTag(storedLocale as AvailableLanguageTag);
    } else {
      const browserLocale = navigator.language.split('-')[0]; // "en-US" -> "en"
      const fallbackLocale = 'en';
      const resolvedLocale = availableLanguageTags.includes(browserLocale as AvailableLanguageTag)
        ? browserLocale as AvailableLanguageTag
        : fallbackLocale;

      locale.set(resolvedLocale);
      setLanguageTag(resolvedLocale);
    }
  }
};

export const changeLocale = (newLocale: string) => {
  if (availableLanguageTags.includes(newLocale as AvailableLanguageTag)) {
    locale.set(newLocale as AvailableLanguageTag);
    setLanguageTag(newLocale as AvailableLanguageTag);
    localStorage.setItem(LOCALE_KEY, newLocale);
    window.location.reload();
  }
};
