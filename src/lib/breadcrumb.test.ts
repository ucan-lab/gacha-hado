import { describe, it, expect } from 'vitest';
import { buildBreadcrumb } from './breadcrumb';

describe('buildBreadcrumb', () => {
  it('ルートは ホーム のみを返す', () => {
    expect(buildBreadcrumb('/')).toEqual([{ label: 'ホーム', href: '/' }]);
  });

  it('/about は ホーム > HADOについて', () => {
    expect(buildBreadcrumb('/about')).toEqual([
      { label: 'ホーム', href: '/' },
      { label: 'HADOについて', href: '/about' }
    ]);
  });

  it('/about/rules は3階層を href ごとに生成する', () => {
    expect(buildBreadcrumb('/about/rules')).toEqual([
      { label: 'ホーム', href: '/' },
      { label: 'HADOについて', href: '/about' },
      { label: 'HADO ルール', href: '/about/rules' }
    ]);
  });

  it('全 about 配下ページのラベルが定義済み', () => {
    for (const path of [
      '/about/what-is-hado',
      '/about/rules',
      '/about/parameters',
      '/about/roles',
      '/about/formation'
    ]) {
      const last = buildBreadcrumb(path).at(-1);
      expect(last?.href).toBe(path);
      expect(last?.label).not.toBe(path); // フォールバックではなく定義済みラベル
    }
  });

  it('未定義パスはセグメントをラベルにフォールバックする', () => {
    expect(buildBreadcrumb('/unknown')).toEqual([
      { label: 'ホーム', href: '/' },
      { label: '/unknown', href: '/unknown' }
    ]);
  });
});
