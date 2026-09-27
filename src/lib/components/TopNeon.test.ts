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

  // 参照先の id を書き間違えると、エラーにならずにグラデーションやフィルターが消えるだけになる
  it('resolves every url(#id) reference in the hero to an element inside the same svg', () => {
    const { container } = render(TopNeon);
    const svg = container.querySelector('svg.hero');
    expect(svg).not.toBeNull();

    const refs = [...svg!.querySelectorAll('*')].flatMap((el) =>
      ['fill', 'stroke', 'filter', 'mask']
        .map((attr) => el.getAttribute(attr)?.match(/^url\(#(.+)\)$/)?.[1])
        .filter((id): id is string => id !== undefined)
    );

    expect(refs.length).toBeGreaterThan(0);
    for (const id of refs) {
      expect(svg!.querySelector(`[id="${id}"]`), id).not.toBeNull();
    }
  });

  it('draws the character image in the hero', () => {
    const { container } = render(TopNeon);

    expect(container.querySelector('svg.hero image')?.getAttribute('href')).toMatch(/\.webp$/);
  });
});
