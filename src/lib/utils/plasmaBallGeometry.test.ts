import { describe, expect, it } from 'vitest';
import {
  BALL_RADIUS,
  BOLT_COUNT,
  BURST_PARTICLE_COUNT,
  FILAMENT_COUNT,
  INFLOW_PARTICLE_COUNT,
  SPEED_LINE_COUNT,
  createBolts,
  createBurstParticles,
  createFilaments,
  createInflowParticles,
  createRandom,
  createSpeedLines
} from './plasmaBallGeometry';

const pathPoints = (d: string) =>
  [...d.matchAll(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g)].map(([, x, y]) => Math.hypot(+x, +y));

describe('plasmaBallGeometry', () => {
  // SSR で描いた座標とハイドレーション時の座標が食い違うと、装飾がちらつく
  it.each([
    ['speed lines', createSpeedLines],
    ['inflow particles', createInflowParticles],
    ['burst particles', createBurstParticles],
    ['filaments', createFilaments],
    ['bolts', createBolts]
  ] as const)('generates the same %s on every call', (_, create) => {
    expect(create()).toEqual(create());
  });

  it('changes the layout when the seed changes', () => {
    expect(createFilaments(1)).not.toEqual(createFilaments(2));
    expect(createRandom(1)()).not.toBe(createRandom(2)());
  });

  it('generates the configured number of each decoration', () => {
    expect(createSpeedLines()).toHaveLength(SPEED_LINE_COUNT);
    expect(createInflowParticles()).toHaveLength(INFLOW_PARTICLE_COUNT);
    expect(createBurstParticles()).toHaveLength(BURST_PARTICLE_COUNT);
    expect(createFilaments()).toHaveLength(FILAMENT_COUNT);
    expect(createBolts()).toHaveLength(BOLT_COUNT);
  });

  it('keeps filaments inside the ball and bolts on or outside its edge', () => {
    for (const { d } of createFilaments()) {
      expect(Math.max(...pathPoints(d))).toBeLessThanOrEqual(BALL_RADIUS);
    }
    for (const { d } of createBolts()) {
      expect(Math.min(...pathPoints(d))).toBeGreaterThanOrEqual(BALL_RADIUS);
    }
  });

  it('rounds every coordinate to one decimal place', () => {
    const numbers = [
      ...createFilaments().flatMap(({ d }) => d.match(/-?\d+(?:\.\d+)?/g) ?? []),
      ...createSpeedLines().flatMap(({ x1, y1, x2, y2 }) => [x1, y1, x2, y2].map(String))
    ];

    expect(numbers.length).toBeGreaterThan(0);
    for (const n of numbers) {
      expect(n).toMatch(/^-?\d+(?:\.\d)?$/);
    }
  });
});
