<script lang="ts">
  import { IconExternalLink } from '@tabler/icons-svelte';
  import UnderConstruction from '$lib/components/UnderConstruction.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import ParameterTable from '$lib/components/ParameterTable.svelte';
  import { buildBreadcrumb } from '$lib/breadcrumb';
  import { page } from '$app/state';
  import * as m from '$lib/paraglide/messages';

  const speedTable = {
    headers: ['Lv', m.parametersSpeedTitle()],
    rows: [
      ['1', '13km/h'],
      ['2', '20km/h'],
      ['3', '27km/h'],
      ['4', '31km/h'],
      ['5', '34km/h']
    ]
  };

  const scaleTable = {
    headers: ['Lv', m.parametersSizeCol(), m.parametersLifeSizeCol()],
    rows: [
      ['1', '16cm', m.parametersLifeFraction({ n: '0.8' })],
      ['2', '22cm', m.parametersLifeFraction({ n: '1.1' })],
      ['3', '30cm', m.parametersLifeFraction({ n: '1.5' })],
      ['4', '45cm', m.parametersLifeFraction({ n: '2.25' })],
      ['5', '60cm', m.parametersLifeFraction({ n: '3' })]
    ]
  };

  const chargeTable = {
    headers: ['Lv', m.parametersChargeTimeCol(), m.parametersMatchShotsCol()],
    rows: [
      ['1', m.parametersSeconds({ n: '16' }), m.parametersShotsRange({ min: '20', max: '24' })],
      ['2', m.parametersSeconds({ n: '11' }), m.parametersShotsRange({ min: '30', max: '34' })],
      ['3', m.parametersSeconds({ n: '7.5' }), m.parametersShotsRange({ min: '40', max: '44' })],
      ['4', m.parametersSeconds({ n: '4.5' }), m.parametersShotsRange({ min: '50', max: '60' })],
      ['5', m.parametersSeconds({ n: '3' }), m.parametersShotsRange({ min: '70', max: '80' })]
    ]
  };

  const shieldTable = {
    headers: ['Lv', m.parametersShieldDurabilityCol(), m.parametersShieldDurationCol()],
    rows: [
      ['1', m.parametersShots({ n: '4' }), m.parametersSeconds({ n: '13' })],
      ['2', m.parametersShots({ n: '5' }), m.parametersSeconds({ n: '17' })],
      ['3', m.parametersShots({ n: '6' }), m.parametersSeconds({ n: '21' })],
      ['4', m.parametersShots({ n: '7' }), m.parametersSeconds({ n: '25' })],
      ['5', m.parametersShots({ n: '8' }), m.parametersSeconds({ n: '26' })]
    ]
  };
</script>

<div class="bg-primary flex min-h-screen flex-col">
  <div class="container mx-auto p-4">
    <Breadcrumb items={buildBreadcrumb(page.url.pathname)} />

    <UnderConstruction />

    <h1 class="text-primary mb-8 text-center text-3xl font-bold">{m.navParameters()}</h1>

    <div class="prose mx-auto max-w-3xl">
      <div class="bg-secondary mb-8 rounded-lg p-6">
        <h2 class="text-primary mb-4 text-xl font-bold">{m.parametersBasicTitle()}</h2>
        <ul class="text-secondary list-disc pl-6">
          <li>{m.parametersBasic1()}</li>
          <li>{m.parametersBasic2()}</li>
        </ul>
      </div>

      <div class="mb-8">
        <h2 class="text-primary mb-4 text-2xl font-bold">{m.parametersSpeedTitle()}</h2>
        <p class="text-secondary mb-4">{m.parametersSpeedDesc()}</p>
        <ParameterTable headers={speedTable.headers} rows={speedTable.rows} />
      </div>

      <div class="mb-8">
        <h2 class="text-primary mb-4 text-2xl font-bold">{m.parametersScaleTitle()}</h2>
        <p class="text-secondary mb-4">
          {m.parametersScaleDesc()}
        </p>
        <ParameterTable headers={scaleTable.headers} rows={scaleTable.rows} />
      </div>

      <div class="mb-8">
        <h2 class="text-primary mb-4 text-2xl font-bold">{m.parametersChargeTitle()}</h2>
        <p class="text-secondary mb-4">{m.parametersChargeDesc()}</p>
        <ParameterTable headers={chargeTable.headers} rows={chargeTable.rows} />
      </div>

      <div class="mb-8">
        <h2 class="text-primary mb-4 text-2xl font-bold">{m.parametersShieldTitle()}</h2>
        <p class="text-secondary mb-4">{m.parametersShieldDesc()}</p>
        <ParameterTable headers={shieldTable.headers} rows={shieldTable.rows} />
      </div>
    </div>

    <h4 class="text-primary mb-4 text-xl font-bold">{m.parametersSourceTitle()}</h4>
    <ul class="text-secondary list-disc pl-6">
      <li>
        <a
          href="https://hado-official.com/news/7778/"
          target="_blank"
          class="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
        >
          {m.parametersSource1()}
          <IconExternalLink class="ml-1 h-4 w-4" />
        </a>
      </li>
      <li>
        <a
          href="https://note.com/eieio81810/n/n044c72d8d306"
          target="_blank"
          class="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
        >
          {m.parametersSource2()}
          <IconExternalLink class="ml-1 h-4 w-4" />
        </a>
      </li>
    </ul>
  </div>
</div>
