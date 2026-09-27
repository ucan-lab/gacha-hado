import { parameterPatterns } from '$lib/utils/parameterPatterns';
import { createParameterStore } from './createParameterStore';

// Trio 用ストアを生成
const { parameters, generateRandomParameters, generateTeamParameters, resetParameters } =
  createParameterStore(parameterPatterns);

export { parameters, generateRandomParameters, generateTeamParameters, resetParameters };
