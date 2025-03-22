<script lang="ts">
  import ParameterPageBase from '$lib/components/ParameterPageBase.svelte';
  import { generateRandomParameters, resetParameters } from '$lib/stores/parameters';

  export let playerCount = 1;
</script>

<ParameterPageBase {playerCount} generateParams={generateRandomParameters} resetParams={resetParameters} />
