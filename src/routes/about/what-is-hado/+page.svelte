<script lang="ts">
  import UnderConstruction from '$lib/components/UnderConstruction.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { buildBreadcrumb } from '$lib/breadcrumb';
  import { page } from '$app/state';
  import * as m from '$lib/paraglide/messages';
</script>

<Seo title={m.whatIsHadoTitle()} description={m.whatIsHadoDescription()} />

<div class="bg-primary flex min-h-screen flex-col">
  <div class="container mx-auto p-4">
    <Breadcrumb items={buildBreadcrumb(page.url.pathname)} />

    <UnderConstruction />

    <h1 class="text-primary mb-8 text-center text-3xl font-bold">{m.navWhatIsHado()}</h1>

    <div class="prose mx-auto max-w-3xl">
      <p class="text-secondary mb-4">
        {m.whatIsHadoIntro()}
      </p>

      <h2 class="text-primary mb-4 text-2xl font-bold">{m.whatIsHadoFeaturesTitle()}</h2>
      <ul class="text-secondary mb-6 list-disc pl-6">
        <li>{m.whatIsHadoFeature1()}</li>
        <li>{m.whatIsHadoFeature2()}</li>
        <li>{m.whatIsHadoFeature3()}</li>
        <li>{m.whatIsHadoFeature4()}</li>
      </ul>

      <h2 class="text-primary mb-4 text-2xl font-bold">{m.whatIsHadoEquipmentTitle()}</h2>
      <ul class="text-secondary mb-6 list-disc pl-6">
        <li>{m.whatIsHadoEquipment1()}</li>
        <li>{m.whatIsHadoEquipment2()}</li>
        <li>{m.whatIsHadoEquipment3()}</li>
      </ul>

      <h2 class="text-primary mb-4 text-2xl font-bold">{m.whatIsHadoAppealTitle()}</h2>
      <p class="text-secondary mb-4">
        {m.whatIsHadoAppealDesc()}
      </p>
    </div>
  </div>
</div>
