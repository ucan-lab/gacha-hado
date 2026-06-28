import { describe, it, expect } from 'vitest';
import { buildDropRateTable, sortDropRateRows } from './dropRate';

describe('buildDropRateTable', () => {
  const input = [
    { parameter: '1111', weight: 1 },
    { parameter: '2222', weight: 3 }
  ];

  it('returns correct number of rows', () => {
    const result = buildDropRateTable(input);
    expect(result).toHaveLength(2);
  });

  it('preserves parameter values', () => {
    const result = buildDropRateTable(input);
    expect(result[0].parameter).toBe('1111');
    expect(result[1].parameter).toBe('2222');
  });

  it('preserves weight values', () => {
    const result = buildDropRateTable(input);
    expect(result[0].weight).toBe(1);
    expect(result[1].weight).toBe(3);
  });

  it('calculates dropRate correctly (totalWeight=4)', () => {
    const result = buildDropRateTable(input);
    expect(result[0].dropRate).toBe(25);
    expect(result[1].dropRate).toBe(75);
  });

  it('dropRate values sum to 100', () => {
    const result = buildDropRateTable(input);
    const total = result.reduce((sum, row) => sum + row.dropRate, 0);
    expect(total).toBe(100);
  });
});

describe('sortDropRateRows', () => {
  const rows = [
    { parameter: 'bbb', weight: 2, dropRate: 50 },
    { parameter: 'aaa', weight: 3, dropRate: 75 },
    { parameter: 'ccc', weight: 1, dropRate: 25 }
  ];

  it('sorts by weight asc', () => {
    const result = sortDropRateRows(rows, 'weight', 'asc');
    expect(result.map((r) => r.weight)).toEqual([1, 2, 3]);
  });

  it('sorts by weight desc', () => {
    const result = sortDropRateRows(rows, 'weight', 'desc');
    expect(result.map((r) => r.weight)).toEqual([3, 2, 1]);
  });

  it('sorts by parameter asc', () => {
    const result = sortDropRateRows(rows, 'parameter', 'asc');
    expect(result.map((r) => r.parameter)).toEqual(['aaa', 'bbb', 'ccc']);
  });

  it('sorts by parameter desc', () => {
    const result = sortDropRateRows(rows, 'parameter', 'desc');
    expect(result.map((r) => r.parameter)).toEqual(['ccc', 'bbb', 'aaa']);
  });

  it('sorts by dropRate asc', () => {
    const result = sortDropRateRows(rows, 'dropRate', 'asc');
    expect(result.map((r) => r.dropRate)).toEqual([25, 50, 75]);
  });

  it('sorts by dropRate desc', () => {
    const result = sortDropRateRows(rows, 'dropRate', 'desc');
    expect(result.map((r) => r.dropRate)).toEqual([75, 50, 25]);
  });

  it('does not mutate the input array (immutable)', () => {
    const original = [...rows];
    sortDropRateRows(rows, 'weight', 'asc');
    expect(rows).toEqual(original);
  });

  describe('stable sort for tied rows', () => {
    const tiedRows = [
      { parameter: 'a', weight: 2, dropRate: 50 },
      { parameter: 'b', weight: 1, dropRate: 25 },
      { parameter: 'c', weight: 2, dropRate: 50 },
      { parameter: 'd', weight: 1, dropRate: 25 },
      { parameter: 'e', weight: 2, dropRate: 50 }
    ];

    it('preserves input order for tied weight rows (asc)', () => {
      const result = sortDropRateRows(tiedRows, 'weight', 'asc');
      expect(result.map((r) => r.parameter)).toEqual(['b', 'd', 'a', 'c', 'e']);
    });

    it('preserves input order for tied weight rows (desc)', () => {
      const result = sortDropRateRows(tiedRows, 'weight', 'desc');
      expect(result.map((r) => r.parameter)).toEqual(['a', 'c', 'e', 'b', 'd']);
    });

    it('preserves input order for tied dropRate rows (asc)', () => {
      const result = sortDropRateRows(tiedRows, 'dropRate', 'asc');
      expect(result.map((r) => r.parameter)).toEqual(['b', 'd', 'a', 'c', 'e']);
    });

    it('preserves input order for tied dropRate rows (desc)', () => {
      const result = sortDropRateRows(tiedRows, 'dropRate', 'desc');
      expect(result.map((r) => r.parameter)).toEqual(['a', 'c', 'e', 'b', 'd']);
    });

    it('keeps non-tied ordering correct alongside ties', () => {
      const result = sortDropRateRows(tiedRows, 'weight', 'asc');
      expect(result.map((r) => r.weight)).toEqual([1, 1, 2, 2, 2]);
    });

    const tiedParameterRows = [
      { parameter: 'same', weight: 3, dropRate: 75 },
      { parameter: 'same', weight: 1, dropRate: 25 },
      { parameter: 'same', weight: 2, dropRate: 50 }
    ];

    it('preserves input order for tied parameter rows (asc)', () => {
      const result = sortDropRateRows(tiedParameterRows, 'parameter', 'asc');
      expect(result.map((r) => r.weight)).toEqual([3, 1, 2]);
    });

    it('preserves input order for tied parameter rows (desc)', () => {
      const result = sortDropRateRows(tiedParameterRows, 'parameter', 'desc');
      expect(result.map((r) => r.weight)).toEqual([3, 1, 2]);
    });
  });
});
