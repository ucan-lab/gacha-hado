<script lang="ts">
  import { IconUser, IconUsers, IconUsersGroup, IconFlame, IconBolt } from '@tabler/icons-svelte';
  import * as m from '$lib/paraglide/messages';
  import Seo from '$lib/components/Seo.svelte';
</script>

<Seo />

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
        class="menu-btn bg-mode-solo text-mode-text hover:bg-mode-solo-hover neon:shadow-glow"
      >
        <IconUser />
        <span>{m.solo()}</span>
      </a>
      <a
        aria-label={m.duo()}
        href="/duo"
        class="menu-btn bg-mode-duo text-mode-text hover:bg-mode-duo-hover neon:shadow-glow"
      >
        <IconUsers />
        <span>{m.duo()}</span>
      </a>
      <a
        aria-label={m.trio()}
        href="/trio"
        class="menu-btn bg-mode-trio text-mode-text hover:bg-mode-trio-hover neon:shadow-glow"
      >
        <IconUsersGroup />
        <span>{m.trio()}</span>
      </a>
    </div>
  </section>

  <section class="bg-secondary mt-6 mb-6">
    <div class="flex flex-wrap justify-center gap-4">
      <a
        aria-label={m.fullAttacker()}
        href="/full-attacker"
        class="menu-btn bg-mode-full-attacker text-mode-text hover:bg-mode-full-attacker-hover neon:shadow-glow"
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
        class="menu-btn bg-mode-gachi text-mode-text hover:bg-mode-gachi-hover neon:shadow-glow"
      >
        <IconBolt />
        <span>{m.gachiMatch()}</span>
      </a>
    </div>
  </section>
</div>

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
