<script lang="ts">
  import UnderConstruction from '$lib/components/UnderConstruction.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { buildBreadcrumb } from '$lib/breadcrumb';
  import { page } from '$app/state';
  import * as m from '$lib/paraglide/messages';
</script>

<Seo title={m.rolesTitle()} description={m.rolesDescription()} />

<div class="bg-primary flex min-h-screen flex-col">
  <div class="container mx-auto p-4">
    <Breadcrumb items={buildBreadcrumb(page.url.pathname)} />

    <UnderConstruction />

    <h1 class="mb-8 text-center text-3xl font-bold">{m.rolesPageTitle()}</h1>

    <div class="prose mx-auto max-w-3xl">
      <div class="mb-8 rounded-lg bg-gray-100 p-6">
        <h2 class="mb-4 text-xl font-bold">{m.rolesBasicTitle()}</h2>
        <p class="mb-4">
          {m.rolesBasicDesc()}
        </p>
      </div>

      <div class="mb-8">
        <h2 class="mb-4 text-2xl font-bold">{m.rolesAttackerTitle()}</h2>
        <div class="rounded-lg border p-6">
          <h3 class="mb-2 text-xl font-semibold">{m.rolesFeatureTitle()}</h3>
          <ul class="mb-4 list-disc pl-6">
            <li>{m.rolesAttackerFeature1()}</li>
            <li>{m.rolesAttackerFeature2()}</li>
            <li>{m.rolesAttackerFeature3()}</li>
          </ul>

          <h3 class="mb-2 text-xl font-semibold">{m.rolesRecommendedParamsTitle()}</h3>
          <ul class="mb-4 list-disc pl-6">
            <li>
              {m.rolesAttackerParam1()}
            </li>
            <li>{m.rolesAttackerParam2()}</li>
            <li>{m.rolesAttackerParam3()}</li>
            <li>
              {m.rolesAttackerParam4()}
            </li>
          </ul>

          <h3 class="mb-2 text-xl font-semibold">{m.rolesStrategyTitle()}</h3>
          <ul class="list-disc pl-6">
            <li>{m.rolesAttackerStrategy1()}</li>
            <li>{m.rolesAttackerStrategy2()}</li>
            <li>{m.rolesAttackerStrategy3()}</li>
          </ul>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="mb-4 text-2xl font-bold">{m.rolesDefenderTitle()}</h2>
        <div class="rounded-lg border p-6">
          <h3 class="mb-2 text-xl font-semibold">{m.rolesFeatureTitle()}</h3>
          <ul class="mb-4 list-disc pl-6">
            <li>{m.rolesDefenderFeature1()}</li>
            <li>{m.rolesDefenderFeature2()}</li>
            <li>{m.rolesDefenderFeature3()}</li>
            <li>{m.rolesDefenderFeature4()}</li>
          </ul>

          <h3 class="mb-2 text-xl font-semibold">{m.rolesRecommendedParamsTitle()}</h3>
          <ul class="mb-4 list-disc pl-6">
            <li>{m.rolesDefenderParam1()}</li>
            <li>{m.rolesDefenderParam2()}</li>
          </ul>

          <h3 class="mb-2 text-xl font-semibold">{m.rolesStrategyTitle()}</h3>
          <ul class="list-disc pl-6">
            <li>{m.rolesDefenderStrategy1()}</li>
            <li>{m.rolesDefenderStrategy2()}</li>
            <li>{m.rolesDefenderStrategy3()}</li>
          </ul>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="mb-4 text-2xl font-bold">{m.rolesChargerTitle()}</h2>
        <div class="rounded-lg border p-6">
          <h3 class="mb-2 text-xl font-semibold">{m.rolesFeatureTitle()}</h3>
          <ul class="mb-4 list-disc pl-6">
            <li>{m.rolesChargerFeature1()}</li>
            <li>{m.rolesChargerFeature2()}</li>
            <li>{m.rolesChargerFeature3()}</li>
          </ul>

          <h3 class="mb-2 text-xl font-semibold">{m.rolesRecommendedParamsTitle()}</h3>
          <ul class="mb-4 list-disc pl-6">
            <li>{m.rolesChargerParam1()}</li>
            <li>
              {m.rolesChargerParam2()}
            </li>
          </ul>

          <h3 class="mb-2 text-xl font-semibold">{m.rolesStrategyTitle()}</h3>
          <ul class="list-disc pl-6">
            <li>{m.rolesChargerStrategy1()}</li>
            <li>{m.rolesChargerStrategy2()}</li>
            <li>{m.rolesChargerStrategy3()}</li>
          </ul>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="mb-4 text-2xl font-bold">{m.rolesTechnicianTitle()}</h2>
        <div class="rounded-lg border p-6">
          <h3 class="mb-2 text-xl font-semibold">{m.rolesFeatureTitle()}</h3>
          <ul class="mb-4 list-disc pl-6">
            <li>{m.rolesTechnicianFeature1()}</li>
            <li>{m.rolesTechnicianFeature2()}</li>
            <li>{m.rolesTechnicianFeature3()}</li>
          </ul>

          <h3 class="mb-2 text-xl font-semibold">{m.rolesTechnicianParamsTitle()}</h3>
          <ul class="mb-4 list-disc pl-6">
            <li>{m.rolesTechnicianParam1()}</li>
            <li>{m.rolesTechnicianParam2()}</li>
            <li>{m.rolesTechnicianParam3()}</li>
            <li>{m.rolesTechnicianParam4()}</li>
          </ul>

          <h3 class="mb-2 text-xl font-semibold">{m.rolesStrategyTitle()}</h3>
          <ul class="list-disc pl-6">
            <li>{m.rolesTechnicianStrategy1()}</li>
            <li>{m.rolesTechnicianStrategy2()}</li>
            <li>{m.rolesTechnicianStrategy3()}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
