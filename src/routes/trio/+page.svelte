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

  let parameters1 = writable({
    bulletSpeed: 1,
    bulletScale: 1,
    chargeSpeed: 1,
    shieldStrength: 1
  });
  let parameters2 = writable({
    bulletSpeed: 1,
    bulletScale: 1,
    chargeSpeed: 1,
    shieldStrength: 1
  });
  let parameters3 = writable({
    bulletSpeed: 1,
    bulletScale: 1,
    chargeSpeed: 1,
    shieldStrength: 1
  });

  async function handleRandomize() {
    isDrawing = true;
    isBlackout.set(true);

    const interval = setInterval(() => {
      parameters1.set(generateRandomParameters());
      parameters2.set(generateRandomParameters());
      parameters3.set(generateRandomParameters());
    }, 100);

    await new Promise((resolve) => setTimeout(resolve, 1200));
    clearInterval(interval);

    parameters1.set(generateRandomParameters());
    parameters2.set(generateRandomParameters());
    parameters3.set(generateRandomParameters());

    console.info(
      [
        'player1: ',
        $parameters1.bulletSpeed,
        $parameters1.bulletScale,
        $parameters1.chargeSpeed,
        $parameters1.shieldStrength
      ].join('')
    );
    console.info(
      [
        'player2: ',
        $parameters2.bulletSpeed,
        $parameters2.bulletScale,
        $parameters2.chargeSpeed,
        $parameters2.shieldStrength
      ].join('')
    );
    console.info(
      [
        'player3: ',
        $parameters3.bulletSpeed,
        $parameters3.bulletScale,
        $parameters3.chargeSpeed,
        $parameters3.shieldStrength
      ].join('')
    );

    isBlackout.set(false);
    isDrawing = false;
  }

  function handleReset() {
    parameters1.set({ bulletSpeed: 1, bulletScale: 1, chargeSpeed: 1, shieldStrength: 1 });
    parameters2.set({ bulletSpeed: 1, bulletScale: 1, chargeSpeed: 1, shieldStrength: 1 });
    parameters3.set({ bulletSpeed: 1, bulletScale: 1, chargeSpeed: 1, shieldStrength: 1 });
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

      <div class="flex flex-col">
        <ParameterList {colors} parameters={parameters1} />
        <ParameterList {colors} parameters={parameters2} />
        <ParameterList {colors} parameters={parameters3} />
      </div>

      <div class="mt-4 grid w-full max-w-lg grid-cols-2 gap-4 px-4">
        <button
          class="rounded bg-green-500 px-6 py-3 font-bold text-white hover:bg-green-600"
          on:click={handleRandomize}
          disabled={isDrawing}
        >
          Randomize
        </button>
        <button
          class="rounded bg-red-500 px-6 py-3 font-bold text-white hover:bg-red-600"
          on:click={handleReset}
          disabled={isDrawing}
        >
          Reset
        </button>
      </div>
    </div>
  </main>
</div>

<Footer />
