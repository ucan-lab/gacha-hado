<script>
  import { parameters, generateRandomParameters } from './stores/parameters';
  import ParameterList from './components/ParameterList.svelte';
  import Spinner from './components/Spinner.svelte';
  import { writable } from 'svelte/store';

  const colors = {
    bulletSpeed: '#ED9E38',
    bulletScale: '#74F74B',
    chargeSpeed: '#DD32F6',
    shieldStrength: '#6FEEF9'
  };

  let isDrawing = false;
  let isBlackout = writable(false);

  async function handleRandomize() {
    isDrawing = true;
    isBlackout.set(true);
    const interval = setInterval(() => {
      parameters.set({
        bulletSpeed: Math.floor(Math.random() * 5) + 1,
        bulletScale: Math.floor(Math.random() * 5) + 1,
        chargeSpeed: Math.floor(Math.random() * 5) + 1,
        shieldStrength: Math.floor(Math.random() * 5) + 1
      });
    }, 85);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    clearInterval(interval);
    generateRandomParameters();
    isBlackout.set(false);
    isDrawing = false;
  }
</script>

<svelte:head>
  <title>HADO Randomizer</title>
</svelte:head>

<div class="relative flex flex-col items-center p-4">
  <Spinner isVisible={$isBlackout} />

  <ParameterList {colors} {parameters} />

  <div class="mt-4 flex w-full max-w-lg gap-4">
    <button
      class="flex-1 rounded bg-green-500 px-6 py-3 font-bold text-white hover:bg-green-600"
      on:click={handleRandomize}
      disabled={isDrawing}
    >
      Randomize
    </button>
    <button
      class="flex-1 rounded bg-red-500 px-6 py-3 font-bold text-white hover:bg-red-600"
      on:click={() =>
        parameters.set({ bulletSpeed: 1, bulletScale: 1, chargeSpeed: 1, shieldStrength: 1 })}
      disabled={isDrawing}
    >
      Reset
    </button>
  </div>
</div>
