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

// SvelteKit の transformPageChunk は { html, done } を受け取る契約
type ResolveOpts = { transformPageChunk: (input: { html: string; done: boolean }) => string };

const makeEvent = (theme?: string) => ({
  request: new Request('http://localhost/'),
  cookies: { get: (key: string) => (key === 'theme' ? theme : undefined) }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const run = (event: ReturnType<typeof makeEvent>, resolve: any) =>
  handle({ event, resolve } as never) as Promise<Response>;

describe('handle hook (#139 レスポンス非破壊)', () => {
  it('204 (no-body) レスポンスを同一インスタンスのまま返し throw しない', async () => {
    // 旧実装は new Response(body, { status: 204 }) を組み立てて throw していた
    const original = new Response(null, { status: 204 });
    const resolve = vi.fn(async () => original);

    const res = await run(makeEvent(), resolve);

    expect(res).toBe(original);
    expect(res.status).toBe(204);
    expect(res.body).toBeNull();
  });

  it('非HTML(ストリーム)レスポンスを再構築せず同一インスタンス・ボディ未消費のまま返す', async () => {
    // 旧実装は response.text() でボディを消費し new Response を組み直すため、
    // 同一インスタンス/未消費/Content-Length 非合成 のいずれも満たさなかった
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('{"ok":true}'));
        controller.close();
      }
    });
    const original = new Response(stream, { headers: { 'content-type': 'application/json' } });
    const resolve = vi.fn(async () => original);

    const res = await run(makeEvent('dark'), resolve);

    expect(res).toBe(original); // 再構築していない（同一インスタンス）
    expect(original.bodyUsed).toBe(false); // hook がボディを消費していない（ストリーム保持）
    expect(res.headers.get('content-length')).toBeNull(); // Content-Length を合成していない
    expect(res.headers.get('content-type')).toBe('application/json');
    expect(await res.text()).toBe('{"ok":true}');
  });

  it('HTML の %THEME% / %paraglide.lang% / %paraglide.textDirection% を transformPageChunk で置換する', async () => {
    const resolve = vi.fn(async (_event: unknown, opts: ResolveOpts) => {
      const html = opts.transformPageChunk({
        html: '<html data-theme="%THEME%" lang="%paraglide.lang%" dir="%paraglide.textDirection%">',
        done: true
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
        new Response(opts.transformPageChunk({ html: 'data-theme="%THEME%"', done: true }))
    );

    const res = await run(makeEvent('auto'), resolve);

    expect(await res.text()).toContain('data-theme="light"');
  });
});
