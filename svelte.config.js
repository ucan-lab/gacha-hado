import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter(),
    // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
    csp: {
      directives: {
        'script-src': ['self', 'https://vercel.live'],
        'connect-src': [
          'https://vercel.live',
          'https://*.vercel.app',
          'wss://ws-us3.pusher.com',
          'ws://localhost:5176',
        ],
        'img-src': ['self', 'data: blob:', 'https://vercel.live', 'https://vercel.com'],
        'frame-src': ['https://vercel.live'],
        'style-src': ['https://vercel.live', 'https://*.vercel.app', "'unsafe-inline'"],
        'font-src': ['self', 'https://vercel.live', 'https://assets.vercel.com'],
        'object-src': ['none'],
        'base-uri': ['self']
      }
    }
  }
};

export default config;
