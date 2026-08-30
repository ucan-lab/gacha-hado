<script lang="ts">
  import ParameterPage from '$lib/components/ParameterPage.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import * as m from '$lib/paraglide/messages';
</script>

<Seo title={m.soloTitle()} description={m.soloDescription()} />
<ParameterPage playerCount={1} />
