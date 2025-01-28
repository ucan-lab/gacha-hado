<script lang="ts">
  import { generateRandomParameters } from '$lib/stores/parameters';
  import Player from '$lib/components/Player.svelte';
  import Spinner from '$lib/components/Spinner.svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { writable, get } from 'svelte/store';
  import * as m from '$lib/paraglide/messages';

  export let playerCount = 1;

  let isDrawing = false;
  let isBlackout = writable(false);

  const players = Array.from({ length: playerCount }, () =>
    writable({
      bulletSpeed: 1,
      bulletScale: 1,
      chargeSpeed: 1,
      shieldStrength: 1
    })
  );

  async function roll() {
    isDrawing = true;
    isBlackout.set(true);

    const interval = setInterval(() => {
      players.forEach((player) => player.set(generateRandomParameters()));
    }, 100);

    await new Promise((resolve) => setTimeout(resolve, 1200));
    clearInterval(interval);

    players.forEach((player) => player.set(generateRandomParameters()));

    players.forEach((player, index) => {
      const values = get(player);
      console.info(
        [
          `player${index + 1}: `,
          values.bulletSpeed,
          values.bulletScale,
          values.chargeSpeed,
          values.shieldStrength
        ].join('')
      );
    });

    isBlackout.set(false);
    isDrawing = false;
  }

  function handleReset() {
    players.forEach((player) =>
      player.set({ bulletSpeed: 1, bulletScale: 1, chargeSpeed: 1, shieldStrength: 1 })
    );
  }
</script>

<div class="flex min-h-screen flex-col">
  <Header />

  <main class="flex-grow">
    <div class="relative flex flex-col items-center py-2">
      <Spinner isVisible={$isBlackout} />

      <div class="flex flex-col">
        {#each players as parameters, index}
          <Player {parameters} />
        {/each}
      </div>

      <div class="grid w-full max-w-lg grid-cols-2 gap-4 px-4">
        <button
          aria-label={m.roll()}
          class="cursor-pointer rounded bg-green-700 px-6 py-3 font-bold text-white hover:bg-green-800"
          on:click={roll}
          disabled={isDrawing}
        >
          {m.roll()}
        </button>
        <button
          aria-label={m.reset()}
          class="cursor-pointer rounded bg-red-700 px-6 py-3 font-bold text-white hover:bg-red-800"
          on:click={handleReset}
          disabled={isDrawing}
        >
          {m.reset()}
        </button>
      </div>
    </div>
  </main>
</div>

<Footer />
