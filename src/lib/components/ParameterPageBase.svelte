<script lang="ts">
  import { IconRefresh } from '@tabler/icons-svelte';
  import Player from '$lib/components/Player.svelte';
  import PlayerNeon from '$lib/components/PlayerNeon.svelte';
  import Spinner from '$lib/components/Spinner.svelte';
  import { DEFAULT_THEME, type Theme } from '$lib/constants/theme';
  import { stuckAtBottom } from '$lib/utils/stuckAtBottom';
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';
  import * as m from '$lib/paraglide/messages';
  import type { ParameterObject } from '$lib/types';

  // ---- Props ----
  /**
   * 表示するプレイヤー数
   */
  export let playerCount: number;

  /**
   * パラメータ生成関数を外部から受け取る (trio or fullAttacker)
   * 例: generateRandomParameters もしくは generateRandomParametersFullAttacker
   */
  export let generateParams: () => ParameterObject[];

  /**
   * リセット時に呼ぶ追加処理があれば設定 (例: resetParametersFullAttacker)
   * 指定がなければ呼ばない
   */
  export let resetParams: (() => void) | null = null;

  /**
   * 表示中のテーマ。neon のときだけプレイヤーカードのレイアウトにする
   */
  export let theme: Theme = DEFAULT_THEME;

  let isDrawing = false;
  let isActionBarStuck = false;
  let isBlackout = writable(false);

  // 各プレイヤーのパラメータ管理
  const players: Writable<ParameterObject>[] = Array.from({ length: playerCount }, () =>
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

      {#if theme === 'neon'}
        <div class="flex w-full max-w-lg flex-col gap-3 px-4">
          {#each players as parameters, i (i)}
            <PlayerNeon {parameters} number={i + 1} />
          {/each}
        </div>

        <!-- トリオでも主ボタンが常に画面内に見えるよう、下端に貼り付ける -->
        <div
          class="action-bar sticky -bottom-px flex w-full max-w-lg gap-3 px-4 pt-4 pb-4"
          class:stuck={isActionBarStuck}
          use:stuckAtBottom={(stuck) => (isActionBarStuck = stuck)}
        >
          <button
            aria-label={m.roll()}
            class="roll-neon cursor-pointer bg-cta text-cta-text hover:bg-cta-hover grow rounded-full px-6 py-3 text-lg font-bold tracking-wider"
            on:click={roll}
            disabled={isDrawing}
          >
            {m.roll()}
          </button>
          <button
            aria-label={m.reset()}
            title={m.reset()}
            class="reset-neon glass cursor-pointer bg-secondary bg-secondary-hover flex w-14 shrink-0 items-center justify-center rounded-xl"
            on:click={handleReset}
            disabled={isDrawing}
          >
            <IconRefresh size={26} stroke={2} />
          </button>
        </div>
      {:else}
        <div class="flex flex-col">
          {#each players as parameters, i (i)}
            <Player {parameters} />
          {/each}
        </div>

        <div class="grid w-full max-w-lg grid-cols-2 gap-4 px-4">
          <button
            aria-label={m.roll()}
            class="cursor-pointer bg-cta text-cta-text hover:bg-cta-hover rounded px-6 py-3 font-bold"
            on:click={roll}
            disabled={isDrawing}
          >
            {m.roll()}
          </button>
          <button
            aria-label={m.reset()}
            class="cursor-pointer bg-danger text-danger-text hover:bg-danger-hover rounded px-6 py-3 font-bold"
            on:click={handleReset}
            disabled={isDrawing}
          >
            {m.reset()}
          </button>
        </div>
      {/if}
    </div>
  </main>
</div>

<style>
  /* 貼り付いている間だけ地を敷き、裏に入り込んだカードを隠す。カードの直後に収まるときは地を出さない */
  .action-bar.stuck {
    background-color: var(--action-bar-bg);
    backdrop-filter: blur(6px);
  }

  .roll-neon {
    border: 1px solid var(--cta-hover);
    box-shadow:
      0 0 12px var(--cta),
      0 0 32px var(--glow),
      inset 0 0 12px rgb(255 255 255 / 0.35);
    transition: box-shadow 0.2s ease;
  }

  .roll-neon:hover:enabled {
    box-shadow:
      0 0 18px var(--cta),
      0 0 44px var(--glow),
      inset 0 0 14px rgb(255 255 255 / 0.45);
  }

  .roll-neon:disabled,
  .reset-neon:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  .roll-neon:focus-visible,
  .reset-neon:focus-visible {
    outline: 2px solid var(--cta);
    outline-offset: 2px;
  }

  .reset-neon {
    color: var(--cta);
  }
</style>
