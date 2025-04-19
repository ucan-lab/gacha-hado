<script lang="ts">
  import ParameterPageBase from '$lib/components/ParameterPageBase.svelte';
  import { generateRandomParameters, resetParameters } from '$lib/stores/parameters';
  import { generateGachiMatchParameters, resetGachiMatchParameters } from '$lib/stores/gachiMatch';

  export let playerCount = 1;
  export let mode: 'normal' | 'gachi' = 'normal';

  interface ParameterObject {
    bulletSpeed: number;
    bulletScale: number;
    chargeSpeed: number;
    shieldStrength: number;
  }

  const generateParams: () => ParameterObject[] =
    mode === 'gachi'
      ? () => generateGachiMatchParameters()
      : () => Array.from({ length: playerCount }, () => generateRandomParameters());

  const resetParams = mode === 'gachi' ? resetGachiMatchParameters : resetParameters;
</script>

<ParameterPageBase {playerCount} {generateParams} {resetParams} />
