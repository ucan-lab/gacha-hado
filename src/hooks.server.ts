import type { Handle } from '@sveltejs/kit';
import { i18n } from '$lib/i18n';

const handleParaglide: Handle = i18n.handle();

export const handle: Handle = async ({ event, resolve }) => {
  const response = await handleParaglide({ event, resolve });

  let theme = event.cookies.get('theme') || 'light';
  if (theme === 'auto') {
    theme = 'light';
  }

  const text = await response.text();

  return new Response(text.replace('%THEME%', theme), {
    status: response.status,
    headers: response.headers
  });
};
