<script lang="ts">
  import girl from '$lib/assets/neon-hero-girl.webp';
  import { speedLines } from '$lib/utils/plasmaBallGeometry';
  import PlasmaBall from './PlasmaBall.svelte';

  // 座標はキャラクター画像（1086x1448）のピクセル。画像ファイル自体は 720px 幅に縮小してある
  const IMAGE_WIDTH = 1086;
  const IMAGE_HEIGHT = 1448;
  // 球を手のひらの上に置く位置。キャラクターの背面（集中線・オーラ）と前面（球）で共有する
  const BALL_TRANSFORM = 'translate(140 320) scale(3.4)';
  const PAD_TRANSFORM = 'translate(560 1392) scale(4.6)';

  const uid = $props.id();
</script>

<svelte:head>
  <!-- SVG の <image> はプリロードスキャナに拾われないので、LCP になる画像を先に取りにいく -->
  <link rel="preload" as="image" type="image/webp" href={girl} />
</svelte:head>

<svg class="hero" viewBox="-60 -20 1206 1500" aria-hidden="true" focusable="false">
  <defs>
    <radialGradient id="{uid}-aura">
      <stop offset="45%" class="stop-energy" stop-opacity="0.4" />
      <stop offset="100%" class="stop-energy" stop-opacity="0" />
    </radialGradient>
  </defs>

  <g transform={PAD_TRANSFORM}>
    <ellipse class="pad-ticks" rx="104" ry="17" />
    <ellipse class="pad-base" rx="76" ry="11" />
    <ellipse class="pad-spin" rx="58" ry="8.5" />
    <ellipse class="pad-core" rx="30" ry="4.5" />
  </g>

  <g transform={BALL_TRANSFORM}>
    <g class="speed">
      {#each speedLines as line (line.id)}
        <line
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          style:animation-delay="-{line.delay}s"
        />
      {/each}
    </g>
    <circle class="aura" r="92" fill="url(#{uid}-aura)" />
  </g>

  <g class="girl">
    <image href={girl} width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />
  </g>

  <g transform={BALL_TRANSFORM}>
    <PlasmaBall />
  </g>
</svg>

<style>
  /* 集中線と粒子は SVG の外（左と上）へ描く。左へのはみ出しは横スクロールにならない */
  .hero {
    width: 100%;
    max-width: 20rem;
    height: auto;
    margin: 0.25rem 0 1rem;
    overflow: visible;
  }

  .stop-energy {
    stop-color: var(--energy);
  }

  .pad-ticks {
    fill: none;
    stroke: var(--energy);
    stroke-opacity: 0.45;
    stroke-width: 3;
    stroke-dasharray: 0.8 5;
  }

  .pad-base {
    fill: none;
    stroke: var(--energy);
    stroke-opacity: 0.55;
    stroke-width: 1.4;
  }

  .pad-spin {
    fill: none;
    stroke: var(--energy);
    stroke-width: 1.6;
    stroke-linecap: round;
    stroke-dasharray: 34 10 6 10;
    filter: drop-shadow(0 0 3px var(--energy));
    animation: pad-spin 4s linear infinite;
  }

  .pad-core {
    fill: rgb(34 229 255 / 0.18);
    stroke: var(--energy-core);
    stroke-width: 1.2;
    filter: drop-shadow(0 0 5px var(--energy));
  }

  /* 放出（周期の 80%）に合わせて集中線とオーラが最も明るくなる */
  .speed {
    animation: speed-glow var(--cycle) ease-in infinite;
  }

  .speed line {
    stroke: var(--energy);
    stroke-width: 0.8;
    stroke-linecap: round;
    stroke-dasharray: 10 30;
    animation: speed-flow 1.1s linear infinite;
  }

  .aura {
    opacity: 0.5;
    animation: aura var(--cycle) ease-in infinite;
  }

  /* 足元を支点に小さく呼吸させる */
  .girl {
    transform-origin: 560px 1420px;
    animation: breathe 2.4s ease-in-out infinite;
  }

  @keyframes pad-spin {
    to {
      stroke-dashoffset: -120;
    }
  }

  @keyframes speed-flow {
    to {
      stroke-dashoffset: -40;
    }
  }

  @keyframes speed-glow {
    0% {
      opacity: 0.15;
    }
    78% {
      opacity: 0.55;
    }
    82% {
      opacity: 1;
    }
    100% {
      opacity: 0.15;
    }
  }

  @keyframes aura {
    0% {
      opacity: 0.5;
    }
    78% {
      opacity: 0.9;
    }
    82% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }

  @keyframes breathe {
    50% {
      transform: scale(1.006, 1.014);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pad-spin,
    .speed,
    .speed line,
    .aura,
    .girl {
      animation: none;
    }

    .speed {
      opacity: 0.35;
    }
  }
</style>
