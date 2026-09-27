import { fireEvent, render, screen } from '@testing-library/svelte';
import { get } from 'svelte/store';
import { afterEach, describe, expect, it } from 'vitest';
import * as m from '$lib/paraglide/messages';
// vitest.config.ts で $app/state をこのスタブへ向けているので、Header が読む page と同じオブジェクトになる
import { page } from '$lib/test/app-state';
import { isDrawing } from '$lib/stores/drawing';
import { uniqueParameters } from '$lib/stores/settings';
import Header from './Header.svelte';

const openMenuAt = async (pathname: string) => {
  page.url = new URL(pathname, 'http://localhost');
  render(Header);
  await fireEvent.click(screen.getByRole('button', { name: m.menu() }));
  return screen.getByRole('switch', { name: m.uniqueParameters() }) as HTMLInputElement;
};

describe('Header - uniqueParameters switch', () => {
  afterEach(() => {
    uniqueParameters.set(false);
    isDrawing.set(false);
    page.url = new URL('http://localhost/');
  });

  it('shows the stored setting where it takes effect', async () => {
    uniqueParameters.set(true);
    const toggle = await openMenuAt('/duo');

    expect(toggle.disabled).toBe(false);
    expect(toggle.checked).toBe(true);
  });

  it('shows the switch as off on pages where the setting has no effect', async () => {
    uniqueParameters.set(true);
    const toggle = await openMenuAt('/solo');

    expect(toggle.disabled).toBe(true);
    expect(toggle.checked).toBe(false);
    expect(get(uniqueParameters)).toBe(true);
  });

  it('locks the switch while rolling so the draw keeps one setting', async () => {
    isDrawing.set(true);
    const toggle = await openMenuAt('/duo');

    expect(toggle.disabled).toBe(true);
  });

  it('saves the switch state to the setting', async () => {
    const toggle = await openMenuAt('/trio');

    await fireEvent.click(toggle);

    expect(get(uniqueParameters)).toBe(true);
  });
});
