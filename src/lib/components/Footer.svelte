<script lang="ts">
  const appVersion = __APP_VERSION__;
  const appDeployDate = __APP_DEPLOY_DATE__;
  import { IconBrandX, IconBrandGithub, IconNote } from '@tabler/icons-svelte';
</script>

<footer class="mt-auto bg-gray-800 py-4 text-center text-white">
  <p class="flex items-center justify-center space-x-4">
    <a href="/release-note" class="hover:underline">{appVersion} - {appDeployDate}</a>
    <span>Created by ucan.</span>
    <a href="https://x.com/ucan_lab" target="_blank" class="inline-flex">
      <IconBrandX />
    </a>
    <a href="https://github.com/ucan-lab" target="_blank" class="inline-flex">
      <IconBrandGithub />
    </a>
    <a href="https://qiita.com/ucan-lab" target="_blank" class="inline-flex">
      <IconNote />
    </a>
  </p>
</footer>

<style>
  footer {
    font-size: 0.875rem;
  }
</style>
