import type { Handle } from '@sveltejs/kit';
import { i18n } from '$lib/i18n';
const handleParaglide: Handle = i18n.handle();

export const handle: Handle = async ({ event, resolve }) => {
  const response = await handleParaglide({ event, resolve });

  const theme = event.cookies.get('theme') || 'dark';

  return new Response(await response.text(), {
    status: response.status,
    headers: response.headers
  })
    .text()
    .then((html) => {
      return new Response(html.replace('%THEME%', theme), {
        status: response.status,
        headers: response.headers
      });
    });
};
