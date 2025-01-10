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
    const interval = setInterval(() => generateRandomParameters(), 100);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    clearInterval(interval);
    let parameters = generateRandomParameters();
    console.info(parameters);
    isBlackout.set(false);
    isDrawing = false;
  }
</script>

<svelte:head>
  <title>HADO Randomizer</title>
</svelte:head>

<div class="relative flex flex-col items-center py-4">
  <Spinner isVisible={$isBlackout} />

  <ParameterList {colors} {parameters} />

  <div class="grid w-full max-w-lg grid-cols-2 gap-4 px-4">
    <button
      class="rounded bg-green-500 px-6 py-3 font-bold text-white hover:bg-green-600"
      on:click={handleRandomize}
      disabled={isDrawing}
    >
      Randomize
    </button>
    <button
      class="rounded bg-red-500 px-6 py-3 font-bold text-white hover:bg-red-600"
      on:click={() =>
        parameters.set({ bulletSpeed: 1, bulletScale: 1, chargeSpeed: 1, shieldStrength: 1 })}
      disabled={isDrawing}
    >
      Reset
    </button>
  </div>
</div>
