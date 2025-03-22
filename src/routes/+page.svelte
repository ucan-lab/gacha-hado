<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import {
    IconUser,
    IconUsers,
    IconUsersGroup,
    IconQrcode,
    IconClipboardText,
    IconClipboardCheck,
    IconFlame
  } from '@tabler/icons-svelte';
  import QrCode from '$lib/assets/qr-code.jpg';
  import * as m from '$lib/paraglide/messages';

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
</script>

<Header />

<div class="flex min-h-screen flex-col">
  <section class="flex flex-col items-center justify-center py-10">
    <h1 class="mb-6 text-center text-4xl font-bold sm:text-5xl">{m.appName()}</h1>
    <p class="text-md text-center">{m.welcome()}</p>
    <p class="text-md mb-6 text-center">{m.attention()}</p>
    <p class="text-md mb-6 text-center">{m.select()}</p>

    <div class="flex flex-wrap justify-center gap-4">
      <a
        aria-label={m.solo()}
        href="/solo"
        class="menu-btn bg-blue-500 text-white hover:bg-blue-600"
      >
        <IconUser />
        <span>{m.solo()}</span>
      </a>
      <a
        aria-label={m.duo()}
        href="/duo"
        class="menu-btn bg-green-500 text-white hover:bg-green-600"
      >
        <IconUsers />
        <span>{m.duo()}</span>
      </a>
      <a aria-label={m.trio()} href="/trio" class="menu-btn bg-red-500 text-white hover:bg-red-600">
        <IconUsersGroup />
        <span>{m.trio()}</span>
      </a>
    </div>
  </section>

  <section class="py-4">
    <div class="text-center">
      <div class="flex flex-wrap justify-center gap-4">
        <a
          aria-label={m.fullAtacker()}
          href="/full-atacker"
          class="menu-btn bg-yellow-600 text-white hover:bg-yellow-700"
        >
          <IconFlame />
          <span>{m.fullAtacker()}</span>
        </a>
      </div>
    </div>
  </section>

  <section class="py-4">
    <div class="text-center">
      <h2 class="mb-4 text-2xl font-bold">{m.share()}</h2>
      <div class="flex flex-col items-center gap-4">
        <button
          aria-label={m.showQrCode()}
          on:click={toggleModal}
          class="flex cursor-pointer items-center gap-2 rounded bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
        >
          <IconQrcode />
          {m.showQrCode()}
        </button>
        <button
          aria-label={m.copyLinkToClipboard()}
          on:click={copyLink}
          class="flex cursor-pointer items-center gap-2 rounded bg-yellow-600 px-6 py-3 font-semibold text-white hover:bg-yellow-700"
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
  <div class="fixed inset-0 z-10 flex items-center justify-center bg-black">
      <div class="rounded-lg">
        <h3 class="mb-4 text-xl font-bold text-white">{m.QrCode()}</h3>
        <img src={QrCode} alt="QR Code" class="mb-4 h-64 w-64" />
        <button
          aria-label={m.close()}
          on:click={toggleModal}
          class="mt-4 cursor-pointer rounded bg-red-500 px-6 py-2 text-white hover:bg-red-600"
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
