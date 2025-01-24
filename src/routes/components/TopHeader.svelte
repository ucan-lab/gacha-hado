<script lang="ts">
  import { initializeLocale, changeLocale } from '$lib/utils/locale';
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import * as m from '$lib/paraglide/messages';

  initializeLocale();

  let menuOpen = false;

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

<nav class="pr-2 flex items-center justify-end bg-gray-900 px-2 py-1 text-white shadow-md">
  <button
    class="flex items-center rounded border border-gray-400 px-2 py-1 text-white hover:border-gray-300 hover:text-gray-300 md:hidden"
    on:click={toggleMenu}
  >
    <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <title>{m.menu()}</title>
      <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
    </svg>
  </button>

  <div class="hidden mr-4 space-x-4 md:flex">
    <button
      class="cursor-pointer hover:underline bg-transparent border-none p-0 m-0"
      on:click={() => changeLocale('ja')}
    >
      日本語
    </button>
    <span class="h-6 border-l border-gray-600"></span>
    <button
      class="cursor-pointer hover:underline bg-transparent border-none p-0 m-0"
      on:click={() => changeLocale('en')}
    >
      English
    </button>
    <span class="h-6 border-l border-gray-600"></span>
    <button
      class="cursor-pointer hover:underline bg-transparent border-none p-0 m-0"
      on:click={() => changeLocale('zh')}
    >
      中文
    </button>
  </div>

  {#if menuOpen}
    <div
      class="menu-container absolute right-4 top-14 z-10 rounded bg-gray-800 p-4 shadow-lg md:hidden"
    >
      <button
        class="cursor-pointer hover:underline bg-transparent border-none p-0 m-0"
        on:click={() => changeLocale('ja')}
      >
        日本語
      </button>
      <hr class="my-2 border-gray-600" />
      <button
        class="cursor-pointer hover:underline bg-transparent border-none p-0 m-0"
        on:click={() => changeLocale('en')}
      >
        English
      </button>
      <hr class="my-2 border-gray-600" />
      <button
        class="cursor-pointer hover:underline bg-transparent border-none p-0 m-0"
        on:click={() => changeLocale('zh')}
      >
        中文
      </button>
    </div>
  {/if}
</nav>
