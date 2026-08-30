import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// 旧 URL (/full-atacker) は綴り誤り。新 URL (/full-attacker) へ恒久リダイレクトする。
export const load: PageLoad = () => {
  redirect(301, '/full-attacker');
};
