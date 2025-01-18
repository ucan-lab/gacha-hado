<script lang="ts">
  import { parameterPatterns } from '$lib/parameterPatterns';
  import Header from '../components/Header.svelte';
  import Footer from '../components/Footer.svelte';

  type TableRow = {
    parameter: string;
    weight: number;
    probability: number;
  };

  const totalWeight = parameterPatterns.reduce((sum, item) => sum + item.weight, 0);

  let probabilityTable: TableRow[] = parameterPatterns.map((item) => ({
    parameter: item.parameter,
    weight: item.weight,
    probability: parseFloat(((item.weight / totalWeight) * 100).toFixed(2))
  }));

  let sortKey: keyof TableRow = 'parameter';
  let sortDirection: 'asc' | 'desc' = 'asc';

  function sortTable(key: keyof TableRow) {
    if (sortKey === key) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey = key;
      sortDirection = 'asc';
    }

    probabilityTable = probabilityTable.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
  }
</script>

<svelte:head>
  <title>Parameter Probability Table</title>
</svelte:head>

<Header />

<div class="container mx-auto mt-8 p-4 text-center text-white">
  <h1 class="mb-6 text-2xl font-bold">Parameter Probability Table</h1>

  <table class="w-full table-auto border-collapse border border-gray-700 text-sm">
    <thead>
      <tr class="bg-gray-800">
        <th
          class="cursor-pointer border border-gray-700 px-4 py-2 hover:bg-gray-700"
          on:click={() => sortTable('parameter')}
        >
          Parameter
          {#if sortKey === 'parameter'}
            {sortDirection === 'asc' ? ' ↑' : ' ↓'}
          {/if}
        </th>
        <th
          class="weight cursor-pointer border border-gray-700 px-4 py-2 hover:bg-gray-700"
          on:click={() => sortTable('weight')}
        >
          Weight
          {#if sortKey === 'weight'}
            {sortDirection === 'asc' ? ' ↑' : ' ↓'}
          {/if}
        </th>
        <th
          class="cursor-pointer border border-gray-700 px-4 py-2 hover:bg-gray-700"
          on:click={() => sortTable('probability')}
        >
          Probability
          {#if sortKey === 'probability'}
            {sortDirection === 'asc' ? ' ↑' : ' ↓'}
          {/if}
        </th>
      </tr>
    </thead>
    <tbody>
      {#each probabilityTable as row}
        <tr class="odd:bg-gray-900 even:bg-gray-800">
          <td class="border border-gray-700 px-4 py-2">{row.parameter}</td>
          <td class="border border-gray-700 px-4 py-2">{row.weight}</td>
          <td class="border border-gray-700 px-4 py-2">{row.probability}%</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<Footer />

<style>
  table {
    margin: auto;
    max-width: 400px;
  }

  th,
  td {
    text-align: center;
  }

  th {
    position: sticky;
    top: 0;
    background-color: #2d2d2d;
    z-index: 1;
  }

  th:nth-child(2),
  td:nth-child(2) {
    width: 100px;
  }
</style>
