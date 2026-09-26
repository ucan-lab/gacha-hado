// See https://svelte.dev/docs/kit/types#app.d.ts
import type { Theme } from '$lib/constants/theme';

// for information about these interfaces
declare global {
  // Injected by Vite `define` in vite.config.ts
  const __APP_VERSION__: string;
  const __APP_DEPLOY_DATE__: string;

  namespace App {
    // interface Error {}
    interface Locals {
      theme: Theme;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
