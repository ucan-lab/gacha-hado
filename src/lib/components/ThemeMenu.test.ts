import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import * as m from '$lib/paraglide/messages';
import ThemeMenu from './ThemeMenu.svelte';

describe('ThemeMenu', () => {
  it('keeps the menu closed and calls onToggle from the trigger', async () => {
    const onToggle = vi.fn();

    render(ThemeMenu, {
      props: { open: false, currentTheme: 'neon', onToggle, onSelect: vi.fn() }
    });

    const trigger = screen.getByRole('button', { name: m.theme() });

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByRole('button', { name: m.themeClassicLight() })).toBeNull();

    await fireEvent.click(trigger);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('renders all three themes when open and marks/selects the current theme', async () => {
    const onSelect = vi.fn();

    render(ThemeMenu, {
      props: { open: true, currentTheme: 'dark', onToggle: vi.fn(), onSelect }
    });

    expect(screen.getByRole('button', { name: m.theme() }).getAttribute('aria-expanded')).toBe(
      'true'
    );
    expect(
      screen.getByRole('button', { name: m.themeClassicDark() }).getAttribute('aria-current')
    ).toBe('true');
    expect(
      screen.getByRole('button', { name: m.themeNeon() }).getAttribute('aria-current')
    ).toBeNull();

    await fireEvent.click(screen.getByRole('button', { name: m.themeNeon() }));
    expect(onSelect).toHaveBeenCalledWith('neon');

    await fireEvent.click(screen.getByRole('button', { name: m.themeClassicLight() }));
    expect(onSelect).toHaveBeenCalledWith('light');
  });
});
