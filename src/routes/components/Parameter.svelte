<script>
  export let name;
  export let value;
  export let color;
</script>

<div
  class="relative flex flex-1 flex-col items-center rounded bg-zinc-900 px-4 pb-2 pt-4 shadow-lg"
>
  <div class="relative mb-1 flex w-full flex-col-reverse gap-1">
    {#each Array(5).fill(0) as _, index}
      <div class="h-7 rounded" style="background-color: {index < value ? color : '#2D2D2D'}"></div>
    {/each}
    <div
      class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full border-2 text-xl font-bold text-white"
      style="width: var(--circle-size); height: var(--circle-size); border-color: {color}; background-color: rgba(0, 0, 0, 0.3);"
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
