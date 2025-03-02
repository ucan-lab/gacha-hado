import type { Handle } from '@sveltejs/kit';
import { i18n } from '$lib/i18n';

const handleParaglide: Handle = i18n.handle();

export const handle: Handle = async ({ event, resolve }) => {
  const response = await handleParaglide({ event, resolve });

  // Flash of Unstyled Content 対策でクッキーからテーマを取得
  let theme = event.cookies.get('theme') || 'light';
  if (theme === 'auto') {
    theme = 'light';
  }

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
};
