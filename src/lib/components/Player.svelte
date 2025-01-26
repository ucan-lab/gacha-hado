<script lang="ts">
  import Parameter from './Parameter.svelte';
  export let parameters;

  const colors = {
    bulletSpeed: '#ED9E38',
    bulletScale: '#74F74B',
    chargeSpeed: '#DD32F6',
    shieldStrength: '#6FEEF9'
  };
</script>

<div class="mb-2 flex w-full max-w-lg flex-wrap justify-center gap-2 sm:gap-4">
  <Parameter name="SPEED" bind:value={$parameters.bulletSpeed} color={colors.bulletSpeed} />
  <Parameter name="SCALE" bind:value={$parameters.bulletScale} color={colors.bulletScale} />
  <Parameter name="CHARGE" bind:value={$parameters.chargeSpeed} color={colors.chargeSpeed} />
  <Parameter name="SHIELD" bind:value={$parameters.shieldStrength} color={colors.shieldStrength} />
</div>
