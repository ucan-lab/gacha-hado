import { teamPatterns } from '$lib/utils/teamPatterns';

interface ParameterObject {
  bulletSpeed: number;
  bulletScale: number;
  chargeSpeed: number;
  shieldStrength: number;
}

function parseParameterString(param: string): ParameterObject {
  return {
    bulletSpeed: parseInt(param[0], 10),
    bulletScale: parseInt(param[1], 10),
    chargeSpeed: parseInt(param[2], 10),
    shieldStrength: parseInt(param[3], 10)
  };
}

// プレイヤー1～3のパラメータを返す
export function generateGachiMatchParameters(): ParameterObject[] {
  const randomIndex = Math.floor(Math.random() * teamPatterns.length);
  const chosenPattern = teamPatterns[randomIndex];

  const parameters = [
    parseParameterString(chosenPattern.player1),
    parseParameterString(chosenPattern.player2),
    parseParameterString(chosenPattern.player3)
  ];

  // Fisher-Yatesアルゴリズムで配列をシャッフル
  for (let i = parameters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [parameters[i], parameters[j]] = [parameters[j], parameters[i]];
  }

  return parameters;
}

export function resetGachiMatchParameters(): void {
  // 必要があれば状態を初期化（今回は特になし）
}
