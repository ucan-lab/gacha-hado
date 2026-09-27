<script lang="ts">
  let {
    checked = $bindable(false),
    label,
    disabled = false,
    class: className = ''
  }: {
    checked?: boolean;
    label: string;
    disabled?: boolean;
    class?: string;
  } = $props();
</script>

<label
  class="flex items-center justify-between gap-3 {disabled
    ? 'cursor-not-allowed opacity-50'
    : 'cursor-pointer'} {className}"
>
  <span>{label}</span>
  <!-- 見た目はスイッチに差し替えるが、キーボード操作と読み上げはネイティブの checkbox に任せる -->
  <input type="checkbox" role="switch" class="peer sr-only" bind:checked {disabled} />
  <span
    aria-hidden="true"
    class="bg-switch-off peer-checked:bg-cta neon:peer-checked:shadow-glow peer-focus-visible:outline-cta relative inline-flex h-6 w-10 shrink-0 items-center rounded-full transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-checked:*:translate-x-4 motion-reduce:transition-none motion-reduce:*:transition-none"
  >
    <span class="absolute left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform"
    ></span>
  </span>
</label>
