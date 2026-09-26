/**
 * 翻訳済みのモード名から末尾の「(β)」を外す。
 * β をバッジで別に見せる画面で、ラベルとバッジに β が二重に出ないようにする。
 */
export const withoutBetaMark = (label: string): string => label.replace(/\s*[(（]β[)）]\s*$/u, '');
