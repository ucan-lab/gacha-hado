<script lang="ts">
  import { IconExternalLink } from '@tabler/icons-svelte';
  import UnderConstruction from '$lib/components/UnderConstruction.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import ParameterTable from '$lib/components/ParameterTable.svelte';
  import { buildBreadcrumb } from '$lib/breadcrumb';
  import { page } from '$app/state';

  const speedTable = {
    headers: ['Lv', 'スピード'],
    rows: [
      ['1', '13km/h'],
      ['2', '20km/h'],
      ['3', '27km/h'],
      ['4', '31km/h'],
      ['5', '34km/h']
    ]
  };

  const scaleTable = {
    headers: ['Lv', '大きさ', 'ライフと大きさ比較'],
    rows: [
      ['1', '16cm', 'ライフ0.8枚分'],
      ['2', '22cm', 'ライフ1.1枚分'],
      ['3', '30cm', 'ライフ1.5枚分'],
      ['4', '45cm', 'ライフ2.25枚分'],
      ['5', '60cm', 'ライフ3枚分']
    ]
  };

  const chargeTable = {
    headers: ['Lv', '5発分のチャージ時間', '1試合の球数目安'],
    rows: [
      ['1', '16秒', '20〜24発'],
      ['2', '11秒', '30〜34発'],
      ['3', '7.5秒', '40〜44発'],
      ['4', '4.5秒', '50〜60発'],
      ['5', '3秒', '70〜80発']
    ]
  };

  const shieldTable = {
    headers: ['Lv', '耐久力', '持続時間'],
    rows: [
      ['1', '4発', '13秒'],
      ['2', '5発', '17秒'],
      ['3', '6発', '21秒'],
      ['4', '7発', '25秒'],
      ['5', '8発', '26秒']
    ]
  };
</script>

<div class="bg-primary flex min-h-screen flex-col">
  <div class="container mx-auto p-4">
    <Breadcrumb items={buildBreadcrumb(page.url.pathname)} />

    <UnderConstruction />

    <h1 class="text-primary mb-8 text-center text-3xl font-bold">パラメータ解説</h1>

    <div class="prose mx-auto max-w-3xl">
      <div class="bg-secondary mb-8 rounded-lg p-6">
        <h2 class="text-primary mb-4 text-xl font-bold">パラメータの基本ルール</h2>
        <ul class="text-secondary list-disc pl-6">
          <li>各パラメータは1〜5ポイント割り振りできます</li>
          <li>パラメータは合計10ポイントです</li>
        </ul>
      </div>

      <div class="mb-8">
        <h2 class="text-primary mb-4 text-2xl font-bold">スピード</h2>
        <p class="text-secondary mb-4">パラメータLvが上がるごとに移動速度が上昇します。</p>
        <ParameterTable headers={speedTable.headers} rows={speedTable.rows} />
      </div>

      <div class="mb-8">
        <h2 class="text-primary mb-4 text-2xl font-bold">スケール</h2>
        <p class="text-secondary mb-4">
          パラメータLvが上がるごとに発射弾のサイズが大きくなります。
        </p>
        <ParameterTable headers={scaleTable.headers} rows={scaleTable.rows} />
      </div>

      <div class="mb-8">
        <h2 class="text-primary mb-4 text-2xl font-bold">チャージ</h2>
        <p class="text-secondary mb-4">5発分のチャージにかかる時間が短縮されます。</p>
        <ParameterTable headers={chargeTable.headers} rows={chargeTable.rows} />
      </div>

      <div class="mb-8">
        <h2 class="text-primary mb-4 text-2xl font-bold">シールド</h2>
        <p class="text-secondary mb-4">シールドの耐久力と持続時間が向上します。</p>
        <ParameterTable headers={shieldTable.headers} rows={shieldTable.rows} />
      </div>
    </div>

    <h4 class="text-primary mb-4 text-xl font-bold">情報元</h4>
    <ul class="text-secondary list-disc pl-6">
      <li>
        <a
          href="https://hado-official.com/news/7778/"
          target="_blank"
          class="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
        >
          HADO バージョンアップデートとパラメーター調整のお知らせ|HADO公式
          <IconExternalLink class="ml-1 h-4 w-4" />
        </a>
      </li>
      <li>
        <a
          href="https://note.com/eieio81810/n/n044c72d8d306"
          target="_blank"
          class="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
        >
          【スポーツ】HADOステータス仕様【アプデ】|すっすー
          <IconExternalLink class="ml-1 h-4 w-4" />
        </a>
      </li>
    </ul>
  </div>
</div>
