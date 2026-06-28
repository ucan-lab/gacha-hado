<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { IconUser, IconUsers, IconUsersGroup, IconFlame, IconBolt } from '@tabler/icons-svelte';
  import * as m from '$lib/paraglide/messages';
</script>

<Header />

<div class="bg-secondary flex min-h-screen flex-col">
  <section class="bg-primary flex flex-col items-center justify-center py-6">
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

  <section class="bg-secondary mt-6 mb-6">
    <div class="flex flex-wrap justify-center gap-4">
      <a
        aria-label={m.fullAttacker()}
        href="/full-atacker"
        class="menu-btn bg-sky-600 text-white hover:bg-sky-700"
      >
        <IconFlame />
        <span>{m.fullAttacker()}</span>
      </a>
    </div>
  </section>

  <section class="bg-secondary mb-6">
    <div class="flex flex-wrap justify-center gap-4">
      <a
        aria-label={m.gachiMatch()}
        href="/gachi"
        class="menu-btn bg-yellow-600 text-white hover:bg-yellow-700"
      >
        <IconBolt />
        <span>{m.gachiMatch()}</span>
      </a>
    </div>
  </section>
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
