export type SortKey = 'parameter' | 'weight' | 'dropRate';

export interface DropRateRow {
  parameter: string;
  weight: number;
  dropRate: number;
}

export function buildDropRateTable(
  patterns: { parameter: string; weight: number }[]
): DropRateRow[] {
  const totalWeight = patterns.reduce((sum, item) => sum + item.weight, 0);
  return patterns.map((item) => ({
    parameter: item.parameter,
    weight: item.weight,
    dropRate: totalWeight === 0 ? 0 : parseFloat(((item.weight / totalWeight) * 100).toFixed(2))
  }));
}

export function sortDropRateRows(
  rows: DropRateRow[],
  key: SortKey,
  direction: 'asc' | 'desc'
): DropRateRow[] {
  return [...rows].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    const aNaN = typeof av === 'number' && Number.isNaN(av);
    const bNaN = typeof bv === 'number' && Number.isNaN(bv);
    if (aNaN && bNaN) return 0;
    if (aNaN) return 1;
    if (bNaN) return -1;
    if (av === bv) return 0;
    const comparison = av > bv ? 1 : -1;
    return direction === 'asc' ? comparison : -comparison;
  });
}
