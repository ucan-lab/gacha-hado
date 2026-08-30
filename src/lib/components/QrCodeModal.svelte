<script lang="ts">
  import { IconX, IconClipboardText, IconClipboardCheck } from '@tabler/icons-svelte';
  import * as m from '$lib/paraglide/messages';
  import QrCode from '$lib/assets/qr-code.jpg';
  import { SHARE_URL } from '$lib/config';

  const { show, onClose }: { show: boolean; onClose: () => void } = $props();

  let copied = $state(false);
  let copyFailed = $state(false);
  let dialogElement = $state<HTMLDivElement | null>(null);
  let closeButton = $state<HTMLButtonElement | null>(null);
  let copyTimeoutId: ReturnType<typeof setTimeout> | null = null;

  async function copyLink() {
    if (copyTimeoutId) clearTimeout(copyTimeoutId);
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      copyFailed = false;
      copied = true;
    } catch {
      copied = false;
      copyFailed = true;
    }
    copyTimeoutId = setTimeout(() => {
      copied = false;
      copyFailed = false;
    }, 2000);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      onClose();
      return;
    }
    if (event.key !== 'Tab' || !dialogElement) return;

    const focusables = dialogElement.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  // モーダルが開いている間のみ keydown を購読し、初期フォーカスとフォーカス復帰を行う
  $effect(() => {
    if (!show) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    copied = false;
    copyFailed = false;
    queueMicrotask(() => closeButton?.focus());
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      if (copyTimeoutId) clearTimeout(copyTimeoutId);
      previouslyFocused?.focus();
    };
  });
</script>

{#if show}
  <div class="fixed inset-0 z-10 flex items-center justify-center">
    <!-- 背景クリックで閉じる。インタラクティブな button にすることで a11y 要件を満たす -->
    <button
      type="button"
      class="absolute inset-0 -z-10 cursor-default bg-black"
      aria-hidden="true"
      tabindex="-1"
      onclick={onClose}
    ></button>
    <div
      bind:this={dialogElement}
      class="relative rounded-lg"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qrcode-modal-title"
    >
      <div class="flex items-center justify-between">
        <h3 id="qrcode-modal-title" class="mb-4 text-xl font-bold text-white">{m.QrCode()}</h3>
        <div class="-mt-4">
          <button
            bind:this={closeButton}
            aria-label={m.close()}
            onclick={onClose}
            class="cursor-pointer rounded-full bg-gray-800 p-2 text-white hover:bg-gray-700"
          >
            <IconX />
          </button>
        </div>
      </div>
      <div class="mb-4">
        <img src={QrCode} alt={m.QrCode()} class="h-96 w-96" />
      </div>
      <div class="flex max-w-md items-center space-x-2 rounded-lg border p-2 text-white">
        <input
          type="text"
          value={SHARE_URL}
          readonly
          class="flex-1 border-none bg-transparent px-3 py-2 focus:outline-none"
        />
        <button
          class="cursor-pointer rounded p-2"
          aria-label={m.copyLink()}
          onclick={() => copyLink()}
        >
          {#if copied}
            <IconClipboardCheck class="h-5 w-5 text-green-600" />
          {:else}
            <IconClipboardText class="h-5 w-5" />
          {/if}
        </button>
        <span role="status" aria-live="polite" aria-atomic="true" class="sr-only">
          {copied ? m.copied() : copyFailed ? m.copyFailed() : ''}
        </span>
      </div>
    </div>
  </div>
{/if}
