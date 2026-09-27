<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/state';
  import ParameterPageBase from '$lib/components/ParameterPageBase.svelte';
  import { resolveCurrentTheme } from '$lib/constants/theme';
  import { theme } from '$lib/stores/theme';
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

  $: currentTheme = resolveCurrentTheme(browser, $theme, page.data.theme);
</script>

<ParameterPageBase {playerCount} {generateParams} {resetParams} theme={currentTheme} />
