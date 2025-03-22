import { parameterPatternsFullAttacker } from '$lib/utils/parameterPatternsFullAttacker';
import { createParameterStore } from './createParameterStore';

const {
  parameters: parametersFullAttacker,
  generateRandomParameters: generateRandomParametersFullAttacker,
  resetParameters: resetParametersFullAttacker
} = createParameterStore(parameterPatternsFullAttacker, 'fullAttacker');

export {
  parametersFullAttacker,
  generateRandomParametersFullAttacker,
  resetParametersFullAttacker
};
