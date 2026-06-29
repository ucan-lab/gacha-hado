<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import { page } from '$app/state';
  import { SHARE_URL } from '$lib/config';

  let { title, description = m.description() }: { title?: string; description?: string } = $props();

  const fullTitle = $derived(title ? `${title} | ${m.appName()}` : m.appName());
  // OGP/canonical は固定の本番 origin(SHARE_URL)を基準にし、preview/custom host や
  // クエリ付きアクセスでも正規 URL が出力されるようにする（重複インデックス・シェア数分散を防ぐ）
  const ogImage = `${SHARE_URL}/og-image.png`;
  const cleanUrl = $derived(`${SHARE_URL}${page.url.pathname}`);
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={cleanUrl} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:site_name" content={m.appName()} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  <link rel="canonical" href={cleanUrl} />
</svelte:head>
