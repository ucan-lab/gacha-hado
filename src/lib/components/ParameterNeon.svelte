<script lang="ts">
  export let name: string;
  export let value: number;
  export let color: string;

  const SEGMENTS = 5;
</script>

<div class="row" style:--param={color}>
  <span class="name">{name}</span>
  <div class="gauge" aria-hidden="true">
    <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
    {#each Array(SEGMENTS).fill(0) as _, index (index)}
      <span class="segment" class:filled={index < value}></span>
    {/each}
  </div>
  <span class="value">{value}</span>
</div>

<style>
  .row {
    display: grid;
    grid-template-columns: 4.25rem 1fr 1.25rem;
    align-items: center;
    gap: 0.5rem;
  }

  .name {
    color: var(--text-secondary-color);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .gauge {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.25rem;
  }

  .segment {
    height: 0.75rem;
    border: 1px solid color-mix(in srgb, var(--param) 25%, transparent);
    border-radius: 9999px;
    background-color: var(--gauge-empty);
  }

  .segment.filled {
    border-color: var(--param);
    background-color: var(--param);
    box-shadow: 0 0 6px color-mix(in srgb, var(--param) 70%, transparent);
  }

  .value {
    color: var(--gauge-text);
    font-size: 1rem;
    font-weight: 700;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
</style>
