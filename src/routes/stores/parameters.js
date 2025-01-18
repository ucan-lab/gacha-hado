import { writable } from 'svelte/store';
import { parameterPatterns } from '$lib/parameterPatterns';

export const parameters = writable({
  bulletSpeed: 1,
  bulletScale: 1,
  chargeSpeed: 1,
  shieldStrength: 1
});

function getWeightedRandomSelectionParameter() {
  if (parameterPatterns.length === 0) {
    throw new Error('No valid patterns available');
  }

  const totalWeight = parameterPatterns.reduce((sum, item) => sum + item.weight, 0);
  let randomWeight = Math.random() * totalWeight;

  for (const item of parameterPatterns) {
    randomWeight -= item.weight;
    if (randomWeight <= 0) {
      return item.parameter;
    }
  }

  throw new Error('Failed to select a valid pattern');
}

export function generateRandomParameters() {
  const randomParameter = getWeightedRandomSelectionParameter();

  const parameter = {
    bulletSpeed: parseInt(randomParameter[0], 10),
    bulletScale: parseInt(randomParameter[1], 10),
    chargeSpeed: parseInt(randomParameter[2], 10),
    shieldStrength: parseInt(randomParameter[3], 10)
  };

  parameters.set(parameter);

  return parameter;
}

export function resetParameters() {
  parameters.set({
    bulletSpeed: 1,
    bulletScale: 1,
    chargeSpeed: 1,
    shieldStrength: 1
  });
}
