<script lang="ts">
  import Parameter from './Parameter.svelte';
  import type { Writable } from 'svelte/store';
  import type { ParameterObject } from '$lib/types';
  import { colors } from '$lib/utils/colors';

  export let parameters: Writable<ParameterObject>;
</script>

<div class="mb-2 flex w-full max-w-lg flex-wrap justify-center gap-2 sm:gap-4">
  <Parameter name="SPEED" bind:value={$parameters.bulletSpeed} color={colors.bulletSpeed} />
  <Parameter name="SCALE" bind:value={$parameters.bulletScale} color={colors.bulletScale} />
  <Parameter name="CHARGE" bind:value={$parameters.chargeSpeed} color={colors.chargeSpeed} />
  <Parameter name="SHIELD" bind:value={$parameters.shieldStrength} color={colors.shieldStrength} />
</div>
