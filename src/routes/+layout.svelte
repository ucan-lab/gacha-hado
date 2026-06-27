<script lang="ts">
  import '../app.css';
  import * as m from '$lib/paraglide/messages';
  let { children } = $props();
</script>

{@render children()}

<svelte:head>
  <title>{m.appName()}</title>
  <meta name="description" content={m.description()} />
</svelte:head>
