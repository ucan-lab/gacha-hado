<script lang="ts">
  import { IconUser } from '@tabler/icons-svelte';
  import ParameterNeon from './ParameterNeon.svelte';
  import type { Writable } from 'svelte/store';
  import type { ParameterObject } from '$lib/types';
  import { colors } from '$lib/utils/colors';

  export let parameters: Writable<ParameterObject>;
  /** 1 始まりのプレイヤー番号。見出し（P1〜P3）と枠の色に使う */
  export let number: number;

  const PLAYER_COLORS = ['var(--player-1)', 'var(--player-2)', 'var(--player-3)'];

  $: accent = PLAYER_COLORS[(number - 1) % PLAYER_COLORS.length];
</script>

<section class="card" style:--player={accent}>
  <h2 class="heading">
    <span class="avatar"><IconUser size={18} stroke={2} /></span>
    P{number}
  </h2>
  <div class="flex flex-col gap-1.5">
    <ParameterNeon name="SPEED" value={$parameters.bulletSpeed} color={colors.bulletSpeed} />
    <ParameterNeon name="SCALE" value={$parameters.bulletScale} color={colors.bulletScale} />
    <ParameterNeon name="CHARGE" value={$parameters.chargeSpeed} color={colors.chargeSpeed} />
    <ParameterNeon name="SHIELD" value={$parameters.shieldStrength} color={colors.shieldStrength} />
  </div>
</section>

<style>
  .card {
    border: 1px solid color-mix(in srgb, var(--player) 55%, transparent);
    border-radius: 0.75rem;
    padding: 0.625rem 0.875rem 0.75rem;
    background-color: var(--bg-secondary-color);
    box-shadow:
      0 0 14px color-mix(in srgb, var(--player) 30%, transparent),
      inset 0 0 18px color-mix(in srgb, var(--player) 8%, transparent);
    backdrop-filter: blur(10px);
  }

  .heading {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    color: var(--text-primary-color);
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1;
  }

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.875rem;
    height: 1.875rem;
    border: 1.5px solid var(--player);
    border-radius: 9999px;
    color: var(--player);
    box-shadow: 0 0 8px color-mix(in srgb, var(--player) 50%, transparent);
  }
</style>
