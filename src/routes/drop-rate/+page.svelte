<script lang="ts">
  import { parameterPatterns } from '$lib/utils/parameterPatterns';
  import { buildDropRateTable, sortDropRateRows } from '$lib/utils/dropRate';
  import type { DropRateRow, SortKey } from '$lib/utils/dropRate';
  import Seo from '$lib/components/Seo.svelte';
  import * as m from '$lib/paraglide/messages';

  let dropRateTable: DropRateRow[] = buildDropRateTable(parameterPatterns);

  let sortKey: SortKey = 'parameter';
  let sortDirection: 'asc' | 'desc' = 'asc';

  function sortTable(key: SortKey) {
    if (sortKey === key) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey = key;
      sortDirection = 'asc';
    }

    dropRateTable = sortDropRateRows(dropRateTable, key, sortDirection);
  }

  function ariaSort(key: SortKey): 'ascending' | 'descending' | 'none' {
    if (sortKey !== key) return 'none';
    return sortDirection === 'asc' ? 'ascending' : 'descending';
  }
</script>

<Seo title={m.dropRateTitle()} description={m.dropRateDescription()} />

<div class="container mx-auto p-4 text-center">
  <h1 class="mb-6 text-2xl font-bold">{m.dropRateTable()}</h1>

  <div class="flex max-w-full justify-center overflow-x-auto">
    <table class="mx-auto w-full max-w-md table-auto text-sm">
      <thead>
        <tr>
          <th class="sticky top-0 z-10" aria-sort={ariaSort('parameter')}>
            <button
              type="button"
              class="flex w-full cursor-pointer items-center justify-center gap-1 px-4 py-2 font-bold"
              on:click={() => sortTable('parameter')}
            >
              {m.parameter()}
              {#if sortKey === 'parameter'}
                <span aria-hidden="true">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              {/if}
            </button>
          </th>
          <th class="sticky top-0 z-10" aria-sort={ariaSort('weight')}>
            <button
              type="button"
              class="flex w-full cursor-pointer items-center justify-center gap-1 px-4 py-2 font-bold"
              on:click={() => sortTable('weight')}
            >
              {m.weight()}
              {#if sortKey === 'weight'}
                <span aria-hidden="true">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              {/if}
            </button>
          </th>
          <th class="sticky top-0 z-10" aria-sort={ariaSort('dropRate')}>
            <button
              type="button"
              class="flex w-full cursor-pointer items-center justify-center gap-1 px-4 py-2 font-bold"
              on:click={() => sortTable('dropRate')}
            >
              {m.dropRate()}
              {#if sortKey === 'dropRate'}
                <span aria-hidden="true">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              {/if}
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {#each dropRateTable as row (row.parameter)}
          <tr>
            <td class="px-4 py-2">{row.parameter}</td>
            <td class="px-4 py-2">{row.weight}</td>
            <td class="px-4 py-2">{row.dropRate}%</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  th {
    top: 0;
    z-index: 1;
  }
  th:nth-child(2),
  td:nth-child(2) {
    width: 100px;
  }
</style>
