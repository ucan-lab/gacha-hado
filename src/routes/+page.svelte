<script>
  import { parameters, generateRandomParameters, resetParameters } from './stores/parameters';
  import ParameterList from './components/ParameterList.svelte';

  const colors = {
    bulletSpeed: '#ED9E38',
    bulletScale: '#74F74B',
    chargeSpeed: '#DD32F6',
    shieldStrength: '#6FEEF9'
  };
</script>

<div class="flex flex-col items-center p-4">
  <ParameterList {colors} {parameters} />

  <div class="mt-4 flex w-full max-w-lg gap-4">
    <button
      class="flex-1 rounded bg-green-500 px-6 py-3 font-bold text-white hover:bg-green-600"
      on:click={generateRandomParameters}
    >
      Randomize
    </button>
    <button
      class="flex-1 rounded bg-red-500 px-6 py-3 font-bold text-white hover:bg-red-600"
      on:click={resetParameters}
    >
      Reset
    </button>
  </div>
</div>
