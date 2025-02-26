<script lang="ts">
  import { initializeLocale, changeLocale, locale } from '$lib/utils/locale';
  import { onMount, onDestroy } from 'svelte';
  import { theme } from '$lib/stores/theme';
  import { browser } from '$app/environment';
  import { IconMenu2, IconWorld, IconSun } from '@tabler/icons-svelte';
  import * as m from '$lib/paraglide/messages';

  initializeLocale();

  let menuOpen = false;
  let languageMenuOpen = false;
  let themeMenuOpen = false;

  const toggleMenu = () => {
    menuOpen = !menuOpen;
  };

  const toggleLanguageMenu = () => {
    languageMenuOpen = !languageMenuOpen;
  };

  const toggleThemeMenu = () => {
    themeMenuOpen = !themeMenuOpen;
  };

  const changeLocaleWithMenuToggle = (locale: string) => {
    changeLocale(locale);
    closeAllMenu();
  };

  const changeThemeWithMenuToggle = (themeName: string) => {
    theme.set(themeName);
    closeAllMenu();
  };

  const closeAllMenu = () => {
    menuOpen = false;
    languageMenuOpen = false;
    themeMenuOpen = false;
  };

  const closeMenuOnOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (target && !target.closest('.menu-container') && !target.closest('button')) {
      closeAllMenu();
    }
  };

  if (browser) {
    onMount(() => {
      document.addEventListener('click', closeMenuOnOutsideClick);
    });

    onDestroy(() => {
      document.removeEventListener('click', closeMenuOnOutsideClick);
    });
  }
</script>

<nav class="flex items-center justify-between bg-gray-900 px-2 py-1 text-white shadow-md">
  <a aria-label={m.top()} href="/" class="text-xl font-bold hover:underline">
    {m.appName()}
  </a>

  <div class="hidden items-center gap-4 md:flex">
    <div class="language-menu relative">
      <button
        aria-label="Language"
        class="flex cursor-pointer items-center gap-1 bg-transparent p-0 hover:underline"
        on:click={toggleLanguageMenu}
      >
        <IconWorld />Language
      </button>
      {#if languageMenuOpen}
        <div class="absolute right-0 mt-2 w-32 rounded bg-gray-800 p-2 shadow-lg">
          {#if $locale !== 'ja'}
            <button
              class="block w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-700"
              on:click={() => changeLocaleWithMenuToggle('ja')}>日本語</button
            >
          {/if}
          {#if $locale !== 'en'}
            <button
              class="block w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-700"
              on:click={() => changeLocaleWithMenuToggle('en')}>English</button
            >
          {/if}
          {#if $locale !== 'zh'}
            <button
              class="block w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-700"
              on:click={() => changeLocaleWithMenuToggle('zh')}>中文</button
            >
          {/if}
        </div>
      {/if}
    </div>
    <div class="theme-menu relative">
      <button
        aria-label="Theme"
        class="flex cursor-pointer items-center gap-1 bg-transparent p-0 hover:underline"
        on:click={toggleThemeMenu}
      >
        <IconSun />{m.theme()}
      </button>
      {#if themeMenuOpen}
        <div class="absolute right-0 mt-2 w-36 rounded bg-gray-800 p-2 shadow-lg">
          <button
            class="block w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-700"
            on:click={() => changeThemeWithMenuToggle('light')}>{m.light()}</button
          >
          <button
            class="block w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-700"
            on:click={() => changeThemeWithMenuToggle('dark')}>{m.dark()}</button
          >
        </div>
      {/if}
    </div>
  </div>

  <button
    aria-label={m.menu()}
    class="flex cursor-pointer items-center rounded border border-gray-400 px-2 py-1 text-white hover:border-gray-300 hover:text-gray-300 md:hidden"
    on:click={toggleMenu}
  >
    <IconMenu2 />
  </button>

  {#if menuOpen}
    <div
      class="menu-container absolute top-14 right-4 z-10 rounded bg-gray-800 p-4 shadow-lg md:hidden"
    >
      {#if $locale !== 'ja'}
        <button
          aria-label="日本語"
          class="block w-full rounded px-4 py-2 hover:bg-gray-700"
          on:click={() => changeLocaleWithMenuToggle('ja')}
        >
          日本語
        </button>
      {/if}
      {#if $locale !== 'en'}
        <button
          aria-label="English"
          class="block w-full rounded px-4 py-2 hover:bg-gray-700"
          on:click={() => changeLocaleWithMenuToggle('en')}
        >
          English
        </button>
      {/if}
      {#if $locale !== 'zh'}
        <button
          aria-label="中文"
          class="block w-full rounded px-4 py-2 hover:bg-gray-700"
          on:click={() => changeLocaleWithMenuToggle('zh')}
        >
          中文
        </button>
      {/if}
    </div>
  {/if}
</nav>
