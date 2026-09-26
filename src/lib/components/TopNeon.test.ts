import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import * as m from '$lib/paraglide/messages';
import TopClassic from './TopClassic.svelte';
import TopNeon from './TopNeon.svelte';

const modeLinks = () =>
  screen.getAllByRole('link').map((link) => ({
    href: link.getAttribute('href'),
    label: link.getAttribute('aria-label')
  }));

describe('TopNeon', () => {
  it('links to all five modes with the same aria-labels as the classic top', () => {
    const { unmount } = render(TopClassic);
    const classicLinks = modeLinks();
    unmount();

    render(TopNeon);

    expect(modeLinks()).toEqual(classicLinks);
    expect(classicLinks).toHaveLength(5);
  });

  it('shows beta modes with a badge instead of the (β) suffix and keeps the notice', () => {
    render(TopNeon);

    const fullAttacker = screen.getByRole('link', { name: m.fullAttacker() });
    expect(fullAttacker.textContent).not.toContain('(β)');
    expect(fullAttacker.querySelector('.beta')?.textContent).toBe('β');
    expect(screen.getByText(m.attention())).toBeTruthy();
  });
});
