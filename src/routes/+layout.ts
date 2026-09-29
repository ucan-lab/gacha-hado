import { dev } from '$app/environment';
import { injectAnalytics } from '@vercel/analytics/sveltekit';

// dev 用の計測スクリプトは外部ドメインから読まれ CSP の script-src に止められるため、dev では読み込まない。
// mode を省略するとブラウザでは process.env.NODE_ENV で判定されるので、本番用を明示する
if (!dev) injectAnalytics({ mode: 'production' });
