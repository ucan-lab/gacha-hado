<script>
  import Header from '../components/Header.svelte';
  import Footer from '../components/Footer.svelte';

  export let releaseNotes = [
    {
      version: 'v0.3.6',
      date: '2025-01-19',
      notes: ['🛠️ 軽微な修正']
    },
    {
      version: 'v0.3.5',
      date: '2025-01-19',
      notes: ['🛠️ パラメータの重み付けを変更']
    },
    {
      version: 'v0.3.4',
      date: '2025-01-19',
      notes: ['🛠️ パラメータ抽選確率テーブルページを実装']
    },
    {
      version: 'v0.3.3',
      date: '2025-01-19',
      notes: ['🛠️ リリースノートページを実装']
    },
    {
      version: 'v0.3.2',
      date: '2025-01-19',
      notes: ['🛠️ ナビメニューにハンバーガーメニューを導入']
    },
    {
      version: 'v0.3.1',
      date: '2025-01-19',
      notes: ['🐛 軽微な修正']
    },
    {
      version: 'v0.3.0',
      date: '2025-01-18',
      notes: ['🚀 ランダムパラメータのアルゴリズムを重み付け乱択に変更']
    },
    {
      version: 'v0.2.2',
      date: '2025-01-18',
      notes: ['🐛 ブラックアウト演出が機能しない問題を修正']
    },
    {
      version: 'v0.2.1',
      date: '2025-01-18',
      notes: ['🐛 フッターにアプリバージョンとリリース日を表示']
    },
    {
      version: 'v0.2.0',
      date: '2025-01-16',
      notes: ['🚀 ランダムパラメータにデュオ、トリオ機能を実装', '🚀 トップページを実装']
    },
    {
      version: 'v0.1.0',
      date: '2025-01-16',
      notes: [
        '🎉 初回リリース',
        '🚀 パラメータをランダムに出力する機能を実装',
        '🚀 パラメータをリセットする機能を実装'
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
            <li><span class="text-gray-800">{note}</span></li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</div>

<Footer />
