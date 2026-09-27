<script lang="ts">
  export let isVisible = false;
</script>

{#if isVisible}
  <div class="overlay">
    <div class="spinner"></div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--overlay);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
  }

  .spinner {
    border: 6px solid var(--spinner-track);
    border-top-color: var(--spinner-head);
    border-radius: 50%;
    width: 7rem;
    height: 7rem;
    animation: spin 1s linear infinite;
  }

  :global([data-theme='neon']) .overlay {
    backdrop-filter: blur(4px);
  }

  :global([data-theme='neon']) .spinner {
    border-right-color: var(--player-2);
    filter: drop-shadow(0 0 8px var(--spinner-head)) drop-shadow(0 0 20px var(--glow));
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
