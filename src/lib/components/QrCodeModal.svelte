<script lang="ts">
  import { IconX, IconClipboardText, IconClipboardCheck } from '@tabler/icons-svelte';
  import * as m from '$lib/paraglide/messages';
  import QrCode from '$lib/assets/qr-code.jpg';
  import { SHARE_URL } from '$lib/config';

  const { show, onClose }: { show: boolean; onClose: () => void } = $props();

  let copied = $state(false);

  function copyLink() {
    navigator.clipboard.writeText(SHARE_URL).then(() => {
      copied = true;
      setTimeout(() => (copied = false), 2000);
    });
  }
</script>

{#if show}
  <div class="fixed inset-0 z-10 flex items-center justify-center bg-black">
    <div class="rounded-lg">
      <div class="flex items-center justify-between">
        <h3 class="mb-4 text-xl font-bold text-white">{m.QrCode()}</h3>
        <div class="-mt-4">
          <button
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
        <span role="status" aria-live="polite" aria-atomic="true" class="sr-only"
          >{copied ? m.copied() : ''}</span
        >
      </div>
    </div>
  </div>
{/if}
