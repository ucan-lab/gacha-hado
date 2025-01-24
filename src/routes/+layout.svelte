<script lang="ts">
  import { i18n } from '$lib/i18n';
  import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  import '../app.css';
  import * as m from '$lib/paraglide/messages';
  let { children } = $props();
</script>

<ParaglideJS {i18n}>
  {@render children()}
</ParaglideJS>

<svelte:head>
  <title>{m.appName()}</title>
</svelte:head>
