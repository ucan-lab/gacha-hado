import { fireEvent, render, screen } from '@testing-library/svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as m from '$lib/paraglide/messages';
import { uniqueParameters } from '$lib/stores/settings';
import ParameterPage from './ParameterPage.svelte';

const { generateTeamParameters } = vi.hoisted(() => ({
  generateTeamParameters: vi.fn((count: number) =>
    Array.from({ length: count }, () => ({
      bulletSpeed: 1,
      bulletScale: 1,
      chargeSpeed: 1,
      shieldStrength: 1
    }))
  )
}));

vi.mock('$lib/stores/parameters', () => ({
  generateTeamParameters,
  resetParameters: vi.fn()
}));

describe('ParameterPage', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    generateTeamParameters.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
    uniqueParameters.set(false);
  });

  it.each([true, false])('passes the uniqueParameters setting (%s) to the draw', async (unique) => {
    uniqueParameters.set(unique);
    render(ParameterPage, { props: { playerCount: 2 } });

    await fireEvent.click(screen.getByRole('button', { name: m.roll() }));
    await vi.advanceTimersByTimeAsync(1200);

    expect(generateTeamParameters).toHaveBeenLastCalledWith(2, unique);
  });
});
