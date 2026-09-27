<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/state';
  import ParameterPageBase from '$lib/components/ParameterPageBase.svelte';
  import { resolveCurrentTheme } from '$lib/constants/theme';
  import { theme } from '$lib/stores/theme';
  import {
    generateRandomParametersFullAttacker,
    resetParametersFullAttacker
  } from '$lib/stores/parametersFullAttacker';

  export let playerCount = 1;

  const generateParams = () =>
    Array.from({ length: playerCount }, () => generateRandomParametersFullAttacker());
  const resetParams = resetParametersFullAttacker;

  $: currentTheme = resolveCurrentTheme(browser, $theme, page.data.theme);
</script>

<ParameterPageBase {playerCount} {generateParams} {resetParams} theme={currentTheme} />
