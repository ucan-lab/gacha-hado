<script lang="ts">
  import { browser } from '$app/environment';
  import { theme } from '$lib/stores/theme';
  import { resolveCurrentTheme } from '$lib/constants/theme';
  import Seo from '$lib/components/Seo.svelte';
  import TopClassic from '$lib/components/TopClassic.svelte';
  import TopNeon from '$lib/components/TopNeon.svelte';

  let { data } = $props();

  const currentTheme = $derived(resolveCurrentTheme(browser, $theme, data.theme));
</script>

<Seo />

{#if currentTheme === 'neon'}
  <TopNeon />
{:else}
  <TopClassic />
{/if}
