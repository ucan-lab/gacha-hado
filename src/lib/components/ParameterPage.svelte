<script lang="ts">
  import ParameterPageBase from '$lib/components/ParameterPageBase.svelte';
  import { generateTeamParameters, resetParameters } from '$lib/stores/parameters';
  import { generateGachiMatchParameters, resetGachiMatchParameters } from '$lib/stores/gachiMatch';
  import * as m from '$lib/paraglide/messages';
  import type { ParameterObject } from '$lib/types';

  export let playerCount = 1;
  export let mode: 'normal' | 'gachi' = 'normal';

  let uniqueParameters = false;

  const generateParams: () => ParameterObject[] =
    mode === 'gachi'
      ? () => generateGachiMatchParameters()
      : () => generateTeamParameters(playerCount, uniqueParameters);

  const resetParams = mode === 'gachi' ? resetGachiMatchParameters : resetParameters;
</script>

<ParameterPageBase {playerCount} {generateParams} {resetParams}>
  <div slot="settings" class="w-full max-w-lg px-4">
    {#if mode === 'normal' && playerCount > 1}
      <label class="flex cursor-pointer items-center gap-2 py-3">
        <input type="checkbox" class="h-4 w-4 cursor-pointer" bind:checked={uniqueParameters} />
        {m.uniqueParameters()}
      </label>
    {/if}
  </div>
</ParameterPageBase>
