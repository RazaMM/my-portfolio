<script lang="ts">
  import {createEventDispatcher} from 'svelte';

  export let text: string;
  export let icon: string | null = null;

  const dispatch = createEventDispatcher();
</script>

<button
  class="flex items-center gap-1 p-1 w-full h-10 hover:bg-w95-blue hover:text-white focus:outline-none focus:bg-w95-blue focus:text-white"
  on:click={() => dispatch('click')}
>
  {#if icon}
    <img src={icon} class="h-full rendering-pixelated"/>
  {/if}
  <span>{text}</span>
</button>