<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { releaseNotes } from './releaseNotes';
</script>

<Header />

<div class="container mx-auto p-6">
  <h1 class="mb-6 text-center text-3xl font-bold">リリースノート</h1>

  <div class="space-y-6">
    {#each releaseNotes as release (release.version)}
      <div class="bg-secondary text-seconday rounded-lg p-4 shadow-md">
        <h2 class="text-xl font-semibold">
          {release.version} <span class="text-sm">({release.date})</span>
        </h2>
        <ul class="mt-2 list-none space-y-1 pl-6">
          {#each release.notes as note, i (i)}
            <!-- note はこのコンポーネント内にハードコードされた静的かつ作者制御の文字列のみ（一部に固定の<a>リンクを含むため html 描画が必要）。ユーザー入力は一切含まないため XSS リスクはない -->
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            <li><span>{@html note}</span></li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</div>

<Footer />
