<script lang="ts">
  import ParameterPageFullAttacker from '$lib/components/ParameterPageFullAttacker.svelte';
  import * as m from '$lib/paraglide/messages';
</script>

<h1 class="py-2 text-center text-2xl font-bold sm:text-3xl">{m.fullAtacker()}</h1>
<p class="py-2 text-center">{m.fullAtackerIntro()}</p>

<ParameterPageFullAttacker playerCount={3} />
