export const THEMES = ['neon', 'classic-light', 'classic-dark'] as const;

export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = 'neon';

export const isTheme = (value: unknown): value is Theme =>
  typeof value === 'string' && (THEMES as readonly string[]).includes(value);

/** 許可リスト外・不正値（null/undefined/任意文字列）はデフォルト(neon)へ正規化する。 */
export const normalizeTheme = (value: unknown): Theme => (isTheme(value) ? value : DEFAULT_THEME);

/**
 * 表示に使うテーマを決める。theme ストアはサーバでリクエスト間に共有され常に既定値のため、
 * SSR では cookie 由来の値（layout の load が返す page.data.theme）を使い、クライアントではストアを使う。
 */
export const resolveCurrentTheme = (
  isBrowser: boolean,
  storeTheme: Theme,
  ssrTheme: unknown
): Theme => (isBrowser ? storeTheme : normalizeTheme(ssrTheme));
