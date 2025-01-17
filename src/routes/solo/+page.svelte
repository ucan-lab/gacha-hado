<script>
  import { generateRandomParameters } from '../stores/parameters';
  import ParameterList from '../components/ParameterList.svelte';
  import Spinner from '../components/Spinner.svelte';
  import Header from '../components/Header.svelte';
  import Footer from '../components/Footer.svelte';
  import { writable } from 'svelte/store';

  const colors = {
    bulletSpeed: '#ED9E38',
    bulletScale: '#74F74B',
    chargeSpeed: '#DD32F6',
    shieldStrength: '#6FEEF9'
  };

  let isDrawing = false;
  let isBlackout = writable(false);
  let parameters = writable({
    bulletSpeed: 1,
    bulletScale: 1,
    chargeSpeed: 1,
    shieldStrength: 1
  });

  async function handleRandomize() {
    isDrawing = true;
    isBlackout.set(true);
    const interval = setInterval(() => {
      parameters.set(generateRandomParameters());
    }, 100);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    clearInterval(interval);
    parameters.set(generateRandomParameters());
    console.info(
      [
        $parameters.bulletSpeed,
        $parameters.bulletScale,
        $parameters.chargeSpeed,
        $parameters.shieldStrength
      ].join('')
    );
    isBlackout.set(false);
    isDrawing = false;
  }
</script>

<svelte:head>
  <title>HADO Randomizer</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
  <Header title="HADO Randomizer" />

  <main class="flex-grow">
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
  </main>
</div>

<Footer />
