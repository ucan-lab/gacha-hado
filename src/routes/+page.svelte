<script>
  import { writable } from 'svelte/store';
  import Parameter from './Parameter.svelte';
  import { validCombinations } from '$lib/validCombinations';

  const parameters = writable({
    bulletSpeed: 1,
    bulletScale: 1,
    chargeSpeed: 1,
    shieldStrength: 1
  });

  function getRandomCombination() {
    if (validCombinations.length === 0) {
      throw new Error('No valid combinations available');
    }
    return validCombinations[Math.floor(Math.random() * validCombinations.length)];
  }

  function generateRandomParameters() {
    const randomCombination = getRandomCombination();
    parameters.set({
      bulletSpeed: parseInt(randomCombination[0], 10),
      bulletScale: parseInt(randomCombination[1], 10),
      chargeSpeed: parseInt(randomCombination[2], 10),
      shieldStrength: parseInt(randomCombination[3], 10)
    });
  }

  function resetParameters() {
    parameters.set({
      bulletSpeed: 1,
      bulletScale: 1,
      chargeSpeed: 1,
      shieldStrength: 1
    });
  }

  const colors = {
    bulletSpeed: '#ED9E38',
    bulletScale: '#74F74B',
    chargeSpeed: '#DD32F6',
    shieldStrength: '#6FEEF9'
  };
</script>

<div class="flex flex-col items-center p-4">
  <div class="mb-4 flex w-full max-w-lg items-start gap-4">
    <Parameter name="SPEED" bind:value={$parameters.bulletSpeed} color={colors.bulletSpeed} />
    <Parameter name="SCALE" bind:value={$parameters.bulletScale} color={colors.bulletScale} />
    <Parameter name="CHARGE" bind:value={$parameters.chargeSpeed} color={colors.chargeSpeed} />
    <Parameter
      name="SHIELD"
      bind:value={$parameters.shieldStrength}
      color={colors.shieldStrength}
    />
  </div>
  <div class="flex w-full max-w-lg gap-4">
    <button
      class="flex-1 rounded bg-green-500 px-6 py-3 font-bold text-white hover:bg-green-600"
      on:click={generateRandomParameters}
      aria-label="Generate random parameter values"
    >
      Randomize
    </button>
    <button
      class="flex-1 rounded bg-red-500 px-6 py-3 font-bold text-white hover:bg-red-600"
      on:click={resetParameters}
      aria-label="Reset parameter values"
    >
      Reset
    </button>
  </div>
</div>
