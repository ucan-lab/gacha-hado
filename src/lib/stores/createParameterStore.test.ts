import { describe, it, expect, vi, afterEach } from 'vitest';
import { get } from 'svelte/store';
import { createParameterStore } from './createParameterStore';

afterEach(() => vi.restoreAllMocks());

const patternList = [
  { parameter: '1111', weight: 1 },
  { parameter: '2222', weight: 3 }
];

describe('createParameterStore - weighted random selection', () => {
  it('r=0 selects the first pattern "1111"', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const { generateRandomParameters } = createParameterStore(patternList);
    const result = generateRandomParameters();
    expect(result).toEqual({
      bulletSpeed: 1,
      bulletScale: 1,
      chargeSpeed: 1,
      shieldStrength: 1
    });
  });

  it('r=0.25 (boundary, inclusive) selects "1111"', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.25);
    const { generateRandomParameters } = createParameterStore(patternList);
    const result = generateRandomParameters();
    expect(result).toEqual({
      bulletSpeed: 1,
      bulletScale: 1,
      chargeSpeed: 1,
      shieldStrength: 1
    });
  });

  it('r=0.5 selects the second pattern "2222"', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const { generateRandomParameters } = createParameterStore(patternList);
    const result = generateRandomParameters();
    expect(result).toEqual({
      bulletSpeed: 2,
      bulletScale: 2,
      chargeSpeed: 2,
      shieldStrength: 2
    });
  });

  it.each([0, 0.5, 0.999])('trailing weight-0 element is not selected (r=%s)', (r) => {
    vi.spyOn(Math, 'random').mockReturnValue(r);
    const { generateRandomParameters } = createParameterStore([
      { parameter: '1111', weight: 1 },
      { parameter: '0000', weight: 0 }
    ]);
    const result = generateRandomParameters();
    expect(result).toEqual({
      bulletSpeed: 1,
      bulletScale: 1,
      chargeSpeed: 1,
      shieldStrength: 1
    });
  });

  // 現在の実装挙動（`<= 0` の境界により先頭の weight0 が r=0 で選ばれる）を固定する回帰テスト
  it('leading weight-0 element is selected when r=0 (current implementation behavior)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const { generateRandomParameters } = createParameterStore([
      { parameter: '0000', weight: 0 },
      { parameter: '1111', weight: 1 }
    ]);
    const result = generateRandomParameters();
    expect(result).toEqual({
      bulletSpeed: 0,
      bulletScale: 0,
      chargeSpeed: 0,
      shieldStrength: 0
    });
  });
});

describe('createParameterStore - store update', () => {
  it('updates the parameters store after generateRandomParameters()', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const { parameters, generateRandomParameters } = createParameterStore(patternList);
    const result = generateRandomParameters();
    expect(get(parameters)).toEqual(result);
  });
});

describe('createParameterStore - resetParameters', () => {
  it('resets parameters store to initial value {1,1,1,1}', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const { parameters, generateRandomParameters, resetParameters } =
      createParameterStore(patternList);
    generateRandomParameters();
    resetParameters();
    expect(get(parameters)).toEqual({
      bulletSpeed: 1,
      bulletScale: 1,
      chargeSpeed: 1,
      shieldStrength: 1
    });
  });
});

describe('createParameterStore - error handling', () => {
  it('throws when patternList is empty', () => {
    const { generateRandomParameters } = createParameterStore([], 'empty');
    expect(() => generateRandomParameters()).toThrow('No valid patterns available in store: empty');
  });

  // 現挙動: 合計重み0でも throw せず先頭要素を返す
  it('does not throw when all weights are 0 and returns the first element', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const { generateRandomParameters } = createParameterStore([
      { parameter: '1111', weight: 0 },
      { parameter: '2222', weight: 0 }
    ]);
    expect(() => generateRandomParameters()).not.toThrow();
    const result = generateRandomParameters();
    expect(result).toEqual({
      bulletSpeed: 1,
      bulletScale: 1,
      chargeSpeed: 1,
      shieldStrength: 1
    });
  });
});
