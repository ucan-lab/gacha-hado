import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { getLocale, getTextDirection } from '$lib/paraglide/runtime';

export const handle: Handle = async ({ event, resolve }) => {
  return paraglideMiddleware(event.request, async ({ request }) => {
    event.request = request;

    // Flash of Unstyled Content 対策でクッキーからテーマを取得する。
    // data-theme へ注入する前に許可リストで検証し、auto は light に正規化、
    // 許可リスト外の任意値・クォート細工は light に落として属性ブレイクアウトを封じる。
    const theme = event.cookies.get('theme') === 'dark' ? 'dark' : 'light';

    // %THEME% も transformPageChunk 内で置換し、HTML ページのみを対象にする。
    // resolve() の戻り値をそのまま返すことで、ストリーミングを保ち、
    // 非HTML/静的/204/304 などのレスポンスを再構築しない（Content-Length 手動計算も不要）。
    return resolve(event, {
      transformPageChunk: ({ html }) =>
        html
          .replace('%paraglide.lang%', getLocale())
          .replace('%paraglide.textDirection%', getTextDirection())
          .replace('%THEME%', theme)
    });
  });
};
