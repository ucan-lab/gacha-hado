import { defineConfig } from 'vitest/config';
import { compile, compileModule } from 'svelte/compiler';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [
    {
      name: 'svelte-component-test-compiler',
      transform(code, id) {
        if (/\.svelte\.[jt]s(?:[?#]|$)/.test(id)) {
          const compiled = compileModule(code, {
            filename: id,
            dev: true
          });

          return {
            code: compiled.js.code,
            map: compiled.js.map
          };
        }

        if (!/\.svelte(?:[?#]|$)/.test(id)) return;

        const compiled = compile(code, {
          filename: id,
          generate: 'client',
          dev: true
        });

        return {
          code: compiled.js.code,
          map: compiled.js.map
        };
      }
    }
  ],
  resolve: {
    alias: [
      {
        find: /^svelte$/,
        replacement: fileURLToPath(
          new URL('./node_modules/svelte/src/index-client.js', import.meta.url)
        )
      },
      {
        find: '$lib',
        replacement: fileURLToPath(new URL('./src/lib', import.meta.url))
      }
    ]
  },
  ssr: {
    noExternal: ['@testing-library/svelte', '@testing-library/svelte-core', '@tabler/icons-svelte']
  },
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.{test,spec}.{js,ts}'],
    setupFiles: ['src/lib/test/setup.ts']
  }
});
