<script lang="ts">
  import { initializeLocale, changeLocale, getCurrentLocale } from '$lib/utils/locale';
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import * as m from '$lib/paraglide/messages';

  initializeLocale();

  let menuOpen = false;
  let currentLocale: string | null = null;

  if (browser) {
    currentLocale = getCurrentLocale();
  }

  const toggleMenu = () => {
    menuOpen = !menuOpen;
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

<nav class="flex items-center justify-end bg-gray-900 px-2 py-1 pr-2 text-white shadow-md">
  <button
    class="flex items-center rounded border border-gray-400 px-2 py-1 text-white hover:border-gray-300 hover:text-gray-300 md:hidden"
    on:click={toggleMenu}
  >
    <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <title>{m.menu()}</title>
      <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
    </svg>
  </button>

  <div class="mr-4 hidden space-x-4 md:flex">
    {#if currentLocale !== null}
      {#if currentLocale !== 'ja'}
        <button
          class="m-0 cursor-pointer border-none bg-transparent p-0 hover:underline"
          on:click={() => changeLocale('ja')}
        >
          日本語
        </button>
      {/if}
      {#if currentLocale !== 'en'}
        <button
          class="m-0 cursor-pointer border-none bg-transparent p-0 hover:underline"
          on:click={() => changeLocale('en')}
        >
          English
        </button>
      {/if}
      {#if currentLocale !== 'zh'}
        <button
          class="m-0 cursor-pointer border-none bg-transparent p-0 hover:underline"
          on:click={() => changeLocale('zh')}
        >
          中文
        </button>
      {/if}
    {/if}
  </div>

  {#if menuOpen}
    <div
      class="menu-container absolute right-4 top-14 z-10 rounded bg-gray-800 p-4 shadow-lg md:hidden"
    >
      {#if currentLocale !== 'ja'}
        <button
          class="block w-full rounded px-4 py-2 hover:bg-gray-700"
          on:click={() => changeLocale('ja')}
        >
          日本語
        </button>
      {/if}
      {#if currentLocale !== 'en'}
        <button
          class="block w-full rounded px-4 py-2 hover:bg-gray-700"
          on:click={() => changeLocale('en')}
        >
          English
        </button>
      {/if}
      {#if currentLocale !== 'zh'}
        <button
          class="block w-full rounded px-4 py-2 hover:bg-gray-700"
          on:click={() => changeLocale('zh')}
        >
          中文
        </button>
      {/if}
    </div>
  {/if}
</nav>
