<script lang="ts">
  import ParameterPageFullAttacker from '$lib/components/ParameterPageFullAttacker.svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import * as m from '$lib/paraglide/messages';
</script>

<Header />

<h1 class="py-2 text-center text-2xl font-bold sm:text-3xl">{m.fullAttacker()}</h1>
<p class="py-2 text-center">{m.fullAttackerIntro()}</p>

<ParameterPageFullAttacker playerCount={3} />

<Footer />
