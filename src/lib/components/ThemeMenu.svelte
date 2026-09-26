<script lang="ts">
  import { IconCheck, IconMoonFilled, IconSparkles, IconSunFilled } from '@tabler/icons-svelte';
  import * as m from '$lib/paraglide/messages';
  import type { Theme } from '$lib/constants/theme';

  const {
    open,
    currentTheme,
    onToggle,
    onSelect
  }: {
    open: boolean;
    currentTheme: Theme;
    onToggle: () => void;
    onSelect: (theme: Theme) => void;
  } = $props();

  const themes: { value: Theme; label: () => string; icon: typeof IconSparkles }[] = [
    { value: 'neon', label: m.themeNeon, icon: IconSparkles },
    { value: 'light', label: m.themeClassicLight, icon: IconSunFilled },
    { value: 'dark', label: m.themeClassicDark, icon: IconMoonFilled }
  ];

  const CurrentIcon = $derived(
    themes.find((theme) => theme.value === currentTheme)?.icon ?? IconSparkles
  );
</script>

<div class="theme-menu relative">
  <button
    aria-label={m.theme()}
    aria-expanded={open}
    class="flex cursor-pointer items-center gap-1 p-0 hover:underline"
    onclick={onToggle}
  >
    <CurrentIcon />
  </button>
  {#if open}
    <div class="bg-secondary absolute right-0 z-60 mt-2 w-max rounded p-2 shadow-lg">
      {#each themes as theme (theme.value)}
        <button
          aria-current={currentTheme === theme.value ? 'true' : undefined}
          class="bg-secondary-hover flex w-full cursor-pointer items-center gap-1 px-4 py-2 text-left whitespace-nowrap"
          onclick={() => onSelect(theme.value)}
        >
          <!-- 選択中以外も場所を確保し、選択中のテーマでメニュー幅と文字位置が変わらないようにする -->
          <IconCheck
            class="text-green-500 {currentTheme === theme.value ? '' : 'invisible'}"
            aria-hidden="true"
          />
          {theme.label()}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .theme-menu > button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
  }
</style>
