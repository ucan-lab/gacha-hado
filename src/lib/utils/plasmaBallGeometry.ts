/**
 * トップのエナジーボール（PlasmaBall / TopNeonHero）の装飾の座標。
 * 座標は球の中心を原点、球の半径を 50 とするローカル座標系。
 *
 * SSR とハイドレーションで同じ値にするため、Math.random ではなくシード付き乱数で
 * モジュール読み込み時に 1 度だけ生成する。種類ごとにシードを分けているので、
 * ある種類の本数を変えても他の種類の配置は変わらない。
 */

export const BALL_RADIUS = 50;
export const SPEED_LINE_COUNT = 28;
export const INFLOW_PARTICLE_COUNT = 26;
export const BURST_PARTICLE_COUNT = 30;
export const FILAMENT_COUNT = 14;
export const BOLT_COUNT = 10;

export type SpeedLine = {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
};
export type InflowParticle = {
  id: number;
  angle: number;
  dur: number;
  delay: number;
  from: number;
  radius: number;
  streak: boolean;
};
export type BurstParticle = { id: number; angle: number; radius: number; to: number };
export type Strand = { id: number; d: string; dur: number; delay: number };

// mulberry32。整数演算だけで次の値を決めるので、Node とブラウザで同じ列になる
export const createRandom = (seed: number) => {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// Math.cos/sin は処理系で末尾の桁が揺れうるため、小数 1 桁に丸めて SSR とクライアントの差を消す
const round = (n: number) => Math.round(n * 10) / 10;
const point = (angle: number, r: number, squashY = 1) =>
  `${round(Math.cos(angle) * r)} ${round(Math.sin(angle) * r * squashY)}`;

export const createSpeedLines = (seed = 11): SpeedLine[] => {
  const rand = createRandom(seed);
  return Array.from({ length: SPEED_LINE_COUNT }, (_, id) => {
    const angle = (id / SPEED_LINE_COUNT) * Math.PI * 2 + rand() * 0.1;
    const outer = 112 + rand() * 12;
    const inner = 60;
    return {
      id,
      x1: round(Math.cos(angle) * outer),
      y1: round(Math.sin(angle) * outer * 0.9),
      x2: round(Math.cos(angle) * inner),
      y2: round(Math.sin(angle) * inner * 0.9),
      delay: round(rand() * 1.1)
    };
  });
};

export const createInflowParticles = (seed = 23): InflowParticle[] => {
  const rand = createRandom(seed);
  return Array.from({ length: INFLOW_PARTICLE_COUNT }, (_, id) => ({
    id,
    angle: round(rand() * 360),
    dur: round(1.4 + rand() * 1.2),
    delay: round(rand() * 2.6),
    from: round(96 + rand() * 30),
    radius: round(0.8 + rand() * 1.3),
    streak: id % 3 === 0
  }));
};

export const createBurstParticles = (seed = 37): BurstParticle[] => {
  const rand = createRandom(seed);
  return Array.from({ length: BURST_PARTICLE_COUNT }, (_, id) => ({
    id,
    angle: round(rand() * 360),
    radius: round(0.6 + rand() * 1.2),
    to: round(90 + rand() * 50)
  }));
};

/** 中心から縁へ伸び、縁の手前で二股に分かれるプラズマの稲妻 */
export const createFilaments = (seed = 41): Strand[] => {
  const rand = createRandom(seed);
  const steps = 8;
  const reach = BALL_RADIUS - 7;
  return Array.from({ length: FILAMENT_COUNT }, (_, id) => {
    let angle = rand() * Math.PI * 2;
    const points: string[] = [];
    for (let k = 0; k <= steps; k++) {
      angle += (rand() - 0.5) * 0.45;
      points.push(point(angle, 3 + (reach * k) / steps));
    }
    const forkAngle = angle + (rand() < 0.5 ? 0.25 : -0.25);
    const fork = ` M${points[steps - 2]} L${point(forkAngle, 40)} L${point(forkAngle + 0.05, 47)}`;
    return {
      id,
      d: `M${points.join(' L')}${fork}`,
      dur: round(0.7 + rand() * 1.2),
      delay: round(rand() * 1.5)
    };
  });
};

/** 球の外周に沿って走る稲妻。途中から外へ枝が伸びる */
export const createBolts = (seed = 53): Strand[] => {
  const rand = createRandom(seed);
  const steps = 7;
  return Array.from({ length: BOLT_COUNT }, (_, id) => {
    const start = rand() * Math.PI * 2;
    const span = 0.5 + rand() * 0.7;
    const points: string[] = [];
    for (let k = 0; k <= steps; k++) {
      const angle = start + (span * k) / steps;
      const edge = k === 0 || k === steps;
      points.push(point(angle, BALL_RADIUS + 1 + (edge ? 0 : 2 + rand() * 9)));
    }
    const branchAngle = start + span * 0.5;
    const branchR = 58 + rand() * 6;
    const branch = ` M${point(branchAngle, branchR)} L${point(branchAngle + 0.08, branchR + 7)} L${point(branchAngle + 0.02, branchR + 13)}`;
    return {
      id,
      d: `M${points.join(' L')}${branch}`,
      dur: round(0.9 + rand() * 1.1),
      delay: round(rand() * 2)
    };
  });
};

export const speedLines = createSpeedLines();
export const inflowParticles = createInflowParticles();
export const burstParticles = createBurstParticles();
export const filaments = createFilaments();
export const bolts = createBolts();
