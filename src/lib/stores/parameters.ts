import { writable } from 'svelte/store';
import { parameterPatterns } from '$lib/utils/parameterPatterns';

type CumulativeWeight = {
  parameter: string;
  cumulativeWeight: number
};

export const parameters = writable({
  bulletSpeed: 1,
  bulletScale: 1,
  chargeSpeed: 1,
  shieldStrength: 1
});

const cumulativeWeights: CumulativeWeight[] = [];
let totalWeight = 0;

for (const item of parameterPatterns) {
  totalWeight += item.weight;
  cumulativeWeights.push({ parameter: item.parameter, cumulativeWeight: totalWeight });
}

export function generateWeightedRandomParameters() {
  const randomParameter = selectParameterByWeightedRandom();

  const parameter = {
    bulletSpeed: parseInt(randomParameter[0], 10),
    bulletScale: parseInt(randomParameter[1], 10),
    chargeSpeed: parseInt(randomParameter[2], 10),
    shieldStrength: parseInt(randomParameter[3], 10)
  };

  parameters.set(parameter);

  return parameter;
}

// 重み付け選択(累積重み＋二分探索)
function selectParameterByWeightedRandom() {
  const randomWeight = Math.random() * totalWeight;

  // 二分探索で cumulativeWeight を超えた最初の要素を見つける
  let left = 0, right = cumulativeWeights.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (cumulativeWeights[mid].cumulativeWeight < randomWeight) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return cumulativeWeights[left].parameter;
}

export function resetParameters() {
  parameters.set({
    bulletSpeed: 1,
    bulletScale: 1,
    chargeSpeed: 1,
    shieldStrength: 1
  });
}
