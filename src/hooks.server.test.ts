import { describe, it, expect, vi } from 'vitest';

// paraglide middleware は callback をそのまま実行するだけにモックする
vi.mock('$lib/paraglide/server', () => ({
  paraglideMiddleware: (request: Request, cb: (args: { request: Request }) => unknown) =>
    cb({ request })
}));
vi.mock('$lib/paraglide/runtime', () => ({
  getLocale: () => 'ja',
  getTextDirection: () => 'ltr'
}));

import { handle } from './hooks.server';

type ResolveOpts = { transformPageChunk: (input: { html: string }) => string };

const makeEvent = (theme?: string) => ({
  request: new Request('http://localhost/'),
  cookies: { get: (key: string) => (key === 'theme' ? theme : undefined) }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const run = (event: ReturnType<typeof makeEvent>, resolve: any) =>
  handle({ event, resolve } as never) as Promise<Response>;

describe('handle hook (#139 レスポンス非破壊)', () => {
  it('204 (no-body) レスポンスを再構築せずそのまま返し throw しない', async () => {
    // 旧実装は new Response(body, { status: 204 }) を組み立てて throw していた
    const resolve = vi.fn(async () => new Response(null, { status: 204 }));

    const res = await run(makeEvent(), resolve);

    expect(res.status).toBe(204);
    expect(res.body).toBeNull();
  });

  it('非HTMLレスポンス(JSON)のボディと Content-Type を変更しない', async () => {
    const json = JSON.stringify({ ok: true });
    const resolve = vi.fn(
      async () => new Response(json, { headers: { 'content-type': 'application/json' } })
    );

    const res = await run(makeEvent('dark'), resolve);

    expect(await res.text()).toBe(json);
    expect(res.headers.get('content-type')).toBe('application/json');
  });

  it('HTML の %THEME% / %paraglide.lang% / %paraglide.textDirection% を transformPageChunk で置換する', async () => {
    const resolve = vi.fn(async (_event: unknown, opts: ResolveOpts) => {
      const html = opts.transformPageChunk({
        html: '<html data-theme="%THEME%" lang="%paraglide.lang%" dir="%paraglide.textDirection%">'
      });
      return new Response(html, { headers: { 'content-type': 'text/html' } });
    });

    const res = await run(makeEvent('dark'), resolve);
    const text = await res.text();

    expect(text).toContain('data-theme="dark"');
    expect(text).toContain('lang="ja"');
    expect(text).toContain('dir="ltr"');
  });

  it('theme=auto は light に正規化される', async () => {
    const resolve = vi.fn(
      async (_event: unknown, opts: ResolveOpts) =>
        new Response(opts.transformPageChunk({ html: 'data-theme="%THEME%"' }))
    );

    const res = await run(makeEvent('auto'), resolve);

    expect(await res.text()).toContain('data-theme="light"');
  });
});
