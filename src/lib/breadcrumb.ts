export type BreadcrumbItem = { label: string; href: string };

// パンくずに表示するルートのラベルを一元管理する。
// 各ページはパス(page.url.pathname)を渡すだけでパンくずを構築でき、
// ラベルの変更や i18n 化をこの一箇所で行えるようにする。
const ROUTE_LABELS: Record<string, string> = {
  '/': 'ホーム',
  '/about': 'HADOについて',
  '/about/what-is-hado': 'HADOとは',
  '/about/rules': 'HADO ルール',
  '/about/parameters': 'パラメータ解説',
  '/about/roles': '役割',
  '/about/formation': '編成'
};

// 指定パスについて、ルート('/')から現在地までのパンくず項目を生成する。
// 未定義のパスはセグメント文字列をラベルにフォールバックする。
export const buildBreadcrumb = (pathname: string): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [{ label: ROUTE_LABELS['/'], href: '/' }];
  let href = '';
  for (const segment of pathname.split('/').filter(Boolean)) {
    href += `/${segment}`;
    items.push({ label: ROUTE_LABELS[href] ?? href, href });
  }
  return items;
};
