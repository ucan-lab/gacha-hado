import { writable } from 'svelte/store';

// ロール演出中は抽選を繰り返し呼ぶので、その間に抽選の設定が変わらないよう Header 側の操作も止める
export const isDrawing = writable(false);
