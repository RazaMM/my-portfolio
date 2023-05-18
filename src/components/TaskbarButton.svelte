<script lang="ts">
  import {createEventDispatcher} from 'svelte';

  export let active = false;
  export let text: string;
  export let icon: string | null = null;

  const dispatch = createEventDispatcher();
</script>

<button
  class="flex items-center gap-1 px-2 shadow-w95 whitespace-nowrap active:shadow-w95-inverted"
  class:shadow-w95-inverted={active}
  on:click={() => dispatch('click')}
>
  {#if icon}
    <img src={icon} alt="{text} icon" class="h-6 rendering-pixelated"/>
  {/if}
  <span class="block h-full overflow-hidden text-ellipsis whitespace-nowrap">{text}</span>
</button>