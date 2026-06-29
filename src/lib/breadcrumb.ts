import * as m from '$lib/paraglide/messages';

export type BreadcrumbItem = { label: string; href: string };

// パンくずに表示するルートのラベルを一元管理する。
// 各ページはパス(page.url.pathname)を渡すだけでパンくずを構築でき、
// ラベルの変更や i18n 化をこの一箇所で行えるようにする。
// 値は () => string の遅延参照にすることで、呼び出し時の現在言語を反映する。
const ROUTE_LABELS: Record<string, () => string> = {
  '/': m.home,
  '/about': m.navAbout,
  '/about/what-is-hado': m.navWhatIsHado,
  '/about/rules': m.navRules,
  '/about/parameters': m.navParameters,
  '/about/roles': m.navRoles,
  '/about/formation': m.navFormation
};

// 指定パスについて、ルート('/')から現在地までのパンくず項目を生成する。
// 未定義のパスはセグメント文字列をラベルにフォールバックする。
export const buildBreadcrumb = (pathname: string): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [{ label: ROUTE_LABELS['/'](), href: '/' }];
  let href = '';
  for (const segment of pathname.split('/').filter(Boolean)) {
    href += `/${segment}`;
    const labelFn = ROUTE_LABELS[href];
    items.push({ label: labelFn ? labelFn() : segment, href });
  }
  return items;
};
