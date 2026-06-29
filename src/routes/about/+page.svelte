<script lang="ts">
  import {
    IconInfoCircle,
    IconNote,
    IconSettings,
    IconUsers,
    IconUsersGroup
  } from '@tabler/icons-svelte';
  import UnderConstruction from '$lib/components/UnderConstruction.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import { buildBreadcrumb } from '$lib/breadcrumb';
  import { page } from '$app/state';
</script>

<div class="bg-primary flex min-h-screen flex-col">
  <div class="container mx-auto p-4">
    <Breadcrumb items={buildBreadcrumb(page.url.pathname)} />

    <UnderConstruction />

    <h1 class="mb-8 text-center text-3xl font-bold">HADOについて</h1>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <a
        href="/about/what-is-hado"
        class="bg-secondary flex flex-col items-center rounded-lg p-6 shadow-lg transition-transform hover:scale-105"
      >
        <IconInfoCircle class="mb-4 h-12 w-12 text-blue-500" />
        <h2 class="text-primary mb-2 text-xl font-bold">HADOとは</h2>
        <p class="text-secondary text-center">ARスポーツHADOの基本情報と魅力を紹介</p>
      </a>

      <a
        href="/about/rules"
        class="bg-secondary flex flex-col items-center rounded-lg p-6 shadow-lg transition-transform hover:scale-105"
      >
        <IconNote class="mb-4 h-12 w-12 text-green-500" />
        <h2 class="text-primary mb-2 text-xl font-bold">HADO ルール</h2>
        <p class="text-secondary text-center">基本的なルールとゲームの流れを解説</p>
      </a>

      <a
        href="/about/parameters"
        class="bg-secondary flex flex-col items-center rounded-lg p-6 shadow-lg transition-transform hover:scale-105"
      >
        <IconSettings class="mb-4 h-12 w-12 text-purple-500" />
        <h2 class="text-primary mb-2 text-xl font-bold">パラメータ解説</h2>
        <p class="text-secondary text-center">各パラメータの効果と特徴を説明</p>
      </a>

      <a
        href="/about/roles"
        class="bg-secondary flex flex-col items-center rounded-lg p-6 shadow-lg transition-transform hover:scale-105"
      >
        <IconUsers class="mb-4 h-12 w-12 text-red-500" />
        <h2 class="text-primary mb-2 text-xl font-bold">役割</h2>
        <p class="text-secondary text-center">プレイヤーの役割と戦略を解説</p>
      </a>

      <a
        href="/about/formation"
        class="bg-secondary flex flex-col items-center rounded-lg p-6 shadow-lg transition-transform hover:scale-105"
      >
        <IconUsersGroup class="mb-4 h-12 w-12 text-yellow-500" />
        <h2 class="text-primary mb-2 text-xl font-bold">編成</h2>
        <p class="text-secondary text-center">効果的なチーム編成のポイントを紹介</p>
      </a>
    </div>
  </div>
</div>
