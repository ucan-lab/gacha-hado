import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { getLocale, getTextDirection } from '$lib/paraglide/runtime';

export const handle: Handle = async ({ event, resolve }) => {
  return paraglideMiddleware(event.request, async ({ request }) => {
    event.request = request;

    // Flash of Unstyled Content 対策でクッキーからテーマを取得
    let theme = event.cookies.get('theme') || 'light';
    if (theme === 'auto') {
      theme = 'light';
    }

    const response = await resolve(event, {
      transformPageChunk: ({ html }) =>
        html
          .replace('%paraglide.lang%', getLocale())
          .replace('%paraglide.textDirection%', getTextDirection())
    });

    const responseText = await response.text();
    const modifiedResponseText = responseText.replace('%THEME%', theme);

    // Content-Length を再計算しないと ERR_CONTENT_LENGTH_MISMATCH エラーが発生するため
    const contentLength = new TextEncoder().encode(modifiedResponseText).length;
    const headers = new Headers(response.headers);
    headers.delete('Content-Length');
    headers.set('Content-Length', contentLength.toString());

    return new Response(modifiedResponseText, {
      status: response.status,
      headers
    });
  });
};
