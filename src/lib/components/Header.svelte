<script lang="ts">
  import { initializeLocale, changeLocale, locale } from '$lib/utils/locale';
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import { theme } from '$lib/stores/theme';
  import { page } from '$app/state';
  import { browser } from '$app/environment';
  import {
    IconHome,
    IconMenu2,
    IconWorld,
    IconCheck,
    IconQrcode,
    IconClipboardText,
    IconClipboardCheck,
    IconSunFilled,
    IconMoonFilled,
    IconX
  } from '@tabler/icons-svelte';
  import * as m from '$lib/paraglide/messages';
  import QrCode from '$lib/assets/qr-code.jpg';

  let copied = false;
  let showModal = false;

  function copyLink() {
    const link = 'https://gacha-hado.vercel.app';
    navigator.clipboard.writeText(link).then(() => {
      copied = true;
      setTimeout(() => (copied = false), 2000);
    });
  }

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

  const changeTheme = (themeName: string) => {
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
    {#if showModal}
      <div class="fixed inset-0 z-10 flex items-center justify-center bg-black">
        <div class="rounded-lg">
          <div class="flex items-center justify-between">
            <h3 class="mb-4 text-xl font-bold text-white">{m.QrCode()}</h3>
            <div class="-mt-4">
              <button
                aria-label={m.close()}
                on:click={toggleModal}
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
              value="https://gacha-hado.vercel.app"
              readonly
              class="flex-1 border-none bg-transparent px-3 py-2 focus:outline-none"
            />
            <button
              class="cursor-pointer rounded p-2"
              aria-label={m.copyLink()}
              on:click={() => copyLink()}
            >
              {#if copied}
                <IconClipboardCheck class="h-5 w-5 text-green-600" />
              {:else}
                <IconClipboardText class="h-5 w-5" />
              {/if}
            </button>
          </div>
        </div>
      </div>
    {/if}
    <div class="language-menu relative">
      <button
        aria-label="Language"
        class="flex cursor-pointer items-center gap-1 p-0 hover:underline"
        on:click={() => toggleMenuState('language')}
      >
        <IconWorld />
      </button>
      {#if $languageMenuOpen}
        <div class="bg-secondary absolute right-0 z-60 mt-2 w-32 rounded p-2 shadow-lg">
          <button
            class="bg-secondary-hover flex w-full cursor-pointer items-center gap-1 px-4 py-2 text-left"
            on:click={() => changeLocaleWithMenuToggle('ja')}
          >
            {#if $locale === 'ja'}<IconCheck class="text-green-500" />{/if}
            日本語
          </button>
          <button
            class="bg-secondary-hover flex w-full cursor-pointer items-center gap-1 px-4 py-2 text-left"
            on:click={() => changeLocaleWithMenuToggle('en')}
          >
            {#if $locale === 'en'}<IconCheck class="text-green-500" />{/if}
            English
          </button>
          <button
            class="bg-secondary-hover flex w-full cursor-pointer items-center gap-1 px-4 py-2 text-left"
            on:click={() => changeLocaleWithMenuToggle('zh')}
          >
            {#if $locale === 'zh'}<IconCheck class="text-green-500" />{/if}
            中文
          </button>
        </div>
      {/if}
    </div>
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
          <hr class="my-2" />
          <a
            aria-label={m.fullAtacker()}
            href="/full-atacker"
            class="bg-secondary-hover block rounded px-4 py-2"
            on:click={closeMenuOnOutsideClick}
          >
            {m.fullAtacker()}
          </a>
          <a
            aria-label={m.gachiMatch()}
            href="/gachi"
            class="bg-secondary-hover block rounded px-4 py-2"
            on:click={closeMenuOnOutsideClick}
          >
            {m.gachiMatch()}
          </a>
          <hr class="my-2" />
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
    </div>
  </div>
</nav>

<style>
  .language-menu button,
  .theme-menu button,
  .hamburger-menu button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
  }
</style>
