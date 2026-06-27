<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
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
        { label: '役割', href: '/about/roles' }
      ]}
    />

    <UnderConstruction />

    <h1 class="mb-8 text-center text-3xl font-bold">役割解説</h1>

    <div class="prose mx-auto max-w-3xl">
      <div class="mb-8 rounded-lg bg-gray-100 p-6">
        <h2 class="mb-4 text-xl font-bold">役割の基本</h2>
        <p class="mb-4">
          HADOでは、チーム内で異なる役割を担うことで、より効果的な戦略を展開できます。
          各プレイヤーの特性や好みに合わせて役割を選択し、チーム全体のバランスを考慮することが重要です。
        </p>
      </div>

      <div class="mb-8">
        <h2 class="mb-4 text-2xl font-bold">アタッカー</h2>
        <div class="rounded-lg border p-6">
          <h3 class="mb-2 text-xl font-semibold">特徴</h3>
          <ul class="mb-4 list-disc pl-6">
            <li>攻撃力に特化した役割</li>
            <li>素早い移動と正確な射撃が求められる</li>
            <li>チームの主な火力源</li>
          </ul>

          <h3 class="mb-2 text-xl font-semibold">推奨パラメータ</h3>
          <ul class="mb-4 list-disc pl-6">
            <li>
              5221: スピードを重視したパラメータ。遠距離からも狙撃可能。エイムが得意な人におすすめ
            </li>
            <li>4321: アタッカーとしてバランスの良いパラメータ</li>
            <li>3421: 弾が大きいため、前に出て攻撃できると強い。前に出て動ける人におすすめ</li>
            <li>
              5311/4411/3511:
              チャージ1アタッカー。スピード、スケールに特化させたパラメータ1試合に20発しか撃てないが威力は絶大！
            </li>
          </ul>

          <h3 class="mb-2 text-xl font-semibold">戦略</h3>
          <ul class="list-disc pl-6">
            <li>敵の隙を突いて攻撃</li>
            <li>ディフェンダーのシールドを活かした攻撃</li>
            <li>チャージャーのサポートを受けながら連続攻撃</li>
          </ul>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="mb-4 text-2xl font-bold">ディフェンダー（タンク）</h2>
        <div class="rounded-lg border p-6">
          <h3 class="mb-2 text-xl font-semibold">特徴</h3>
          <ul class="mb-4 list-disc pl-6">
            <li>チームの司令塔！</li>
            <li>コート前方に張る攻めのシールド、後方に張る守りのシールドの使い分け</li>
            <li>チーム状況を把握してライフ枚数が少ない味方を守る</li>
            <li>試合の残り時間を把握してシールドを張るタイミングを判断する</li>
          </ul>

          <h3 class="mb-2 text-xl font-semibold">推奨パラメータ</h3>
          <ul class="mb-4 list-disc pl-6">
            <li>1135: シールドに特化したパラメータ、タンクといえばこれ</li>
            <li>1144: シールド割りにも重きを置いたパラメータ、シールドを張る判断がより重要に</li>
          </ul>

          <h3 class="mb-2 text-xl font-semibold">戦略</h3>
          <ul class="list-disc pl-6">
            <li>チームメイトを守る</li>
            <li>敵の攻撃を引き受ける</li>
            <li>アタッカーの攻撃をサポート</li>
          </ul>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="mb-4 text-2xl font-bold">チャージャー</h2>
        <div class="rounded-lg border p-6">
          <h3 class="mb-2 text-xl font-semibold">特徴</h3>
          <ul class="mb-4 list-disc pl-6">
            <li>チャージ速度に特化した役割</li>
            <li>圧倒的な球数を活かして敵のシールドを割りまくろう！</li>
            <li>前に攻めて来た相手を牽制して追い返そう！</li>
          </ul>

          <h3 class="mb-2 text-xl font-semibold">推奨パラメータ</h3>
          <ul class="mb-4 list-disc pl-6">
            <li>3241: バランスの良いチャージャー</li>
            <li>
              2251, 3151:
              チャージ速度に特化したパラメータ。最高のシールド割り性能。腕の振りすぎによる筋肉痛にご注意
            </li>
          </ul>

          <h3 class="mb-2 text-xl font-semibold">戦略</h3>
          <ul class="list-disc pl-6">
            <li>素早いチャージで連続攻撃</li>
            <li>アタッカーのサポート</li>
            <li>敵の隙を突いた攻撃</li>
          </ul>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="mb-4 text-2xl font-bold">テクニッカー</h2>
        <div class="rounded-lg border p-6">
          <h3 class="mb-2 text-xl font-semibold">特徴</h3>
          <ul class="mb-4 list-disc pl-6">
            <li>バランスの取れた役割</li>
            <li>状況に応じて柔軟に対応</li>
            <li>チームの調整役</li>
          </ul>

          <h3 class="mb-2 text-xl font-semibold">推奨?パラメータ</h3>
          <ul class="mb-4 list-disc pl-6">
            <li>2521, 2431: 弾は大きいが、スピードが遅いのでチームで狙いを合わせよう</li>
            <li>3331, 2341: バランス型。</li>
            <li>チャージ: 中程度（バランスのため）</li>
            <li>シールド: 中程度（バランスのため）</li>
          </ul>

          <h3 class="mb-2 text-xl font-semibold">戦略</h3>
          <ul class="list-disc pl-6">
            <li>状況に応じた柔軟な対応</li>
            <li>チームの穴を埋める</li>
            <li>各役割のサポート</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

<Footer />
