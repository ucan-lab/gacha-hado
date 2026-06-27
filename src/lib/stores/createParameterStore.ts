import { writable } from 'svelte/store';
import type { ParameterObject, PatternItem } from '$lib/types';

/**
 * パラメータストア + パラメータ生成関数 + リセット関数を作るファクトリ
 * @param patternList ウェイト付きパターンの配列
 * @param storeName ログ等で識別したい場合
 */
export function createParameterStore(patternList: PatternItem[], storeName = 'default') {
  // Svelte ストアの初期値
  const initial: ParameterObject = {
    bulletSpeed: 1,
    bulletScale: 1,
    chargeSpeed: 1,
    shieldStrength: 1
  };

  // ストア本体
  const parameters = writable<ParameterObject>(initial);

  // ウェイト抽選ロジック
  function getWeightedRandomSelectionParameter() {
    if (patternList.length === 0) {
      throw new Error(`No valid patterns available in store: ${storeName}`);
    }

    const totalWeight = patternList.reduce((sum, item) => sum + item.weight, 0);
    let randomWeight = Math.random() * totalWeight;

    for (const item of patternList) {
      randomWeight -= item.weight;
      if (randomWeight <= 0) {
        return item.parameter;
      }
    }

    // ここに来ることはほぼないがエラーを出す
    throw new Error(`Failed to select a valid pattern in store: ${storeName}`);
  }

  // ランダムパラメータ生成関数
  function generateRandomParameters() {
    const randomParameter = getWeightedRandomSelectionParameter();

    const parameterObj: ParameterObject = {
      bulletSpeed: parseInt(randomParameter[0], 10),
      bulletScale: parseInt(randomParameter[1], 10),
      chargeSpeed: parseInt(randomParameter[2], 10),
      shieldStrength: parseInt(randomParameter[3], 10)
    };

    parameters.set(parameterObj);

    return parameterObj;
  }

  // リセット関数
  function resetParameters() {
    parameters.set(initial);
  }

  // 戻り値として必要な要素をまとめて返す
  return {
    parameters,
    generateRandomParameters,
    resetParameters
  };
}
