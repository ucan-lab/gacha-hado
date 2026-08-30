<script lang="ts">
  import UnderConstruction from '$lib/components/UnderConstruction.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { buildBreadcrumb } from '$lib/breadcrumb';
  import { page } from '$app/state';
  import * as m from '$lib/paraglide/messages';
</script>

<Seo title={m.formationTitle()} description={m.formationDescription()} />

<div class="bg-primary flex min-h-screen flex-col">
  <div class="container mx-auto p-4">
    <Breadcrumb items={buildBreadcrumb(page.url.pathname)} />

    <UnderConstruction />
  </div>
</div>
