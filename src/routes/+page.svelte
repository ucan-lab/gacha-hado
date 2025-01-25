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

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-4 text-white">
  <h1 class="mb-6 text-center text-3xl font-bold sm:text-4xl">{m.appName()}</h1>

  <p class="mb-8 max-w-md text-center">
    {m.welcome()}
  </p>

  <div class="mb-4 flex flex-row gap-2">
    <a
      href="/solo"
      class="flex items-center gap-1 rounded bg-blue-500 px-6 py-3 font-semibold whitespace-nowrap hover:bg-blue-600"
    >
      <IconUser />
      <span>{m.solo()}</span>
    </a>

    <a
      href="/duo"
      class="flex items-center gap-1 rounded bg-green-500 px-6 py-3 font-semibold whitespace-nowrap hover:bg-green-600"
    >
      <IconUsers />
      <span>{m.duo()}</span>
    </a>

    <a
      href="/trio"
      class="flex items-center gap-1 rounded bg-red-500 px-6 py-3 font-semibold whitespace-nowrap hover:bg-red-600"
    >
      <IconUsersGroup />
      <span>{m.trio()}</span>
    </a>
  </div>

  <h2 class="my-4 text-2xl font-bold">ガチガチャ</h2>

  <div class="mb-4 flex flex-row gap-2">
    <a
      href="/gachi/solo"
      class="flex items-center gap-1 rounded bg-blue-500 px-6 py-3 font-semibold whitespace-nowrap hover:bg-blue-600"
    >
      <IconUser />
      <span>{m.solo()}</span>
    </a>

    <a
      href="/gachi/duo"
      class="flex items-center gap-1 rounded bg-green-500 px-6 py-3 font-semibold whitespace-nowrap hover:bg-green-600"
    >
      <IconUsers />
      <span>{m.duo()}</span>
    </a>

    <a
      href="/gachi/trio"
      class="flex items-center gap-1 rounded bg-red-500 px-6 py-3 font-semibold whitespace-nowrap hover:bg-red-600"
    >
      <IconUsersGroup />
      <span>{m.trio()}</span>
    </a>
  </div>

  <h2 class="my-4 text-2xl font-bold">{m.dropRate()}</h2>

  <a
    href="/drop-rate"
    class="flex items-center gap-1 rounded bg-purple-500 px-6 py-3 font-semibold hover:bg-purple-600"
  >
    <IconTable />
    <span>{m.dropRateTable()}</span>
  </a>

  <h2 class="my-4 text-2xl font-bold">{m.share()}</h2>

  <div class="flex flex-col items-center">
    <button
      on:click={toggleModal}
      class="mb-4 flex items-center gap-1 rounded bg-orange-500 px-6 py-3 font-semibold hover:bg-orange-600"
    >
      <IconQrcode />
      <span>{m.showQrCode()}</span>
    </button>
    <button
      on:click={copyLink}
      class="flex items-center gap-1 rounded bg-yellow-500 px-6 py-3 font-semibold hover:bg-yellow-600"
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

{#if showModal}
  <div class="bg-opacity-50 fixed inset-0 z-10 flex items-center justify-center bg-black">
    <div class="rounded-lg bg-white p-6">
      <h3 class="mb-4 text-xl font-bold">{m.QrCode()}</h3>
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

<Footer />
