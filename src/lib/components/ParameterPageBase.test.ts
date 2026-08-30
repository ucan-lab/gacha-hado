import { fireEvent, render, screen } from '@testing-library/svelte';
import { tick } from 'svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as m from '$lib/paraglide/messages';
import type { ParameterObject } from '$lib/types';
import ParameterPageBase from './ParameterPageBase.svelte';

const generatedParameters: ParameterObject = {
  bulletSpeed: 2,
  bulletScale: 3,
  chargeSpeed: 4,
  shieldStrength: 5
};

describe('ParameterPageBase', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('disables roll/reset while rolling and re-enables them after final parameters render', async () => {
    vi.useFakeTimers();
    const generateParams = vi.fn(() => [generatedParameters]);

    render(ParameterPageBase, {
      props: {
        playerCount: 1,
        generateParams,
        resetParams: null
      }
    });

    const rollButton = screen.getByRole('button', { name: m.roll() }) as HTMLButtonElement;
    const resetButton = screen.getByRole('button', { name: m.reset() }) as HTMLButtonElement;

    await fireEvent.click(rollButton);
    await tick();

    expect(rollButton.disabled).toBe(true);
    expect(resetButton.disabled).toBe(true);

    await vi.advanceTimersByTimeAsync(1200);
    await tick();

    expect(screen.getByText('2').textContent).toBe('2');
    expect(screen.getByText('3').textContent).toBe('3');
    expect(screen.getByText('4').textContent).toBe('4');
    expect(screen.getByText('5').textContent).toBe('5');
    expect(rollButton.disabled).toBe(false);
    expect(resetButton.disabled).toBe(false);
    expect(generateParams).toHaveBeenCalled();
  });

  it('resets displayed player parameters and calls the optional reset hook', async () => {
    vi.useFakeTimers();
    const resetParams = vi.fn();

    render(ParameterPageBase, {
      props: {
        playerCount: 1,
        generateParams: () => [generatedParameters],
        resetParams
      }
    });

    await fireEvent.click(screen.getByRole('button', { name: m.roll() }));
    await vi.advanceTimersByTimeAsync(1200);
    await tick();

    expect(screen.getByText('5').textContent).toBe('5');

    await fireEvent.click(screen.getByRole('button', { name: m.reset() }));
    await tick();

    expect(screen.getAllByText('1')).toHaveLength(4);
    expect(resetParams).toHaveBeenCalledTimes(1);
  });
});
