import { cleanup } from '@testing-library/svelte';
import { afterEach } from 'vitest';

Object.defineProperty(window.navigator, 'language', {
  value: 'ja-JP',
  configurable: true
});

Object.defineProperty(window.navigator, 'languages', {
  value: ['ja-JP', 'ja'],
  configurable: true
});

afterEach(() => {
  cleanup();
});
