import { describe, it, expect } from 'vitest';
import { parseParameterString } from './parseParameterString';

describe('parseParameterString', () => {
  it('parses "1234" into correct ParameterObject', () => {
    const result = parseParameterString('1234');
    expect(result).toEqual({
      bulletSpeed: 1,
      bulletScale: 2,
      chargeSpeed: 3,
      shieldStrength: 4
    });
  });

  it('parses "1111" into all-ones ParameterObject', () => {
    const result = parseParameterString('1111');
    expect(result).toEqual({
      bulletSpeed: 1,
      bulletScale: 1,
      chargeSpeed: 1,
      shieldStrength: 1
    });
  });

  it('returns NaN for all fields when input is empty string', () => {
    const result = parseParameterString('');
    expect(result.bulletSpeed).toBeNaN();
    expect(result.bulletScale).toBeNaN();
    expect(result.chargeSpeed).toBeNaN();
    expect(result.shieldStrength).toBeNaN();
  });

  it('returns NaN for all fields when input contains non-numeric characters', () => {
    const result = parseParameterString('abcd');
    expect(result.bulletSpeed).toBeNaN();
    expect(result.bulletScale).toBeNaN();
    expect(result.chargeSpeed).toBeNaN();
    expect(result.shieldStrength).toBeNaN();
  });

  it('returns NaN for missing fields when input is shorter than 4 characters', () => {
    const result = parseParameterString('12');
    expect(result.bulletSpeed).toBe(1);
    expect(result.bulletScale).toBe(2);
    expect(result.chargeSpeed).toBeNaN();
    expect(result.shieldStrength).toBeNaN();
  });
});
