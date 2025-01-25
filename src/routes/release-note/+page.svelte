<script>
  import Header from '../components/Header.svelte';
  import Footer from '../components/Footer.svelte';

  export let releaseNotes = [
    {
      version: 'v0.7.1',
      date: '2025-01-25',
      notes: ['🛠️ ライブラリアップデート']
    },
    {
      version: 'v0.7.0',
      date: '2025-01-25',
      notes: ['🚀 hado-randomizer.vercel.app から hado-gacha.vercel.app へドメインを変更しました。']
    },
    {
      version: 'v0.6.0',
      date: '2025-01-25',
      notes: ['🚀 HADO RandomizerからHADOガチャにアプリ名を変更しました。']
    },
    {
      version: 'v0.5.0',
      date: '2025-01-25',
      notes: [
        '🛠️ コードのリファクタを行いました。',
        '🚀 表示言語の切り替え機能を実装しました。',
        '🚀 tabler iconsに変更しました。',
        '🚀 Noto Sans JPに変更しました。'
      ]
    },
    {
      version: 'v0.4.0',
      date: '2025-01-21',
      notes: [
        '🚀 トップページにQRコード表示とクリップボードコピーのボタンを追加しました。これにより、簡単にシェアできるようになりました。'
      ]
    },
    {
      version: 'v0.3.9',
      date: '2025-01-19',
      notes: [
        '🛠️ パラメータの重み付けを変更しました。詳細は<a class="hover:underline" href="https://docs.google.com/spreadsheets/d/1zf-2dh_cq37Ict_rj9w9Xm8RIsoB1s4AQMleUT6YzVY/edit?usp=sharing">こちらのパラメータシート</a>でご確認いただけます。'
      ]
    },
    {
      version: 'v0.3.8',
      date: '2025-01-19',
      notes: ['🛠️ スマホサイズに対応するため、余白デザインを調整しました。']
    },
    {
      version: 'v0.3.7',
      date: '2025-01-19',
      notes: ['🛠️ トップページのレイアウトを調整しました。']
    },
    {
      version: 'v0.3.6',
      date: '2025-01-19',
      notes: ['🛠️ 軽微な修正を行いました。']
    },
    {
      version: 'v0.3.5',
      date: '2025-01-19',
      notes: [
        '🛠️ パラメータの重み付けを変更しました。詳細は<a class="hover:underline" href="https://docs.google.com/spreadsheets/d/1zf-2dh_cq37Ict_rj9w9Xm8RIsoB1s4AQMleUT6YzVY/edit?usp=sharing">こちらのパラメータシート</a>でご確認いただけます。'
      ]
    },
    {
      version: 'v0.3.4',
      date: '2025-01-19',
      notes: ['🛠️ パラメータ抽選確率テーブルページを追加しました。']
    },
    {
      version: 'v0.3.3',
      date: '2025-01-19',
      notes: ['🛠️ リリースノートページを追加しました。']
    },
    {
      version: 'v0.3.2',
      date: '2025-01-19',
      notes: ['🛠️ ナビゲーションメニューにハンバーガーメニューを導入しました。']
    },
    {
      version: 'v0.3.1',
      date: '2025-01-19',
      notes: ['🐛 軽微な不具合を修正しました。']
    },
    {
      version: 'v0.3.0',
      date: '2025-01-18',
      notes: ['🚀 ランダムパラメータのアルゴリズムを「重み付け乱択」に変更しました。']
    },
    {
      version: 'v0.2.2',
      date: '2025-01-18',
      notes: ['🐛 ブラックアウト演出が機能しない問題を修正しました。']
    },
    {
      version: 'v0.2.1',
      date: '2025-01-18',
      notes: ['🐛 フッターにアプリバージョンとリリース日を表示するようにしました。']
    },
    {
      version: 'v0.2.0',
      date: '2025-01-16',
      notes: [
        '🚀 ランダムパラメータにデュオ・トリオ機能を追加しました。',
        '🚀 トップページを実装しました。'
      ]
    },
    {
      version: 'v0.1.0',
      date: '2025-01-16',
      notes: [
        '🎉 初回リリースです。',
        '🚀 パラメータをランダムに出力する機能を実装しました。',
        '🚀 パラメータをリセットする機能を実装しました。'
      ]
    }
  ];
</script>

<Header />

<div class="container mx-auto p-6">
  <h1 class="mb-6 text-center text-3xl font-bold">リリースノート</h1>

  <div class="space-y-6">
    {#each releaseNotes as release}
      <div class="rounded-lg bg-white p-4 shadow-md">
        <h2 class="text-xl font-semibold text-gray-800">
          {release.version} <span class="text-sm text-gray-500">({release.date})</span>
        </h2>
        <ul class="mt-2 list-disc space-y-1 pl-6">
          {#each release.notes as note}
            <li><span class="text-gray-800">{@html note}</span></li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</div>

<Footer />
