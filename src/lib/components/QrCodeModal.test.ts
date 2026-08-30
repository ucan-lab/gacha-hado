import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as m from '$lib/paraglide/messages';
import { SHARE_URL } from '$lib/config';
import QrCodeModal from './QrCodeModal.svelte';

describe('QrCodeModal', () => {
  const originalClipboard = window.navigator.clipboard;

  afterEach(() => {
    vi.useRealTimers();
    Object.defineProperty(window.navigator, 'clipboard', {
      value: originalClipboard,
      configurable: true,
      writable: true
    });
  });

  it('does not render the dialog when show is false', () => {
    render(QrCodeModal, {
      props: {
        show: false,
        onClose: vi.fn()
      }
    });

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('focuses the close button and calls onClose from keyboard, close button, and backdrop', async () => {
    const onClose = vi.fn();

    render(QrCodeModal, {
      props: {
        show: true,
        onClose
      }
    });

    const dialog = screen.getByRole('dialog', { name: m.QrCode() });
    const closeButton = screen.getByRole('button', { name: m.close() });

    expect(dialog.getAttribute('aria-modal')).toBe('true');
    await waitFor(() => {
      expect(document.activeElement).toBe(closeButton);
    });

    await fireEvent.keyDown(window, { key: 'Escape' });
    await fireEvent.click(closeButton);
    await fireEvent.click(
      document.querySelector('button[aria-hidden="true"]') as HTMLButtonElement
    );

    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it('copies the share URL and reports success', async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(window.navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
      writable: true
    });

    render(QrCodeModal, {
      props: {
        show: true,
        onClose: vi.fn()
      }
    });

    await fireEvent.click(screen.getByRole('button', { name: m.copyLink() }));

    expect(writeText).toHaveBeenCalledWith(SHARE_URL);
    expect(screen.getByRole('status').textContent?.trim()).toBe(m.copied());

    await vi.advanceTimersByTimeAsync(2000);

    expect(screen.getByRole('status').textContent?.trim()).toBe('');
  });

  it('reports copy failure when clipboard write rejects', async () => {
    vi.useFakeTimers();
    Object.defineProperty(window.navigator, 'clipboard', {
      value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
      configurable: true,
      writable: true
    });

    render(QrCodeModal, {
      props: {
        show: true,
        onClose: vi.fn()
      }
    });

    await fireEvent.click(screen.getByRole('button', { name: m.copyLink() }));

    expect(screen.getByRole('status').textContent?.trim()).toBe(m.copyFailed());
  });
});
