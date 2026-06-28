<script lang="ts">
  import '../app.css';
  import * as m from '$lib/paraglide/messages';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { page } from '$app/state';
  let { children } = $props();
</script>

<!-- ページ遷移ごとに Header を再マウントし、メニュー等のローカル UI 状態をリセットする
     （各ページが個別に Header を持っていた頃の挙動を維持するため） -->
{#key page.url.pathname}
  <Header />
{/key}

{@render children()}

<Footer />

<svelte:head>
  <title>{m.appName()}</title>
  <meta name="description" content={m.description()} />
</svelte:head>
