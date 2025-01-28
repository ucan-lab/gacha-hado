<script lang="ts">
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
  <section
    class="flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 py-10"
  >
    <h1 class="mb-4 text-center text-4xl font-bold sm:text-5xl">{m.appName()}</h1>
    <p class="mb-8 max-w-md text-center text-lg">{m.welcome()}</p>

    <div class="flex flex-wrap justify-center gap-4">
      <a aria-label={m.solo()} href="/solo" class="menu-btn bg-blue-800 hover:bg-blue-900">
        <IconUser />
        <span>{m.solo()}</span>
      </a>
      <a aria-label={m.duo()} href="/duo" class="menu-btn bg-green-700 hover:bg-green-800">
        <IconUsers />
        <span>{m.duo()}</span>
      </a>
      <a aria-label={m.trio()} href="/trio" class="menu-btn bg-red-700 hover:bg-red-800">
        <IconUsersGroup />
        <span>{m.trio()}</span>
      </a>
    </div>
  </section>

  <section class="bg-gray-800 py-10">
    <div class="text-center">
      <h2 class="mb-4 text-2xl font-bold">{m.dropRate()}</h2>
      <a
        aria-label={m.dropRateTable()}
        href="/drop-rate"
        class="inline-flex items-center gap-2 rounded bg-purple-500 px-6 py-3 font-semibold text-white hover:bg-purple-600"
      >
        <IconTable />
        {m.dropRateTable()}
      </a>
    </div>
  </section>

  <section class="bg-gray-900 py-10">
    <div class="text-center">
      <h2 class="mb-4 text-2xl font-bold">{m.share()}</h2>
      <div class="flex flex-col items-center gap-4">
        <button
          aria-label={m.showQrCode()}
          on:click={toggleModal}
          class="flex cursor-pointer items-center gap-2 rounded bg-orange-700 px-6 py-3 font-semibold hover:bg-orange-800"
        >
          <IconQrcode />
          {m.showQrCode()}
        </button>
        <button
          aria-label={m.copyLinkToClipboard()}
          on:click={copyLink}
          class="flex cursor-pointer items-center gap-2 rounded bg-yellow-700 px-6 py-3 font-semibold hover:bg-yellow-800"
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
    <div class="bg-opacity-70 fixed inset-0 z-10 flex items-center justify-center bg-black">
      <div class="rounded-lg bg-white p-6">
        <h3 class="mb-4 text-xl font-bold text-gray-800">{m.QrCode()}</h3>
        <img src={QrCode} alt="QR Code" class="mb-4 h-64 w-64" />
        <button
          aria-label={m.close()}
          on:click={toggleModal}
          class="mt-4 cursor-pointer rounded bg-red-700 px-6 py-2 text-white hover:bg-red-800"
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
