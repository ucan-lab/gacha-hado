<script lang="ts">
  import UnderConstruction from '$lib/components/UnderConstruction.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
</script>

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

    <h1 class="mb-8 text-center text-3xl font-bold">HADO ルール</h1>

    <div class="prose mx-auto max-w-3xl">
      <h2 class="mb-4 text-2xl font-bold">基本ルール</h2>
      <ul class="mb-6 list-disc pl-6">
        <li>3対3のチーム戦で行われます</li>
        <li>1ゲーム80秒、引き分けの場合は1点選手の延長戦となります</li>
        <li>相手のライフを0にすると1ポイント獲得です</li>
        <li>
          ライフが0なると
          <ul>
            <li>3秒後に復活します</li>
            <li>復活するまでチャージが行えません</li>
          </ul>
        </li>
      </ul>

      <h2 class="mb-4 text-2xl font-bold">攻撃方法</h2>
      <ul class="mb-6 list-disc pl-6">
        <li>腕を90度上げるとチャージできます</li>
        <li>チャージは5発分まで溜められます</li>
        <li>腕を突き出すように振るとエネルギー弾が発射されます</li>
        <li>エネルギー弾はヘッドデバイスが向いてる方向へ飛んでいきます</li>
        <li>エネルギー弾の速さ、大きさはステータスによって決まります</li>
      </ul>

      <h2 class="mb-4 text-2xl font-bold">防御方法</h2>
      <ul class="mb-6 list-disc pl-6">
        <li>腕を下げるとシールドチャージできます</li>
        <li>シールドチャージが溜まった状態で腕を振り上げるとシールドを展開できます</li>
        <li>シールドの向きはヘッドデバイスの向きによって決まります</li>
        <li>シールドチャージは3秒間かかります。※チャージパラメータは影響しません</li>
        <li>シールドは味方のエネルギー弾はすり抜け、敵のエネルギー弾は防ぐことができます</li>
        <li>シールドは相手のエネルギー弾、または時間経過によって消滅します</li>
        <li>シールドの枚数、耐久度はシールドパラメータによって決まります</li>
      </ul>
    </div>
  </div>
</div>
