<script lang="ts">
  import Player from '$lib/components/Player.svelte';
  import Spinner from '$lib/components/Spinner.svelte';
  import { writable } from 'svelte/store';
  import * as m from '$lib/paraglide/messages';

  // ---- Props ----
  /**
   * 表示するプレイヤー数
   */
  export let playerCount: number;

  /**
   * パラメータ生成関数を外部から受け取る (trio or fullAttacker)
   * 例: generateRandomParameters もしくは generateRandomParametersFullAttacker
   */
  export let generateParams: () => {
    bulletSpeed: number;
    bulletScale: number;
    chargeSpeed: number;
    shieldStrength: number;
  }[];

  interface ParameterObject {
    bulletSpeed: number;
    bulletScale: number;
    chargeSpeed: number;
    shieldStrength: number;
  }

  /**
   * リセット時に呼ぶ追加処理があれば設定 (例: resetParametersFullAttacker)
   * 指定がなければ呼ばない
   */
  export let resetParams: (() => void) | null = null;

  let isDrawing = false;
  let isBlackout = writable(false);

  // 各プレイヤーのパラメータ管理
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
      const generated = generateParams();
      generated.forEach((param: ParameterObject, index: number) => {
        players[index].set(param);
      });
    }, 100);

    await new Promise((resolve) => setTimeout(resolve, 1200));
    clearInterval(interval);

    const finalParams = generateParams();
    finalParams.forEach((param: ParameterObject, index: number) => {
      players[index].set(param);
    });

    finalParams.forEach((values: ParameterObject, index: number) => {
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

    // もし追加のグローバルリセット関数が指定されていれば呼ぶ
    if (resetParams) {
      resetParams();
    }
  }
</script>

<div class="flex min-h-screen flex-col">
  <main class="flex-grow">
    <div class="relative flex flex-col items-center py-2">
      <Spinner isVisible={$isBlackout} />

      <div class="flex flex-col">
        {#each players as parameters}
          <Player {parameters} />
        {/each}
      </div>

      <div class="grid w-full max-w-lg grid-cols-2 gap-4 px-4">
        <button
          aria-label={m.roll()}
          class="cursor-pointer rounded bg-green-500 px-6 py-3 font-bold text-white hover:bg-green-600"
          on:click={roll}
          disabled={isDrawing}
        >
          {m.roll()}
        </button>
        <button
          aria-label={m.reset()}
          class="cursor-pointer rounded bg-red-500 px-6 py-3 font-bold text-white hover:bg-red-600"
          on:click={handleReset}
          disabled={isDrawing}
        >
          {m.reset()}
        </button>
      </div>
    </div>
  </main>
</div>
