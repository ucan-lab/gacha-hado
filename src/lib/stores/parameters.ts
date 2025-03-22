import { parameterPatterns } from '$lib/utils/parameterPatterns';
import { createParameterStore } from './createParameterStore';

// Trio 用ストアを生成
const {
  parameters, // -> Store本体
  generateRandomParameters, // -> ランダム生成関数
  resetParameters // -> リセット関数
} = createParameterStore(parameterPatterns, 'trio');

export { parameters, generateRandomParameters, resetParameters };
