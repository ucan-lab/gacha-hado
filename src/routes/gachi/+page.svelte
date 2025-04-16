<script lang="ts">
  import ParameterPage from '$lib/components/ParameterPage.svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import * as m from '$lib/paraglide/messages';
</script>

<Header />

<h1 class="py-2 text-center text-2xl font-bold sm:text-3xl">{m.gachiMatch()}</h1>
<p class="py-2 text-center">{m.gachiMatchIntro()}</p>

<ParameterPage playerCount={3} mode="gachi" />

<Footer />
