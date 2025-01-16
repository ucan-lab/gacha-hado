import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
const appVersion = packageJson.version;
const appDeployDate = new Date().toLocaleDateString('ja-JP');

export default defineConfig({
  plugins: [
    sveltekit(),
    paraglide({
      project: './project.inlang',
      outdir: './src/lib/paraglide'
    })
  ],
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
    __APP_DEPLOY_DATE__: JSON.stringify(appDeployDate)
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
