<script lang="ts">
  import { initializeLocale, changeLocale, locale } from '$lib/utils/locale';
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { IconMenu2, IconWorld } from '@tabler/icons-svelte';
  import * as m from '$lib/paraglide/messages';

  initializeLocale();

  let menuOpen = false;
  let languageMenuOpen = false;

  const toggleMenu = () => {
    menuOpen = !menuOpen;
  };

  const toggleLanguageMenu = () => {
    languageMenuOpen = !languageMenuOpen;
  };

  const changeLocaleWithMenuToggle = (locale: string) => {
    languageMenuOpen = false;
    menuOpen = false;
    changeLocale(locale);
  };

  // ハンバーガーメニュー以外をクリックしたら閉じる
  const closeMenu = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (menuOpen && target && !target.closest('.menu-container') && !target.closest('button')) {
      menuOpen = false;
    }
  };

  if (browser) {
    onMount(() => {
      document.addEventListener('click', closeMenu);
    });

    onDestroy(() => {
      document.removeEventListener('click', closeMenu);
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
              class="block w-full px-4 py-2 text-left hover:bg-gray-700"
              on:click={() => changeLocaleWithMenuToggle('ja')}>日本語</button
            >
          {/if}
          {#if $locale !== 'en'}
            <button
              class="block w-full px-4 py-2 text-left hover:bg-gray-700"
              on:click={() => changeLocaleWithMenuToggle('en')}>English</button
            >
          {/if}
          {#if $locale !== 'zh'}
            <button
              class="block w-full px-4 py-2 text-left hover:bg-gray-700"
              on:click={() => changeLocaleWithMenuToggle('zh')}>中文</button
            >
          {/if}
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
