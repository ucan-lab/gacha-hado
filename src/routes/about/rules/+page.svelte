<script lang="ts">
  import UnderConstruction from '$lib/components/UnderConstruction.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import { buildBreadcrumb } from '$lib/breadcrumb';
  import { page } from '$app/state';
  import * as m from '$lib/paraglide/messages';
</script>

<div class="bg-primary flex min-h-screen flex-col">
  <div class="container mx-auto p-4">
    <Breadcrumb items={buildBreadcrumb(page.url.pathname)} />

    <UnderConstruction />

    <h1 class="mb-8 text-center text-3xl font-bold">{m.navRules()}</h1>

    <div class="prose mx-auto max-w-3xl">
      <h2 class="mb-4 text-2xl font-bold">{m.rulesBasicTitle()}</h2>
      <ul class="mb-6 list-disc pl-6">
        <li>{m.rulesBasic1()}</li>
        <li>{m.rulesBasic2()}</li>
        <li>{m.rulesBasic3()}</li>
        <li>
          {m.rulesBasic4()}
          <ul>
            <li>{m.rulesBasic4Item1()}</li>
            <li>{m.rulesBasic4Item2()}</li>
          </ul>
        </li>
      </ul>

      <h2 class="mb-4 text-2xl font-bold">{m.rulesAttackTitle()}</h2>
      <ul class="mb-6 list-disc pl-6">
        <li>{m.rulesAttack1()}</li>
        <li>{m.rulesAttack2()}</li>
        <li>{m.rulesAttack3()}</li>
        <li>{m.rulesAttack4()}</li>
        <li>{m.rulesAttack5()}</li>
      </ul>

      <h2 class="mb-4 text-2xl font-bold">{m.rulesDefenseTitle()}</h2>
      <ul class="mb-6 list-disc pl-6">
        <li>{m.rulesDefense1()}</li>
        <li>{m.rulesDefense2()}</li>
        <li>{m.rulesDefense3()}</li>
        <li>{m.rulesDefense4()}</li>
        <li>{m.rulesDefense5()}</li>
        <li>{m.rulesDefense6()}</li>
        <li>{m.rulesDefense7()}</li>
      </ul>
    </div>
  </div>
</div>
