<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import * as m from '$lib/paraglide/messages';
  import { IconArrowLeft } from '@tabler/icons-svelte';
  import UnderConstruction from '$lib/components/UnderConstruction.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
</script>

<Header />

<div class="bg-primary flex min-h-screen flex-col">
  <div class="container mx-auto p-4">
    <Breadcrumb
      items={[
        { label: 'ホーム', href: '/' },
        { label: 'HADOについて', href: '/about' },
        { label: '編成', href: '/about/formation' }
      ]}
    />

    <UnderConstruction />
  </div>
</div>

<Footer />
