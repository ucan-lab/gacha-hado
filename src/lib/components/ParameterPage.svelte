<script lang="ts">
  import ParameterPageBase from '$lib/components/ParameterPageBase.svelte';
  import { generateTeamParameters, resetParameters } from '$lib/stores/parameters';
  import { generateGachiMatchParameters, resetGachiMatchParameters } from '$lib/stores/gachiMatch';
  import { uniqueParameters } from '$lib/stores/settings';
  import type { ParameterObject } from '$lib/types';

  export let playerCount = 1;
  export let mode: 'normal' | 'gachi' = 'normal';

  const generateParams: () => ParameterObject[] =
    mode === 'gachi'
      ? () => generateGachiMatchParameters()
      : () => generateTeamParameters(playerCount, $uniqueParameters);

  const resetParams = mode === 'gachi' ? resetGachiMatchParameters : resetParameters;
</script>

<ParameterPageBase {playerCount} {generateParams} {resetParams} />
