<script lang="ts">
  export let name: string;
  export let value: number;
  export let color: string;
</script>

<div
  class="relative flex w-20 flex-col items-center bg-gauge neon:glass rounded px-2 pt-2 pb-1 shadow-lg sm:w-28"
>
  <div class="relative mb-1 flex w-full flex-col-reverse gap-1">
    <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
    {#each Array(5).fill(0) as _, index (index)}
      <div
        class="h-7 rounded"
        style="background-color: {index < value ? color : 'var(--gauge-empty)'}"
      ></div>
    {/each}
    <div
      class="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full border-2 text-gauge-text text-xl font-bold"
      style="width: var(--circle-size); height: var(--circle-size); border-color: {color}; background-color: var(--gauge-value-bg);"
    >
      {value}
    </div>
  </div>
  <p>
    <span style="color: {color}">{name}</span>
  </p>
</div>

<style>
  :root {
    --circle-size: 3rem;
  }
</style>
