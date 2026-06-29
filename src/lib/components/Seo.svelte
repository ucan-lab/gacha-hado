<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import { page } from '$app/state';

  let { title, description = m.description() }: { title?: string; description?: string } = $props();

  const fullTitle = $derived(title ? `${title} | ${m.appName()}` : m.appName());
  const ogImage = $derived(`${page.url.origin}/favicon.svg`);
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={page.url.href} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:site_name" content={m.appName()} />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  <link rel="canonical" href={page.url.href} />
</svelte:head>
