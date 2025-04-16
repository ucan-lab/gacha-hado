<script lang="ts">
  import ParameterPageBase from '$lib/components/ParameterPageBase.svelte';
  import {
    generateRandomParametersFullAttacker,
    resetParametersFullAttacker
  } from '$lib/stores/parametersFullAttacker';

  export let playerCount = 1;

  const generateParams = () => Array.from({ length: playerCount }, () => generateRandomParametersFullAttacker());
  const resetParams = resetParametersFullAttacker;
</script>

<ParameterPageBase
  {playerCount}
  generateParams={generateParams}
  resetParams={resetParams}
/>
