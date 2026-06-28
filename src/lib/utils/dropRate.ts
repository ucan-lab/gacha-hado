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
    dropRate: parseFloat(((item.weight / totalWeight) * 100).toFixed(2))
  }));
}

export function sortDropRateRows(
  rows: DropRateRow[],
  key: SortKey,
  direction: 'asc' | 'desc'
): DropRateRow[] {
  return [...rows].sort((a, b) => {
    if (a[key] === b[key]) return 0;
    return direction === 'asc' ? (a[key] > b[key] ? 1 : -1) : a[key] < b[key] ? 1 : -1;
  });
}
