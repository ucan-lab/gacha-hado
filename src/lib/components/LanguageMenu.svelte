<script lang="ts">
  import { IconWorld, IconCheck } from '@tabler/icons-svelte';

  const {
    open,
    currentLocale,
    onToggle,
    onSelect
  }: {
    open: boolean;
    currentLocale: string | null;
    onToggle: () => void;
    onSelect: (code: string) => void;
  } = $props();

  const languages = [
    { code: 'ja', label: '日本語' },
    { code: 'en', label: 'English' },
    { code: 'zh', label: '中文' }
  ];
</script>

<div class="language-menu relative">
  <button
    aria-label="Language"
    class="flex cursor-pointer items-center gap-1 p-0 hover:underline"
    onclick={onToggle}
  >
    <IconWorld />
  </button>
  {#if open}
    <div role="menu" class="bg-secondary absolute right-0 z-60 mt-2 w-32 rounded p-2 shadow-lg">
      {#each languages as lang (lang.code)}
        <button
          role="menuitemradio"
          aria-checked={currentLocale === lang.code}
          class="bg-secondary-hover flex w-full cursor-pointer items-center gap-1 px-4 py-2 text-left"
          onclick={() => onSelect(lang.code)}
        >
          {#if currentLocale === lang.code}<IconCheck class="text-green-500" />{/if}
          {lang.label}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .language-menu button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
  }
</style>
