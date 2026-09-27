import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ToggleSwitch from './ToggleSwitch.svelte';

describe('ToggleSwitch', () => {
  it('exposes a labelled switch that toggles when the label is clicked', async () => {
    render(ToggleSwitch, { props: { label: 'Unique', checked: false } });

    const toggle = screen.getByRole('switch', { name: 'Unique' }) as HTMLInputElement;
    expect(toggle.checked).toBe(false);

    await fireEvent.click(screen.getByText('Unique'));

    expect(toggle.checked).toBe(true);
  });

  it('cannot be toggled while disabled', async () => {
    render(ToggleSwitch, { props: { label: 'Unique', checked: true, disabled: true } });

    const toggle = screen.getByRole('switch', { name: 'Unique' }) as HTMLInputElement;
    await fireEvent.click(screen.getByText('Unique'));

    expect(toggle.disabled).toBe(true);
    expect(toggle.checked).toBe(true);
  });
});
