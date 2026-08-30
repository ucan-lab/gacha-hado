import { writable } from 'svelte/store';
import type { ParameterObject, PatternItem } from '$lib/types';
import { parseParameterString } from '$lib/utils/parseParameterString';

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
  function pickWeightedParameter(candidates: PatternItem[]) {
    if (candidates.length === 0) {
      throw new Error(`No valid patterns available in store: ${storeName}`);
    }

    const totalWeight = candidates.reduce((sum, item) => sum + item.weight, 0);
    let randomWeight = Math.random() * totalWeight;

    for (const item of candidates) {
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
    const randomParameter = pickWeightedParameter(patternList);

    const parameterObj = parseParameterString(randomParameter);

    parameters.set(parameterObj);

    return parameterObj;
  }

  /**
   * チーム全員分をまとめて抽選する
   * @param count 抽選するプレイヤー数
   * @param unique true ならチーム内で同じパラメータが出ないようにする
   */
  function generateTeamParameters(count: number, unique = false): ParameterObject[] {
    const used = new Set<string>();

    return Array.from({ length: count }, () => {
      const remaining = unique
        ? patternList.filter((item) => !used.has(item.parameter))
        : patternList;

      // 候補を使い切ったときは抽選を止めずに重複を許す
      const parameter = pickWeightedParameter(remaining.length > 0 ? remaining : patternList);
      used.add(parameter);

      const parameterObj = parseParameterString(parameter);
      parameters.set(parameterObj);

      return parameterObj;
    });
  }

  // リセット関数
  function resetParameters() {
    parameters.set(initial);
  }

  // 戻り値として必要な要素をまとめて返す
  return {
    parameters,
    generateRandomParameters,
    generateTeamParameters,
    resetParameters
  };
}
