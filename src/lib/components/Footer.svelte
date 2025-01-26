<script lang="ts">
  const appVersion = __APP_VERSION__;
  const appDeployDate = __APP_DEPLOY_DATE__;
</script>

<footer class="mt-auto bg-gray-800 py-4 text-center text-white">
  <p>
    <a href="/release-note" class="hover:underline">{appVersion} - {appDeployDate}</a>
  </p>
</footer>

<style>
  footer {
    font-size: 0.875rem;
  }
</style>
