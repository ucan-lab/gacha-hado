<script lang="ts">
  import { IconExternalLink } from '@tabler/icons-svelte';
  import UnderConstruction from '$lib/components/UnderConstruction.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
</script>

<div class="bg-primary flex min-h-screen flex-col">
  <div class="container mx-auto p-4">
    <Breadcrumb
      items={[
        { label: 'ホーム', href: '/' },
        { label: 'HADOについて', href: '/about' },
        { label: 'パラメータ解説', href: '/about/parameters' }
      ]}
    />

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
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr>
                <th class="border p-2">Lv</th>
                <th class="border p-2">スピード</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border p-2">1</td>
                <td class="border p-2">13km/h</td>
              </tr>
              <tr>
                <td class="border p-2">2</td>
                <td class="border p-2">20km/h</td>
              </tr>
              <tr>
                <td class="border p-2">3</td>
                <td class="border p-2">27km/h</td>
              </tr>
              <tr>
                <td class="border p-2">4</td>
                <td class="border p-2">31km/h</td>
              </tr>
              <tr>
                <td class="border p-2">5</td>
                <td class="border p-2">34km/h</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-primary mb-4 text-2xl font-bold">スケール</h2>
        <p class="text-secondary mb-4">
          パラメータLvが上がるごとに発射弾のサイズが大きくなります。
        </p>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr>
                <th class="border p-2">Lv</th>
                <th class="border p-2">大きさ</th>
                <th class="border p-2">ライフと大きさ比較</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border p-2">1</td>
                <td class="border p-2">16cm</td>
                <td class="border p-2">ライフ0.8枚分</td>
              </tr>
              <tr>
                <td class="border p-2">2</td>
                <td class="border p-2">22cm</td>
                <td class="border p-2">ライフ1.1枚分</td>
              </tr>
              <tr>
                <td class="border p-2">3</td>
                <td class="border p-2">30cm</td>
                <td class="border p-2">ライフ1.5枚分</td>
              </tr>
              <tr>
                <td class="border p-2">4</td>
                <td class="border p-2">45cm</td>
                <td class="border p-2">ライフ2.25枚分</td>
              </tr>
              <tr>
                <td class="border p-2">5</td>
                <td class="border p-2">60cm</td>
                <td class="border p-2">ライフ3枚分</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-primary mb-4 text-2xl font-bold">チャージ</h2>
        <p class="text-secondary mb-4">5発分のチャージにかかる時間が短縮されます。</p>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr>
                <th class="border p-2">Lv</th>
                <th class="border p-2">5発分のチャージ時間</th>
                <th class="border p-2">1試合の球数目安</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border p-2">1</td>
                <td class="border p-2">16秒</td>
                <td class="border p-2">20〜24発</td>
              </tr>
              <tr>
                <td class="border p-2">2</td>
                <td class="border p-2">11秒</td>
                <td class="border p-2">30〜34発</td>
              </tr>
              <tr>
                <td class="border p-2">3</td>
                <td class="border p-2">7.5秒</td>
                <td class="border p-2">40〜44発</td>
              </tr>
              <tr>
                <td class="border p-2">4</td>
                <td class="border p-2">4.5秒</td>
                <td class="border p-2">50〜60発</td>
              </tr>
              <tr>
                <td class="border p-2">5</td>
                <td class="border p-2">3秒</td>
                <td class="border p-2">70〜80発</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-primary mb-4 text-2xl font-bold">シールド</h2>
        <p class="text-secondary mb-4">シールドの耐久力と持続時間が向上します。</p>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr>
                <th class="border p-2">Lv</th>
                <th class="border p-2">耐久力</th>
                <th class="border p-2">持続時間</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border p-2">1</td>
                <td class="border p-2">4発</td>
                <td class="border p-2">13秒</td>
              </tr>
              <tr>
                <td class="border p-2">2</td>
                <td class="border p-2">5発</td>
                <td class="border p-2">17秒</td>
              </tr>
              <tr>
                <td class="border p-2">3</td>
                <td class="border p-2">6発</td>
                <td class="border p-2">21秒</td>
              </tr>
              <tr>
                <td class="border p-2">4</td>
                <td class="border p-2">7発</td>
                <td class="border p-2">25秒</td>
              </tr>
              <tr>
                <td class="border p-2">5</td>
                <td class="border p-2">8発</td>
                <td class="border p-2">26秒</td>
              </tr>
            </tbody>
          </table>
        </div>
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
