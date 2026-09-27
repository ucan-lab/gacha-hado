<svelte:options namespace="svg" />

<script lang="ts">
  import { bolts, burstParticles, filaments, inflowParticles } from '$lib/utils/plasmaBallGeometry';

  // 周期は TopNeon に置いた --cycle を継承し、背面のオーラや集中線、ロゴ下のラインと同期させる
  const uid = $props.id();
  const ref = (name: string) => `url(#${uid}-${name})`;

  const flareAngles = [0, 60, 120];
  const shortFlareAngles = [30, 90, 150];
</script>

<g class="plasma-ball">
  <defs>
    <!-- 中心は白、内側は半透明の青、縁は明るく光るプラズマ球 -->
    <radialGradient id="{uid}-body">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="14%" class="stop-core" stop-opacity="0.85" />
      <stop offset="40%" stop-color="#1f5fff" stop-opacity="0.62" />
      <stop offset="80%" stop-color="#1e8cff" stop-opacity="0.6" />
      <stop offset="93%" class="stop-core" stop-opacity="0.95" />
      <stop offset="100%" class="stop-core" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="{uid}-haze">
      <stop offset="70%" class="stop-energy" stop-opacity="0.7" />
      <stop offset="100%" class="stop-energy" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="{uid}-core">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="45%" stop-color="#ffffff" stop-opacity="0.9" />
      <stop offset="100%" class="stop-core" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="{uid}-flash">
      <stop offset="0%" class="stop-core" />
      <stop offset="60%" class="stop-core" stop-opacity="0.35" />
      <stop offset="100%" class="stop-core" stop-opacity="0" />
    </radialGradient>
    <!-- 輪郭を炎のように毛羽立たせる。外側のもやと本体で細かさを変える -->
    <filter id="{uid}-wisp" x="-40%" y="-40%" width="180%" height="180%">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.05"
        numOctaves="3"
        seed="4"
        result="noise"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale="26"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
    <filter id="{uid}-wisp-fine" x="-40%" y="-40%" width="180%" height="180%">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.12"
        numOctaves="2"
        seed="11"
        result="noise"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale="9"
        xChannelSelector="G"
        yChannelSelector="B"
      />
    </filter>
    <!-- 表面の砂粒: 高周波ノイズのアルファを 2 値化し、球の形で切り抜く -->
    <filter id="{uid}-speckle" x="0" y="0" width="100%" height="100%">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.85"
        numOctaves="1"
        seed="2"
        result="noise"
      />
      <feColorMatrix
        in="noise"
        type="matrix"
        values="0 0 0 0 0.92  0 0 0 0 0.99  0 0 0 0 1  10 0 0 0 -5.6"
        result="dots"
      />
      <feComposite in="dots" in2="SourceGraphic" operator="in" />
    </filter>
    <filter id="{uid}-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.1" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="{uid}-soft" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2.4" />
    </filter>
  </defs>

  <circle class="shock" r="50" />
  <circle class="shock shock--late" r="50" />

  {#each inflowParticles as p (p.id)}
    <g transform="rotate({p.angle})">
      <g
        class="inflow"
        style:--dur="{p.dur}s"
        style:--delay="-{p.delay}s"
        style:--from="{p.from}px"
      >
        {#if p.streak}
          <line class="inflow-particle" x2="-9" stroke-width="1.2" />
        {:else}
          <circle class="inflow-particle" r={p.radius} />
        {/if}
      </g>
    </g>
  {/each}

  {#each burstParticles as p (p.id)}
    <g transform="rotate({p.angle})">
      <circle class="burst-particle" r={p.radius} style:--to="{p.to}px" />
    </g>
  {/each}

  <!-- CSS の transform は属性の transform を上書きするため、アニメーションは属性を持たない g に付ける -->
  <g class="charge">
    <!-- 回転させるとノイズも一緒に回り、輪郭が炎のように揺らいで見える -->
    <g class="spin spin--wisp">
      <circle r="58" fill={ref('haze')} filter={ref('wisp')} opacity="0.85" />
    </g>
    <g class="spin spin--wisp-reverse">
      <circle r="50" fill={ref('body')} filter={ref('wisp-fine')} />
    </g>
    <g class="spin spin--speckle">
      <circle r="48" fill="#ffffff" filter={ref('speckle')} opacity="0.3" />
    </g>
    <g class="spin spin--filaments" filter={ref('glow')}>
      {#each filaments as f (f.id)}
        <path class="filament" d={f.d} style:--dur="{f.dur}s" style:--delay="-{f.delay}s" />
      {/each}
    </g>
    <g class="core">
      <circle r="15" fill={ref('core')} filter={ref('soft')} />
      <g class="flare">
        {#each flareAngles as angle (angle)}
          <ellipse rx="22" ry="0.9" transform="rotate({angle})" />
        {/each}
        {#each shortFlareAngles as angle (angle)}
          <ellipse rx="13" ry="0.7" transform="rotate({angle})" />
        {/each}
      </g>
      <circle r="5" fill="#ffffff" />
    </g>
    <circle class="flash" r="46" fill={ref('flash')} />
  </g>

  <g class="spin spin--bolts">
    {#each bolts as b (b.id)}
      <path class="bolt" d={b.d} style:--dur="{b.dur}s" style:--delay="-{b.delay}s" />
    {/each}
  </g>
</g>

<style>
  .stop-core {
    stop-color: var(--energy-core);
  }

  .stop-energy {
    stop-color: var(--energy);
  }

  .shock {
    fill: none;
    stroke: var(--energy-core);
    stroke-width: 2;
    vector-effect: non-scaling-stroke;
    filter: drop-shadow(0 0 6px var(--energy));
    opacity: 0;
    animation: shock var(--cycle) ease-out infinite;
  }

  .shock--late {
    animation-name: shock-late;
  }

  /* 親の回転と子の半径方向の移動を重ね、外から螺旋を描いて吸い込まれる */
  .inflow {
    animation: swirl-in var(--dur) linear var(--delay) infinite;
  }

  .inflow-particle {
    fill: var(--energy-core);
    stroke: var(--energy-core);
    stroke-linecap: round;
    filter: drop-shadow(0 0 2px var(--energy));
    opacity: 0;
    animation: inflow var(--dur) cubic-bezier(0.5, 0, 0.9, 0.6) var(--delay) infinite;
  }

  .burst-particle {
    fill: var(--energy-core);
    filter: drop-shadow(0 0 2px var(--energy));
    opacity: 0;
    animation: burst var(--cycle) cubic-bezier(0.1, 0.7, 0.3, 1) infinite;
  }

  .charge {
    animation: charge var(--cycle) cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .spin {
    animation: spin 7s linear infinite;
  }

  .spin--wisp-reverse {
    animation-duration: 11s;
    animation-direction: reverse;
  }

  .spin--speckle {
    animation-duration: 16s;
  }

  .spin--filaments {
    animation-duration: 12s;
  }

  .spin--bolts {
    animation-duration: 9s;
  }

  .filament {
    fill: none;
    stroke: #ffffff;
    stroke-width: 0.9;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0.25;
    animation: filament var(--dur) ease-in-out var(--delay) infinite;
  }

  .core {
    animation: core 1.3s ease-in-out infinite;
  }

  .flare {
    fill: #ffffff;
    animation: flare 2.1s ease-in-out infinite;
  }

  .flash {
    opacity: 0.05;
    animation: flash var(--cycle) ease-in infinite;
  }

  .bolt {
    fill: none;
    stroke: var(--energy-core);
    stroke-width: 1.7;
    stroke-linejoin: round;
    stroke-linecap: round;
    filter: drop-shadow(0 0 3px var(--energy)) drop-shadow(0 0 6px var(--energy));
    opacity: 0;
    animation: bolt var(--dur) steps(1, end) var(--delay) infinite;
  }

  /* 周期の 80% が放出の瞬間。TopNeonHero のオーラと集中線も同じ位置で光る */
  @keyframes charge {
    0% {
      transform: scale(0.94);
    }
    76% {
      transform: scale(1.04);
    }
    78% {
      transform: scale(1.03) translateX(-0.6px);
    }
    79% {
      transform: scale(1.05) translateX(0.6px);
    }
    82% {
      transform: scale(1.16);
    }
    90% {
      transform: scale(0.97);
    }
    100% {
      transform: scale(0.94);
    }
  }

  @keyframes flash {
    0% {
      opacity: 0.05;
    }
    76% {
      opacity: 0.35;
    }
    81% {
      opacity: 0.7;
    }
    92% {
      opacity: 0;
    }
    100% {
      opacity: 0.05;
    }
  }

  @keyframes shock {
    0%,
    79% {
      transform: scale(1);
      opacity: 0;
    }
    80% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(2.3);
      opacity: 0;
    }
  }

  @keyframes shock-late {
    0%,
    83% {
      transform: scale(1);
      opacity: 0;
    }
    84% {
      transform: scale(1);
      opacity: 0.6;
    }
    100% {
      transform: scale(1.8);
      opacity: 0;
    }
  }

  @keyframes burst {
    0%,
    79% {
      transform: translateX(46px);
      opacity: 0;
    }
    80% {
      transform: translateX(46px);
      opacity: 1;
    }
    100% {
      transform: translateX(var(--to));
      opacity: 0;
    }
  }

  @keyframes swirl-in {
    to {
      rotate: 110deg;
    }
  }

  @keyframes inflow {
    0% {
      transform: translateX(var(--from));
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    100% {
      transform: translateX(46px);
      opacity: 0;
    }
  }

  @keyframes spin {
    to {
      rotate: 360deg;
    }
  }

  @keyframes filament {
    0%,
    100% {
      opacity: 0.15;
    }
    40% {
      opacity: 1;
    }
    46% {
      opacity: 0.5;
    }
    52% {
      opacity: 1;
    }
    70% {
      opacity: 0.3;
    }
  }

  @keyframes core {
    50% {
      transform: scale(1.18);
    }
  }

  @keyframes flare {
    0%,
    100% {
      rotate: 0deg;
      opacity: 0.7;
    }
    50% {
      rotate: 20deg;
      opacity: 1;
    }
  }

  @keyframes bolt {
    0% {
      opacity: 0;
    }
    4% {
      opacity: 1;
    }
    8% {
      opacity: 0.2;
    }
    12% {
      opacity: 1;
    }
    22% {
      opacity: 0.6;
    }
    26%,
    100% {
      opacity: 0;
    }
  }

  /* 動きを減らす設定では、チャージ中の静止画にする */
  @media (prefers-reduced-motion: reduce) {
    .plasma-ball * {
      animation: none;
    }

    .filament,
    .bolt:nth-child(odd) {
      opacity: 0.8;
    }
  }
</style>
