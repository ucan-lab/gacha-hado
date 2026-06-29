<script lang="ts">
  // headers と rows を受け取る汎用テーブル。
  // パラメータ解説ページの Lv 別テーブルをデータ駆動で描画する。
  export let headers: string[];
  export let rows: string[][];
</script>

<div class="overflow-x-auto">
  <table class="w-full border-collapse">
    <thead>
      <tr>
        {#each headers as header, i (i)}
          <th class="border p-2">{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row, rowIndex (rowIndex)}
        <tr>
          {#each row as cell, cellIndex (cellIndex)}
            <td class="border p-2">{cell}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
