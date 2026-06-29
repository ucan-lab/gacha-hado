import { redirect } from '@sveltejs/kit';

// 旧 URL (/full-atacker) は綴り誤り。新 URL (/full-attacker) へ恒久リダイレクトする。
export const load = () => {
  redirect(301, '/full-attacker');
};
