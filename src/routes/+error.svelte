<script lang="ts">
  import { page } from '$app/stores';
  import Window from '$components/window.svelte';
  import icon from '$img/error.png';
</script>

<Window name={`${$page.status} ${$page.error?.message}`} resizable={false} active={true}>
  <div class="flex flex-col flex-1 gap-4 p-2 items-center justify-center h-full w-96 max-h-full max-w-full">
    {#if $page.status === 404}
      <div class="flex gap-2 items-center">
        <img class="rendering-pixelated" src={icon} alt="error icon" />

        <h1 class="text-lg text-center font-bold">
          You've ventured too far into the unknown and I can't find what you're looking for :(
        </h1>
      </div>

      <a class="flex items-center gap-1 px-2 shadow-w95 active:shadow-w95-inverted" href="/">
        <span>Go back home</span>
      </a>
    {:else}
      <h1 class="text-lg text-center font-bold">An unexpected error occurred and that's all we know :(</h1>
    {/if}
  </div>
</Window>
