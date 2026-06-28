<script lang="ts">
  import '../app.css';
  import * as m from '$lib/paraglide/messages';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  let { children } = $props();
</script>

<Header />

{@render children()}

<Footer />

<svelte:head>
  <title>{m.appName()}</title>
  <meta name="description" content={m.description()} />
</svelte:head>
