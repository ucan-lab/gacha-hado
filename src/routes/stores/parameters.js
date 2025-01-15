import { writable } from 'svelte/store';
import { validCombinations } from '$lib/validCombinations';

export const parameters = writable({
  bulletSpeed: 1,
  bulletScale: 1,
  chargeSpeed: 1,
  shieldStrength: 1
});

function getRandomCombination() {
  if (validCombinations.length === 0) {
    throw new Error('No valid combinations available');
  }
  return validCombinations[Math.floor(Math.random() * validCombinations.length)];
}

export function generateRandomParameters() {
  const randomCombination = getRandomCombination();

  const parameter = {
    bulletSpeed: parseInt(randomCombination[0], 10),
    bulletScale: parseInt(randomCombination[1], 10),
    chargeSpeed: parseInt(randomCombination[2], 10),
    shieldStrength: parseInt(randomCombination[3], 10)
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
