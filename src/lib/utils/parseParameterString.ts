import type { ParameterObject } from '$lib/types';

export function parseParameterString(param: string): ParameterObject {
  return {
    bulletSpeed: parseInt(param[0], 10),
    bulletScale: parseInt(param[1], 10),
    chargeSpeed: parseInt(param[2], 10),
    shieldStrength: parseInt(param[3], 10)
  };
}
