export interface ParameterObject {
  bulletSpeed: number;
  bulletScale: number;
  chargeSpeed: number;
  shieldStrength: number;
}

export type ParameterKey = keyof ParameterObject;

export interface PatternItem {
  parameter: string; // "1234" のような4桁のパラメータ文字列
  weight: number;
}
