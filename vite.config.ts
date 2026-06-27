import { paraglideVitePlugin as paraglide } from '@inlang/paraglide-js';
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
const appVersion = packageJson.version;
const appDeployDate = new Date().toLocaleDateString('ja-JP');

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    paraglide({
      project: './project.inlang',
      outdir: './src/lib/paraglide',
      strategy: ['localStorage', 'preferredLanguage', 'baseLocale']
    })
  ],
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
    __APP_DEPLOY_DATE__: JSON.stringify(appDeployDate)
  }
});
