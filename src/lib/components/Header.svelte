<script lang="ts">
  import { initializeLocale, changeLocale, locale } from '$lib/utils/locale';
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import { theme } from '$lib/stores/theme';
  import { page } from '$app/state';
  import { browser } from '$app/environment';
  import { IconHome, IconMenu2, IconWorld, IconCheck, IconSun } from '@tabler/icons-svelte';
  import * as m from '$lib/paraglide/messages';

  initializeLocale();

  const menuOpen = writable(false);
  const languageMenuOpen = writable(false);
  const themeMenuOpen = writable(false);

  const toggleMenuState = (menu: string) => {
    menuOpen.set(menu === 'menu' ? !$menuOpen : false);
    languageMenuOpen.set(menu === 'language' ? !$languageMenuOpen : false);
    themeMenuOpen.set(menu === 'theme' ? !$themeMenuOpen : false);
  };

  const changeLocaleWithMenuToggle = (locale: string) => {
    changeLocale(locale);
    closeAllMenus();
  };

  const changeThemeWithMenuToggle = (themeName: string) => {
    theme.set(themeName);
    closeAllMenus();
  };

  const closeAllMenus = () => {
    menuOpen.set(false);
    languageMenuOpen.set(false);
    themeMenuOpen.set(false);
  };

  const closeMenuOnOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (target && !target.closest('.menu-container') && !target.closest('button')) {
      closeAllMenus();
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

<nav class="bg-secondary flex items-center justify-between px-2 py-1">
  <a aria-label={m.home()} href="/" class="text-xl font-bold hover:underline">
    {m.appName()}
  </a>

  <div class="flex items-center gap-4">
    {#if page.url.pathname !== '/'}
      <a aria-label={m.home()} href="/" class="flex items-center gap-1 hover:underline">
        <IconHome />
        {m.home()}
      </a>
    {/if}
    <div class="language-menu relative">
      <button
        aria-label="Language"
        class="flex cursor-pointer items-center gap-1 p-0 hover:underline"
        on:click={() => toggleMenuState('language')}
      >
        <IconWorld />Language
      </button>
      {#if $languageMenuOpen}
        <div class="bg-secondary absolute right-0 z-60 mt-3 w-32 rounded p-2 shadow-lg">
          {#if $locale !== 'ja'}
            <button
              class="bg-secondary-hover block w-full cursor-pointer px-4 py-2 text-left"
              on:click={() => changeLocaleWithMenuToggle('ja')}>日本語</button
            >
          {/if}
          {#if $locale !== 'en'}
            <button
              class="bg-secondary-hover block w-full cursor-pointer px-4 py-2 text-left"
              on:click={() => changeLocaleWithMenuToggle('en')}>English</button
            >
          {/if}
          {#if $locale !== 'zh'}
            <button
              class="bg-secondary-hover block w-full cursor-pointer px-4 py-2 text-left"
              on:click={() => changeLocaleWithMenuToggle('zh')}>中文</button
            >
          {/if}
        </div>
      {/if}
    </div>
    <div class="theme-menu relative">
      <button
        aria-label="Theme"
        class="flex cursor-pointer items-center gap-1 p-0 hover:underline"
        on:click={() => toggleMenuState('theme')}
      >
        <IconSun />{m.theme()}
      </button>
      {#if $themeMenuOpen}
        <div class="bg-secondary absolute right-0 z-60 mt-3 w-48 rounded p-2 shadow-lg">
          <button
            class="bg-secondary-hover flex w-full cursor-pointer items-center gap-1 px-4 py-2 text-left"
            on:click={() => changeThemeWithMenuToggle('auto')}
          >
            {#if $theme === 'auto'}<IconCheck class="text-green-500" />{/if}
            {m.auto()}
          </button>
          <button
            class="bg-secondary-hover flex w-full cursor-pointer items-center gap-1 px-4 py-2 text-left"
            on:click={() => changeThemeWithMenuToggle('light')}
          >
            {#if $theme === 'light'}<IconCheck class="text-green-500" />{/if}
            {m.light()}
          </button>
          <button
            class="bg-secondary-hover flex w-full cursor-pointer items-center gap-1 px-4 py-2 text-left"
            on:click={() => changeThemeWithMenuToggle('dark')}
          >
            {#if $theme === 'dark'}<IconCheck class="text-green-500" />{/if}
            {m.dark()}
          </button>
        </div>
      {/if}
    </div>
    <button
      aria-label={m.menu()}
      class="flex cursor-pointer rounded border px-2 py-1"
      on:click={() => toggleMenuState('menu')}
    >
      <IconMenu2 />
    </button>
  </div>

  {#if $menuOpen}
    <div class="menu-container bg-secondary absolute top-14 right-4 z-60 rounded p-4 shadow-lg">
      <a
        aria-label={m.solo()}
        href="/solo"
        class="bg-secondary-hover block rounded px-4 py-2"
        on:click={closeMenuOnOutsideClick}
      >
        {m.solo()}
      </a>
      <a
        aria-label={m.duo()}
        href="/duo"
        class="bg-secondary-hover block rounded px-4 py-2"
        on:click={closeMenuOnOutsideClick}
      >
        {m.duo()}
      </a>
      <a
        aria-label={m.trio()}
        href="/trio"
        class="bg-secondary-hover block rounded px-4 py-2"
        on:click={closeMenuOnOutsideClick}
      >
        {m.trio()}
      </a>
      <hr class="my-2 border-gray-600" />
      <a
        aria-label={m.dropRateTable()}
        href="/drop-rate"
        class="bg-secondary-hover block rounded px-4 py-2"
        on:click={closeMenuOnOutsideClick}
      >
        {m.dropRateTable()}
      </a>
    </div>
  {/if}
</nav>
