<script lang="ts">
  import { IconUser, IconUsers, IconUsersGroup, IconFlame, IconSwords } from '@tabler/icons-svelte';
  import * as m from '$lib/paraglide/messages';
  import { withoutBetaMark } from '$lib/utils/modeLabel';
  import TopNeonHero from './TopNeonHero.svelte';

  const playerModes = [
    { href: '/solo', label: m.solo, icon: IconUser, color: 'var(--mode-solo)' },
    { href: '/duo', label: m.duo, icon: IconUsers, color: 'var(--mode-duo)' },
    { href: '/trio', label: m.trio, icon: IconUsersGroup, color: 'var(--mode-trio)' }
  ];

  const betaModes = [
    {
      href: '/full-attacker',
      label: m.fullAttacker,
      icon: IconFlame,
      color: 'var(--mode-full-attacker)'
    },
    { href: '/gachi', label: m.gachiMatch, icon: IconSwords, color: 'var(--mode-gachi)' }
  ];
</script>

<div class="top-neon mx-auto flex w-full max-w-md flex-col items-center px-4 pt-5 pb-8">
  <h1 class="logo">{m.appName()}</h1>

  <TopNeonHero />

  <div class="flex w-full flex-col gap-3">
    {#each playerModes as mode (mode.href)}
      <a
        href={mode.href}
        aria-label={mode.label()}
        class="mode-card mode-card--large"
        style:--mode={mode.color}
      >
        <span class="mode-icon"><mode.icon size={40} stroke={1.75} /></span>
        <span class="mode-label">{mode.label()}</span>
      </a>
    {/each}

    <div class="grid grid-cols-2 gap-3">
      {#each betaModes as mode (mode.href)}
        <a
          href={mode.href}
          aria-label={mode.label()}
          class="mode-card mode-card--small"
          style:--mode={mode.color}
        >
          <span class="mode-icon"><mode.icon size={30} stroke={1.75} /></span>
          <span class="mode-label">{withoutBetaMark(mode.label())}</span>
          <span class="beta">β</span>
        </a>
      {/each}
    </div>
  </div>

  <p class="text-muted mt-6 text-center text-sm">{m.attention()}</p>
</div>

<style>
  /* ヒーローの演出の周期。ロゴ下のラインとエナジーボールの放出をこれで同期させる */
  .top-neon {
    --cycle: 3.2s;
  }

  .logo {
    position: relative;
    padding-bottom: 0.625rem;
    font-size: 2.5rem;
    font-weight: 700;
    font-style: italic;
    letter-spacing: 0.02em;
    line-height: 1.2;
    text-align: center;
    color: var(--text-primary-color);
    text-shadow:
      0 0 4px var(--energy),
      0 0 14px var(--energy),
      0 0 32px var(--glow);
  }

  .logo::after {
    content: '';
    position: absolute;
    right: -8%;
    bottom: 0;
    left: -8%;
    height: 2px;
    background:
      linear-gradient(90deg, transparent, var(--energy-core), transparent) -30% 0 / 20% 100%
        no-repeat,
      linear-gradient(var(--energy), var(--energy)) left / 18% 100% no-repeat,
      linear-gradient(var(--energy), var(--energy)) right / 18% 100% no-repeat,
      linear-gradient(90deg, transparent, rgb(34 229 255 / 0.5), transparent) center / 56% 50%
        no-repeat;
    filter: drop-shadow(0 0 4px var(--energy));
    animation: hud-sweep var(--cycle) ease-in-out infinite;
  }

  .mode-card {
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid color-mix(in srgb, var(--mode) 70%, transparent);
    border-radius: 0.75rem;
    background: linear-gradient(
      100deg,
      color-mix(in srgb, var(--mode) 30%, transparent),
      color-mix(in srgb, var(--mode) 8%, transparent)
    );
    box-shadow:
      0 0 14px color-mix(in srgb, var(--mode) 35%, transparent),
      inset 0 0 18px color-mix(in srgb, var(--mode) 15%, transparent);
    backdrop-filter: blur(10px);
    color: var(--text-primary-color);
    font-weight: 700;
    transition:
      box-shadow 0.2s ease,
      border-color 0.2s ease;
  }

  .mode-card:hover,
  .mode-card:focus-visible {
    border-color: var(--mode);
    box-shadow:
      0 0 24px color-mix(in srgb, var(--mode) 60%, transparent),
      inset 0 0 24px color-mix(in srgb, var(--mode) 25%, transparent);
  }

  .mode-card:focus-visible {
    outline: 2px solid var(--mode);
    outline-offset: 2px;
  }

  .mode-icon {
    display: flex;
    color: var(--mode);
    filter: drop-shadow(0 0 6px var(--mode));
  }

  .mode-card--large {
    gap: 1.25rem;
    min-height: 4.5rem;
    padding: 0.75rem 1.5rem;
  }

  .mode-card--large .mode-label {
    font-size: 1.5rem;
    letter-spacing: 0.08em;
  }

  .mode-card--small {
    flex-direction: column;
    justify-content: center;
    gap: 0.25rem;
    min-height: 7rem;
    padding: 0.75rem 0.5rem;
    text-align: center;
  }

  .mode-card--small .mode-label {
    font-size: 0.875rem;
    line-height: 1.3;
    overflow-wrap: anywhere;
  }

  .beta {
    padding: 0 0.5rem;
    border: 1px solid var(--mode);
    border-radius: 0.25rem;
    color: var(--mode);
    font-size: 0.75rem;
    line-height: 1.4;
  }

  /* 放出の瞬間（周期の 60〜80%）にロゴ下の HUD ラインを光が走る */
  @keyframes hud-sweep {
    0%,
    60% {
      background-position:
        -30% 0,
        left,
        right,
        center;
    }
    80%,
    100% {
      background-position:
        130% 0,
        left,
        right,
        center;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .logo::after {
      animation: none;
    }
  }
</style>
