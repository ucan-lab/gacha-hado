<script>
  import Footer from './components/Footer.svelte';
  import QrCode from '$lib/assets/qr-code.jpg';
  import * as m from '$lib/paraglide/messages';

  let copied = false;
  let showModal = false;

  function copyLink() {
    const link = 'https://hado-randomizer.vercel.app';
    navigator.clipboard.writeText(link).then(() => {
      copied = true;
      setTimeout(() => (copied = false), 2000);
    });
  }

  function toggleModal() {
    showModal = !showModal;
  }
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-4 text-white">
  <h1 class="mb-6 text-center text-3xl font-bold sm:text-4xl">HADO Randomizer</h1>

  <p class="mb-8 max-w-md text-center">
    {@html m.welcome()}
  </p>

  <div class="mb-4 flex flex-row gap-4">
    <a
      href="/solo"
      class="flex items-center gap-2 rounded bg-blue-500 px-6 py-3 font-semibold hover:bg-blue-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
      <span>{m.solo()}</span>
    </a>

    <a
      href="/duo"
      class="flex items-center gap-2 rounded bg-green-500 px-6 py-3 font-semibold hover:bg-green-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
        />
      </svg>
      <span>{m.duo()}</span>
    </a>

    <a
      href="/trio"
      class="flex items-center gap-2 rounded bg-red-500 px-6 py-3 font-semibold hover:bg-red-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        />
      </svg>
      <span>{m.trio()}</span>
    </a>
  </div>

  <h2 class="mb-4 text-3xl font-bold">{m.share()}</h2>

  <div class="flex flex-col items-center">
    <button
      on:click={toggleModal}
      class="mb-4 rounded bg-orange-500 px-6 py-3 font-semibold hover:bg-orange-600"
    >
      {m.showQrCode()}
    </button>
    <button
      on:click={copyLink}
      class="rounded bg-yellow-500 px-6 py-3 font-semibold hover:bg-yellow-600"
    >
      {#if copied}
        {m.linkCopied()}
      {:else}
        {m.copyLinkToClipboard()}
      {/if}
    </button>
  </div>
</div>

{#if showModal}
  <div class="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
    <div class="rounded-lg bg-white p-6">
      <h3 class="mb-4 text-xl font-bold">{m.QrCode()}</h3>
      <img src={QrCode} alt="QR Code" class="mb-4 h-64 w-64" />
      <button
        on:click={toggleModal}
        class="mt-4 rounded bg-red-500 px-6 py-2 text-white hover:bg-red-600"
      >
        Close
      </button>
    </div>
  </div>
{/if}

<Footer />
