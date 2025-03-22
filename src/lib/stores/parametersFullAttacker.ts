import { writable } from 'svelte/store';
import { parameterPatternsFullAttacker } from '$lib/utils/parameterPatternsFullAttacker';

export const parametersFullAttacker = writable({
  bulletSpeed: 1,
  bulletScale: 1,
  chargeSpeed: 1,
  shieldStrength: 1
});

function getWeightedRandomSelectionParameterFullAttacker() {
  if (parameterPatternsFullAttacker.length === 0) {
    throw new Error('No valid patterns available for full attacker');
  }

  const totalWeight = parameterPatternsFullAttacker.reduce((sum, item) => sum + item.weight, 0);
  let randomWeight = Math.random() * totalWeight;

  for (const item of parameterPatternsFullAttacker) {
    randomWeight -= item.weight;
    if (randomWeight <= 0) {
      return item.parameter;
    }
  }

  throw new Error('Failed to select a valid pattern');
}

export function generateRandomParametersFullAttacker() {
  const randomParameter = getWeightedRandomSelectionParameterFullAttacker();

  const parameter = {
    bulletSpeed: parseInt(randomParameter[0], 10),
    bulletScale: parseInt(randomParameter[1], 10),
    chargeSpeed: parseInt(randomParameter[2], 10),
    shieldStrength: parseInt(randomParameter[3], 10)
  };

  parametersFullAttacker.set(parameter);
  return parameter;
}

export function resetParametersFullAttacker() {
  parametersFullAttacker.set({
    bulletSpeed: 1,
    bulletScale: 1,
    chargeSpeed: 1,
    shieldStrength: 1
  });
}
