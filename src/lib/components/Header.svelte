<script lang="ts">
  import { initializeLocale, changeLocale, locale } from '$lib/utils/locale';
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import { theme } from '$lib/stores/theme';
  import type { Theme } from '$lib/constants/theme';
  import { page } from '$app/state';
  import { browser } from '$app/environment';
  import {
    IconHome,
    IconMenu2,
    IconQrcode,
    IconSunFilled,
    IconMoonFilled
  } from '@tabler/icons-svelte';
  import * as m from '$lib/paraglide/messages';
  import QrCodeModal from '$lib/components/QrCodeModal.svelte';
  import LanguageMenu from '$lib/components/LanguageMenu.svelte';

  let showModal = false;

  function toggleModal() {
    showModal = !showModal;
  }

  const menuOpen = writable(false);
  const languageMenuOpen = writable(false);

  const toggleMenuState = (menu: string) => {
    menuOpen.set(menu === 'menu' ? !$menuOpen : false);
    languageMenuOpen.set(menu === 'language' ? !$languageMenuOpen : false);
  };

  const changeLocaleWithMenuToggle = (locale: string) => {
    changeLocale(locale);
    closeAllMenus();
  };

  const changeTheme = (themeName: Theme) => {
    theme.set(themeName);
  };

  const closeAllMenus = () => {
    menuOpen.set(false);
    languageMenuOpen.set(false);
  };

  const closeMenuOnOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (target && !target.closest('.hamburger-menu-container') && !target.closest('button')) {
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

  if (browser) {
    initializeLocale();
  }

  const navGroups = [
    [
      { href: '/solo', label: m.solo },
      { href: '/duo', label: m.duo },
      { href: '/trio', label: m.trio }
    ],
    [
      { href: '/full-atacker', label: m.fullAttacker },
      { href: '/gachi', label: m.gachiMatch }
    ],
    [{ href: '/drop-rate', label: m.dropRateTable }]
  ];
</script>

<nav class="bg-secondary flex items-center justify-between px-2 py-1">
  <a aria-label={m.home()} href="/" class="text-xl font-bold hover:underline">
    {m.appName()}
  </a>

  <div class="flex items-center gap-4">
    {#if page.url.pathname !== '/'}
      <a aria-label={m.home()} href="/" class="flex items-center gap-1 hover:underline">
        <IconHome />
      </a>
    {/if}
    <div class="theme-menu relative">
      <button
        aria-label="Theme"
        class="flex cursor-pointer items-center gap-1 p-0 hover:underline"
        on:click={() => changeTheme($theme === 'dark' ? 'light' : 'dark')}
      >
        {#if $theme === 'dark'}
          <IconSunFilled />
        {:else if $theme === 'light'}
          <IconMoonFilled />
        {/if}
      </button>
    </div>
    <div class="qrcode-menu relative">
      <button
        aria-label={m.QrCode()}
        class="flex cursor-pointer items-center gap-1 p-0 hover:underline"
        on:click={() => toggleModal()}
      >
        <IconQrcode />
      </button>
    </div>
    <QrCodeModal show={showModal} onClose={toggleModal} />
    <LanguageMenu
      open={$languageMenuOpen}
      currentLocale={$locale}
      onToggle={() => toggleMenuState('language')}
      onSelect={changeLocaleWithMenuToggle}
    />
    <div class="hamburger-menu relative">
      <button
        aria-label={m.menu()}
        class="flex cursor-pointer rounded border px-2 py-1"
        on:click={() => toggleMenuState('menu')}
      >
        <IconMenu2 />
      </button>
      {#if $menuOpen}
        <div
          class="hamburger-menu-container bg-secondary absolute right-0 z-60 mt-3 w-60 rounded p-2 shadow-lg"
        >
          {#each navGroups as group, i (i)}
            {#if i > 0}
              <hr class="my-2" />
            {/if}
            {#each group as item (item.href)}
              <a
                aria-label={item.label()}
                href={item.href}
                class="bg-secondary-hover block rounded px-4 py-2"
                on:click={closeMenuOnOutsideClick}
              >
                {item.label()}
              </a>
            {/each}
          {/each}
        </div>
      {/if}
    </div>
  </div>
</nav>

<style>
  .theme-menu button,
  .hamburger-menu button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
  }
</style>
