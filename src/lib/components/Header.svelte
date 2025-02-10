<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { IconMenu2 } from '@tabler/icons-svelte';
  import * as m from '$lib/paraglide/messages';

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

  const handleLinkClick = () => {
    menuOpen = false;
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

  <button
    aria-label={m.menu()}
    class="flex cursor-pointer items-center rounded border border-gray-400 px-2 py-1 text-white hover:border-gray-300 hover:text-gray-300 md:hidden"
    on:click={toggleMenu}
  >
    <IconMenu2 />
  </button>

  <div class="hidden gap-4 md:flex">
    <a aria-label={m.top()} href="/" class="hover:underline">{m.top()}</a>
    <span class="h-6 border-l border-gray-600"></span>
    <a aria-label={m.solo()} href="/solo" class="hover:underline">{m.solo()}</a>
    <a aria-label={m.duo()} href="/duo" class="hover:underline">{m.duo()}</a>
    <a aria-label={m.trio()} href="/trio" class="hover:underline">{m.trio()}</a>
    <span class="h-6 border-l border-gray-600"></span>
    <a aria-label={m.dropRateTable()} href="/drop-rate" class="hover:underline"
      >{m.dropRateTable()}</a
    >
  </div>

  {#if menuOpen}
    <div
      class="menu-container absolute top-14 right-4 z-10 rounded bg-gray-800 p-4 shadow-lg md:hidden"
    >
      <a
        aria-label={m.top()}
        href="/"
        class="block rounded px-4 py-2 hover:bg-gray-700"
        on:click={handleLinkClick}
      >
        {m.top()}
      </a>
      <hr class="my-2 border-gray-600" />
      <a
        aria-label={m.solo()}
        href="/solo"
        class="block rounded px-4 py-2 hover:bg-gray-700"
        on:click={handleLinkClick}
      >
        {m.solo()}
      </a>
      <a
        aria-label={m.duo()}
        href="/duo"
        class="block rounded px-4 py-2 hover:bg-gray-700"
        on:click={handleLinkClick}
      >
        {m.duo()}
      </a>
      <a
        aria-label={m.trio()}
        href="/trio"
        class="block rounded px-4 py-2 hover:bg-gray-700"
        on:click={handleLinkClick}
      >
        {m.trio()}
      </a>
      <hr class="my-2 border-gray-600" />
      <a
        aria-label={m.dropRateTable()}
        href="/drop-rate"
        class="block rounded px-4 py-2 hover:bg-gray-700"
        on:click={handleLinkClick}
      >
        {m.dropRateTable()}
      </a>
    </div>
  {/if}
</nav>

<style>
  .z-10 {
    z-index: 10;
  }
</style>
