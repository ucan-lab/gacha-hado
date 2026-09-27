<script lang="ts">
  import { IconChevronRight } from '@tabler/icons-svelte';
  import * as m from '$lib/paraglide/messages';

  export let items: { label: string; href: string }[];
</script>

<nav class="mb-4" aria-label={m.breadcrumb()}>
  <ol class="flex items-center space-x-2">
    {#each items as item, i (item.href)}
      <li class="flex items-center">
        {#if i > 0}
          <IconChevronRight class="text-muted mx-2 h-4 w-4" />
        {/if}
        {#if i === items.length - 1}
          <span class="text-muted">{item.label}</span>
        {:else}
          <a href={item.href} class="text-nav-link hover:text-nav-link-hover hover:underline">
            {item.label}
          </a>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
