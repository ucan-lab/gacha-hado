<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import * as m from '$lib/paraglide/messages';
  import UnderConstruction from '$lib/components/UnderConstruction.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
</script>

<Header />

<div class="bg-primary flex min-h-screen flex-col">
  <div class="container mx-auto p-4">
    <Breadcrumb
      items={[
        { label: 'ホーム', href: '/' },
        { label: 'HADOについて', href: '/about' },
        { label: 'HADOとは', href: '/about/what-is-hado' }
      ]}
    />

    <UnderConstruction />

    <h1 class="text-primary mb-8 text-center text-3xl font-bold">HADOとは</h1>

    <div class="prose mx-auto max-w-3xl">
      <p class="text-secondary mb-4">
        HADOは、AR（拡張現実）技術を活用した新しいスポーツです。プレイヤーはヘッドマウントディスプレイとアームバンドを装着し、現実世界に仮想のエネルギー弾を発射して対戦します。
      </p>

      <h2 class="text-primary mb-4 text-2xl font-bold">HADOの特徴</h2>
      <ul class="text-secondary mb-6 list-disc pl-6">
        <li>AR技術による没入感のある体験</li>
        <li>体力や年齢に関係なく楽しめる</li>
        <li>チーム戦略性の高いゲーム性</li>
        <li>リアルタイムでの対戦が可能</li>
      </ul>

      <h2 class="text-primary mb-4 text-2xl font-bold">必要な装備</h2>
      <ul class="text-secondary mb-6 list-disc pl-6">
        <li>ヘッドマウントディスプレイ（HMD）</li>
        <li>アームバンド</li>
        <li>スマートフォン（専用アプリ）</li>
      </ul>

      <h2 class="text-primary mb-4 text-2xl font-bold">HADOの魅力</h2>
      <p class="text-secondary mb-4">
        HADOは、テクノロジーとスポーツを融合させた新しいエンターテインメントです。チーム戦略や個人のスキルが重要で、初心者から上級者まで楽しめる奥深さがあります。
      </p>
    </div>
  </div>
</div>

<Footer />
