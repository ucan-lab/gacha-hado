<script>
  export let title = 'HADO Randomizer';
  let menuOpen = false;

  const toggleMenu = () => {
    menuOpen = !menuOpen;
  };
</script>

<nav class="flex items-center justify-between bg-gray-900 p-4 text-white shadow-md">
  <a href="/" class="text-xl font-bold hover:underline">
    {title}
  </a>

  <button
    class="flex items-center rounded border border-gray-400 px-3 py-2 text-white hover:border-gray-300 hover:text-gray-300 md:hidden"
    on:click={toggleMenu}
  >
    <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <title>Menu</title>
      <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
    </svg>
  </button>

  <div class="hidden space-x-4 md:flex">
    <a href="/" class="hover:underline">Top</a>
    <span class="h-6 border-l border-gray-600"></span>
    <a href="/solo" class="hover:underline">Solo</a>
    <a href="/duo" class="hover:underline">Duo</a>
    <a href="/trio" class="hover:underline">Trio</a>
    <span class="h-6 border-l border-gray-600"></span>
    <a href="/probability-table" class="hover:underline">Probability</a>
  </div>

  {#if menuOpen}
    <div class="absolute right-4 top-14 z-10 rounded bg-gray-800 p-4 shadow-lg md:hidden">
      <a href="/" class="block rounded px-4 py-2 hover:bg-gray-700">Top</a>
      <hr class="my-2 border-gray-600" />
      <a href="/solo" class="block rounded px-4 py-2 hover:bg-gray-700">Solo</a>
      <a href="/duo" class="block rounded px-4 py-2 hover:bg-gray-700">Duo</a>
      <a href="/trio" class="block rounded px-4 py-2 hover:bg-gray-700">Trio</a>
      <hr class="my-2 border-gray-600" />
      <a href="/probability-table" class="block rounded px-4 py-2 hover:bg-gray-700"
        >Probability Table</a
      >
    </div>
  {/if}
</nav>

<style>
  .z-10 {
    z-index: 10;
  }
</style>
