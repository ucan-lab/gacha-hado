<script lang="ts">
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { page } from '$app/state';
  let { children } = $props();
</script>

<!-- 内容が短いページでもフッターを画面下端に付けるため、ページ部分に残りの高さを割り当てる -->
<div class="flex min-h-dvh flex-col">
  <!-- ページ遷移ごとに Header を再マウントし、メニュー等のローカル UI 状態をリセットする
       （各ページが個別に Header を持っていた頃の挙動を維持するため） -->
  {#key page.url.pathname}
    <Header />
  {/key}

  <div class="flex flex-1 flex-col">
    {@render children()}
  </div>

  <Footer />
</div>
