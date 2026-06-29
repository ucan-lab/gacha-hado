import { cleanup, setup } from '@testing-library/svelte';
import { afterEach, beforeEach } from 'vitest';

Object.defineProperty(window.navigator, 'language', {
  value: 'ja-JP',
  configurable: true
});

Object.defineProperty(window.navigator, 'languages', {
  value: ['ja-JP', 'ja'],
  configurable: true
});

beforeEach(async () => {
  await setup();
});

afterEach(() => {
  cleanup();
});
