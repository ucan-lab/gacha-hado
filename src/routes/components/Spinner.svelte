<script>
  export let isVisible = false;
</script>

{#if isVisible}
  <div class="absolute inset-0 z-10 flex items-center justify-center bg-black opacity-80">
    <div class="spinner"></div>
  </div>
{/if}

<style>
  .absolute {
    position: absolute;
  }
  .inset-0 {
    top: 42%;
    left: 0;
    right: 0;
    bottom: 68%;
  }
  .z-10 {
    z-index: 10;
  }

  .spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top-color: #ffffff;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
