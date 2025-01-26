<script>
  import TopHeader from '$lib/components/TopHeader.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import {
    IconUser,
    IconUsers,
    IconUsersGroup,
    IconTable,
    IconQrcode,
    IconClipboardText,
    IconClipboardCheck
  } from '@tabler/icons-svelte';
  import QrCode from '$lib/assets/qr-code.jpg';
  import * as m from '$lib/paraglide/messages';

  let copied = false;
  let showModal = false;

  function copyLink() {
    const link = 'https://hado-gacha.vercel.app';
    navigator.clipboard.writeText(link).then(() => {
      copied = true;
      setTimeout(() => (copied = false), 2000);
    });
  }

  function toggleModal() {
    showModal = !showModal;
  }
</script>

<TopHeader />

<div class="flex min-h-screen flex-col bg-gray-900 text-white">
  <section class="flex flex-col items-center justify-center py-16 bg-gradient-to-b from-gray-800 to-gray-900">
    <h1 class="mb-4 text-center text-4xl font-bold sm:text-5xl">{m.appName()}</h1>
    <p class="mb-8 max-w-md text-center text-lg">{m.welcome()}</p>

    <div class="flex flex-wrap justify-center gap-4">
      <a href="/solo" class="menu-btn bg-blue-500 hover:bg-blue-600">
        <IconUser />
        <span>{m.solo()}</span>
      </a>
      <a href="/duo" class="menu-btn bg-green-500 hover:bg-green-600">
        <IconUsers />
        <span>{m.duo()}</span>
      </a>
      <a href="/trio" class="menu-btn bg-red-500 hover:bg-red-600">
        <IconUsersGroup />
        <span>{m.trio()}</span>
      </a>
    </div>
  </section>

  <section class="py-10 bg-gray-800">
    <div class="text-center">
      <h2 class="mb-4 text-2xl font-bold">{m.dropRate()}</h2>
      <a
        href="/drop-rate"
        class="inline-flex items-center gap-2 rounded bg-purple-500 px-6 py-3 text-white font-semibold hover:bg-purple-600"
      >
        <IconTable />
        {m.dropRateTable()}
      </a>
    </div>
  </section>

  <section class="py-10 bg-gray-900">
    <div class="text-center">
      <h2 class="mb-4 text-2xl font-bold">{m.share()}</h2>
      <div class="flex flex-col items-center gap-4">
        <button
          on:click={toggleModal}
          class="flex items-center gap-2 rounded bg-orange-500 px-6 py-3 font-semibold hover:bg-orange-600"
        >
          <IconQrcode />
          {m.showQrCode()}
        </button>
        <button
          on:click={copyLink}
          class="flex items-center gap-2 rounded bg-yellow-500 px-6 py-3 font-semibold hover:bg-yellow-600"
        >
          {#if copied}
            <IconClipboardCheck />
            {m.linkCopied()}
          {:else}
            <IconClipboardText />
            {m.copyLinkToClipboard()}
          {/if}
        </button>
      </div>
    </div>
  </section>

  {#if showModal}
    <div class="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70">
      <div class="rounded-lg bg-white p-6">
        <h3 class="mb-4 text-xl font-bold text-gray-800">{m.QrCode()}</h3>
        <img src={QrCode} alt="QR Code" class="mb-4 h-64 w-64" />
        <button
          on:click={toggleModal}
          class="mt-4 rounded bg-red-500 px-6 py-2 text-white hover:bg-red-600"
        >
          {m.close()}
        </button>
      </div>
    </div>
  {/if}
</div>

<Footer />

<style>
  .menu-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    font-size: 1.25rem;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
</style>
