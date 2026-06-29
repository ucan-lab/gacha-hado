<script lang="ts">
  import {
    IconInfoCircle,
    IconNote,
    IconSettings,
    IconUsers,
    IconUsersGroup
  } from '@tabler/icons-svelte';
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

    <h1 class="mb-8 text-center text-3xl font-bold">{m.navAbout()}</h1>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <a
        href="/about/what-is-hado"
        class="bg-secondary flex flex-col items-center rounded-lg p-6 shadow-lg transition-transform hover:scale-105"
      >
        <IconInfoCircle class="mb-4 h-12 w-12 text-blue-500" />
        <h2 class="text-primary mb-2 text-xl font-bold">{m.navWhatIsHado()}</h2>
        <p class="text-secondary text-center">{m.aboutWhatIsHadoDesc()}</p>
      </a>

      <a
        href="/about/rules"
        class="bg-secondary flex flex-col items-center rounded-lg p-6 shadow-lg transition-transform hover:scale-105"
      >
        <IconNote class="mb-4 h-12 w-12 text-green-500" />
        <h2 class="text-primary mb-2 text-xl font-bold">{m.navRules()}</h2>
        <p class="text-secondary text-center">{m.aboutRulesDesc()}</p>
      </a>

      <a
        href="/about/parameters"
        class="bg-secondary flex flex-col items-center rounded-lg p-6 shadow-lg transition-transform hover:scale-105"
      >
        <IconSettings class="mb-4 h-12 w-12 text-purple-500" />
        <h2 class="text-primary mb-2 text-xl font-bold">{m.navParameters()}</h2>
        <p class="text-secondary text-center">{m.aboutParametersDesc()}</p>
      </a>

      <a
        href="/about/roles"
        class="bg-secondary flex flex-col items-center rounded-lg p-6 shadow-lg transition-transform hover:scale-105"
      >
        <IconUsers class="mb-4 h-12 w-12 text-red-500" />
        <h2 class="text-primary mb-2 text-xl font-bold">{m.navRoles()}</h2>
        <p class="text-secondary text-center">{m.aboutRolesDesc()}</p>
      </a>

      <a
        href="/about/formation"
        class="bg-secondary flex flex-col items-center rounded-lg p-6 shadow-lg transition-transform hover:scale-105"
      >
        <IconUsersGroup class="mb-4 h-12 w-12 text-yellow-500" />
        <h2 class="text-primary mb-2 text-xl font-bold">{m.navFormation()}</h2>
        <p class="text-secondary text-center">{m.aboutFormationDesc()}</p>
      </a>
    </div>
  </div>
</div>
