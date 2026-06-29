import { render, screen, within } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import * as m from '$lib/paraglide/messages';
import Breadcrumb from './Breadcrumb.svelte';

describe('Breadcrumb', () => {
  it('renders intermediate items as links and the final item as current text', () => {
    render(Breadcrumb, {
      props: {
        items: [
          { label: 'ホーム', href: '/' },
          { label: 'HADOについて', href: '/about' },
          { label: 'HADO ルール', href: '/about/rules' }
        ]
      }
    });

    const navigation = screen.getByRole('navigation', { name: m.breadcrumb() });
    const links = within(navigation).getAllByRole('link');

    expect(links).toHaveLength(2);
    expect(links[0].textContent?.trim()).toBe('ホーム');
    expect(links[0].getAttribute('href')).toBe('/');
    expect(links[1].textContent?.trim()).toBe('HADOについて');
    expect(links[1].getAttribute('href')).toBe('/about');
    expect(within(navigation).getByText('HADO ルール').textContent?.trim()).toBe('HADO ルール');
    expect(within(navigation).queryByRole('link', { name: 'HADO ルール' })).toBeNull();
  });
});
