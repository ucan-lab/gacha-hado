<script lang="ts">
  import ParameterPageBase from '$lib/components/ParameterPageBase.svelte';
  import {
    generateRandomParametersFullAttacker,
    resetParametersFullAttacker
  } from '$lib/stores/parametersFullAttacker';

  export let playerCount = 1;
</script>

<ParameterPageBase
  {playerCount}
  generateParams={generateRandomParametersFullAttacker}
  resetParams={resetParametersFullAttacker}
/>
