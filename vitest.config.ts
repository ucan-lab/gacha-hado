import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'node:url';
import type { PluginOption } from 'vite';

const svelteComponentPattern = /\.svelte(?:[?#]|$)/;
const svelteModulePattern = /\.svelte\.[jt]s(?:[?#]|$)/;
const svelteStylePattern = /[?&]svelte&type=style&lang\.css$/;
const jpgPattern = /\.jpg(?:[?#]|$)/;

const shouldTransform = (pluginName: string | undefined, id: string) => {
  if (pluginName === 'vite-plugin-svelte:compile-module') {
    return svelteModulePattern.test(id);
  }

  return svelteComponentPattern.test(id);
};

const sveltePlugins = (): PluginOption[] =>
  svelte().map((plugin) => {
    if (!plugin || typeof plugin !== 'object' || !('transform' in plugin) || !plugin.transform) {
      if (plugin?.name === 'vite-plugin-svelte:load-compiled-css') {
        return {
          ...plugin,
          resolveId(id, importer, options) {
            if (!svelteStylePattern.test(id)) return;
            const resolveId = plugin.resolveId;
            if (typeof resolveId === 'function') {
              return resolveId.call(this, id, importer, options);
            }
            if (resolveId && 'handler' in resolveId && typeof resolveId.handler === 'function') {
              return resolveId.handler.call(this, id, importer, options);
            }
          },
          load(id, options) {
            if (!svelteStylePattern.test(id)) return;
            const load = plugin.load;
            if (typeof load === 'function') {
              return load.call(this, id, options);
            }
            if (load && 'handler' in load && typeof load.handler === 'function') {
              return load.handler.call(this, id, options);
            }
          }
        };
      }

      return plugin;
    }

    if (typeof plugin.transform === 'function') {
      const transform = plugin.transform;

      return {
        ...plugin,
        transform(code, id, options) {
          if (!shouldTransform(plugin.name, id)) return;
          return transform.call(this, code, id, options);
        }
      };
    }

    const transform = plugin.transform;
    if (!('handler' in transform) || typeof transform.handler !== 'function') {
      return plugin;
    }

    const handler = transform.handler;

    return {
      ...plugin,
      transform: {
        ...transform,
        handler(code, id, options) {
          if (!shouldTransform(plugin.name, id)) return;
          return handler.call(this, code, id, options);
        }
      }
    };
  });

const assetStubPlugin = (): PluginOption => ({
  name: 'test-asset-stub',
  enforce: 'pre',
  transform(_code, id) {
    if (!jpgPattern.test(id)) return;
    return `export default ${JSON.stringify(id.split('?')[0])};`;
  },
  load(id) {
    if (!jpgPattern.test(id)) return;
    return `export default ${JSON.stringify(id.split('?')[0])};`;
  }
});

export default defineConfig({
  assetsInclude: ['**/*.jpg'],
  plugins: [assetStubPlugin(), ...sveltePlugins()],
  resolve: {
    conditions: ['browser', 'svelte'],
    alias: [
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
