import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import LanguageMenu from './LanguageMenu.svelte';

describe('LanguageMenu', () => {
  it('keeps the menu closed and calls onToggle from the trigger', async () => {
    const onToggle = vi.fn();

    render(LanguageMenu, {
      props: {
        open: false,
        currentLocale: 'ja',
        onToggle,
        onSelect: vi.fn()
      }
    });

    const trigger = screen.getByRole('button', { name: 'Language' });

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByRole('button', { name: 'English' })).toBeNull();

    await fireEvent.click(trigger);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('renders options when open and marks/selects the current locale', async () => {
    const onSelect = vi.fn();

    render(LanguageMenu, {
      props: {
        open: true,
        currentLocale: 'en',
        onToggle: vi.fn(),
        onSelect
      }
    });

    expect(screen.getByRole('button', { name: 'Language' }).getAttribute('aria-expanded')).toBe(
      'true'
    );
    expect(screen.getByRole('button', { name: 'English' }).getAttribute('aria-current')).toBe(
      'true'
    );
    expect(screen.getByRole('button', { name: '日本語' }).getAttribute('aria-current')).toBeNull();

    await fireEvent.click(screen.getByRole('button', { name: '中文' }));

    expect(onSelect).toHaveBeenCalledWith('zh');
  });
});
