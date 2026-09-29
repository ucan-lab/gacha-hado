import { dev } from '$app/environment';
import { injectAnalytics } from '@vercel/analytics/sveltekit';

// mode を省略するとブラウザでは process.env.NODE_ENV で判定され、dev 用の外部スクリプトを読みに行って CSP に止められる
if (!dev) injectAnalytics({ mode: 'production' });
