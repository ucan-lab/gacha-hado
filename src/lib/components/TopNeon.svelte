<script lang="ts">
  import { IconUser, IconUsers, IconUsersGroup, IconFlame, IconSwords } from '@tabler/icons-svelte';
  import * as m from '$lib/paraglide/messages';
  import { withoutBetaMark } from '$lib/utils/modeLabel';

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

  const sparks = [
    { cx: 38, cy: 48, r: 1.6, delay: 0 },
    { cx: 206, cy: 38, r: 2, delay: 0.6 },
    { cx: 214, cy: 118, r: 1.4, delay: 1.2 },
    { cx: 26, cy: 128, r: 1.8, delay: 1.8 },
    { cx: 70, cy: 18, r: 1.2, delay: 0.9 },
    { cx: 176, cy: 160, r: 1.4, delay: 1.5 }
  ];
</script>

<div class="mx-auto flex w-full max-w-md flex-col items-center px-4 pt-5 pb-8">
  <h1 class="logo">{m.appName()}</h1>

  <svg class="hero" viewBox="0 0 240 190" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id="neon-top-ball" cx="42%" cy="38%" r="62%">
        <stop offset="0%" class="stop-core" />
        <stop offset="35%" class="stop-energy" />
        <stop offset="80%" class="stop-deep" stop-opacity="0.85" />
        <stop offset="100%" class="stop-deep" stop-opacity="0.2" />
      </radialGradient>
      <radialGradient id="neon-top-aura" cx="50%" cy="50%" r="50%">
        <stop offset="55%" class="stop-energy" stop-opacity="0.35" />
        <stop offset="100%" class="stop-energy" stop-opacity="0" />
      </radialGradient>
    </defs>

    <g class="platform">
      <ellipse cx="120" cy="172" rx="92" ry="11" />
      <ellipse cx="120" cy="172" rx="64" ry="7" />
      <ellipse cx="120" cy="172" rx="36" ry="4" />
    </g>

    <circle cx="120" cy="92" r="84" fill="url(#neon-top-aura)" />

    <g class="ball">
      <circle cx="120" cy="92" r="58" fill="url(#neon-top-ball)" />
      <path
        class="veins"
        d="M88 62 L108 78 L100 104 L122 118 L150 104 M108 78 L136 70 L150 104 L146 128 M136 70 L146 50 M100 104 L80 112 M122 118 L118 146"
      />
    </g>

    <ellipse class="orbit" cx="120" cy="92" rx="100" ry="24" transform="rotate(-16 120 92)" />

    {#each sparks as spark (spark.cx)}
      <circle
        class="spark"
        cx={spark.cx}
        cy={spark.cy}
        r={spark.r}
        style:animation-delay="{spark.delay}s"
      />
    {/each}
  </svg>

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
  .logo {
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

  .hero {
    width: 100%;
    max-width: 16rem;
    height: auto;
    margin: 0.25rem 0 1rem;
    overflow: visible;
  }

  .stop-core {
    stop-color: var(--energy-core);
  }

  .stop-energy {
    stop-color: var(--energy);
  }

  .stop-deep {
    stop-color: var(--energy-deep);
  }

  .platform ellipse {
    fill: none;
    stroke: var(--energy);
    stroke-opacity: 0.5;
    stroke-width: 1.5;
  }

  .ball {
    transform-box: fill-box;
    transform-origin: center;
    filter: drop-shadow(0 0 10px var(--energy)) drop-shadow(0 0 24px var(--glow));
    animation: pulse 2.8s ease-in-out infinite;
  }

  .veins {
    fill: none;
    stroke: var(--energy-core);
    stroke-opacity: 0.55;
    stroke-width: 1.2;
    stroke-linejoin: round;
  }

  .orbit {
    fill: none;
    stroke: var(--energy);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-dasharray: 140 60 40 60;
    filter: drop-shadow(0 0 4px var(--energy));
    animation: orbit 6s linear infinite;
  }

  .spark {
    fill: var(--energy-core);
    filter: drop-shadow(0 0 3px var(--energy));
    animation: twinkle 2.4s ease-in-out infinite;
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

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.04);
    }
  }

  @keyframes orbit {
    to {
      stroke-dashoffset: -300;
    }
  }

  @keyframes twinkle {
    0%,
    100% {
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ball,
    .orbit,
    .spark {
      animation: none;
    }
  }
</style>
