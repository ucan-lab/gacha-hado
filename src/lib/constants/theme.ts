export const THEMES = ['dark', 'light'] as const;

export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = 'light';

export const isTheme = (value: unknown): value is Theme =>
  typeof value === 'string' && (THEMES as readonly string[]).includes(value);

/** 許可リスト外・不正値（null/undefined/任意文字列）はデフォルト(light)へ正規化する。 */
export const normalizeTheme = (value: unknown): Theme => (isTheme(value) ? value : DEFAULT_THEME);
