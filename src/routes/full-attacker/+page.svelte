<script lang="ts">
  import ParameterPageFullAttacker from '$lib/components/ParameterPageFullAttacker.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import * as m from '$lib/paraglide/messages';
</script>

<Seo title={m.fullAttackerTitle()} description={m.fullAttackerDescription()} />

<h1 class="py-2 text-center text-2xl font-bold sm:text-3xl">{m.fullAttacker()}</h1>
<p class="py-2 text-center">{m.fullAttackerIntro()}</p>

<ParameterPageFullAttacker playerCount={3} />
