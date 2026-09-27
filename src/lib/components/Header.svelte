<script lang="ts">
  import { initializeLocale, changeLocale, locale } from '$lib/utils/locale';
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import { theme } from '$lib/stores/theme';
  import { resolveCurrentTheme, type Theme } from '$lib/constants/theme';
  import { page } from '$app/state';
  import { browser } from '$app/environment';
  import { IconHome, IconMenu2, IconQrcode } from '@tabler/icons-svelte';
  import * as m from '$lib/paraglide/messages';
  import { uniqueParameters, isUniqueParametersAvailable } from '$lib/stores/settings';
  import QrCodeModal from '$lib/components/QrCodeModal.svelte';
  import LanguageMenu from '$lib/components/LanguageMenu.svelte';
  import ThemeMenu from '$lib/components/ThemeMenu.svelte';

  let showModal = false;

  function toggleModal() {
    showModal = !showModal;
  }

  const menuOpen = writable(false);
  const languageMenuOpen = writable(false);
  const themeMenuOpen = writable(false);

  $: currentTheme = resolveCurrentTheme(browser, $theme, page.data.theme);

  const toggleMenuState = (menu: string) => {
    menuOpen.set(menu === 'menu' ? !$menuOpen : false);
    languageMenuOpen.set(menu === 'language' ? !$languageMenuOpen : false);
    themeMenuOpen.set(menu === 'theme' ? !$themeMenuOpen : false);
  };

  const changeLocaleWithMenuToggle = (locale: string) => {
    changeLocale(locale);
    closeAllMenus();
  };

  const changeThemeWithMenuToggle = (themeName: Theme) => {
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
      { href: '/full-attacker', label: m.fullAttacker },
      { href: '/gachi', label: m.gachiMatch }
    ],
    [{ href: '/drop-rate', label: m.dropRateTable }]
  ];
</script>

<nav
  class="bg-secondary neon:border-glow neon:border-b flex items-center justify-between px-2 py-1"
>
  <a aria-label={m.home()} href="/" class="text-xl font-bold hover:underline">
    {m.appName()}
  </a>

  <div class="flex items-center gap-4">
    {#if page.url.pathname !== '/'}
      <a aria-label={m.home()} href="/" class="flex items-center gap-1 hover:underline">
        <IconHome />
      </a>
    {/if}
    <ThemeMenu
      open={$themeMenuOpen}
      {currentTheme}
      onToggle={() => toggleMenuState('theme')}
      onSelect={changeThemeWithMenuToggle}
    />
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
        class="neon:border-glow flex cursor-pointer rounded border px-2 py-1"
        on:click={() => toggleMenuState('menu')}
      >
        <IconMenu2 />
      </button>
      {#if $menuOpen}
        <div
          class="hamburger-menu-container bg-secondary neon:glass absolute right-0 z-60 mt-3 w-72 rounded p-2 shadow-lg"
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

          <hr class="my-2" />

          <label
            class="flex items-center justify-between gap-2 rounded px-4 py-2 {isUniqueParametersAvailable(
              page.url.pathname
            )
              ? 'bg-secondary-hover cursor-pointer'
              : 'cursor-not-allowed opacity-50'}"
          >
            {m.uniqueParameters()}
            <input
              type="checkbox"
              class="h-4 w-4 cursor-pointer disabled:cursor-not-allowed"
              bind:checked={$uniqueParameters}
              disabled={!isUniqueParametersAvailable(page.url.pathname)}
            />
          </label>
        </div>
      {/if}
    </div>
  </div>
</nav>

<style>
  .hamburger-menu button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
  }
</style>
