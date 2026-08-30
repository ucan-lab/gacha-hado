<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/state';
  import ParameterPageBase from '$lib/components/ParameterPageBase.svelte';
  import { resolveCurrentTheme } from '$lib/constants/theme';
  import { theme } from '$lib/stores/theme';
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

  $: currentTheme = resolveCurrentTheme(browser, $theme, page.data.theme);
</script>

<ParameterPageBase {playerCount} {generateParams} {resetParams} theme={currentTheme}>
  <div slot="settings" class="w-full max-w-lg px-4">
    {#if mode === 'normal' && playerCount > 1}
      <label class="flex cursor-pointer items-center gap-2 py-3">
        <input type="checkbox" class="h-4 w-4 cursor-pointer" bind:checked={uniqueParameters} />
        {m.uniqueParameters()}
      </label>
    {/if}
  </div>
</ParameterPageBase>
