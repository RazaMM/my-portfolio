<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let forceActive = false;
  export let text: string;
  export let icon: string | null = null;
  export let iconAlt: string | null = null;

  const dispatch = createEventDispatcher();
</script>

<button
  class="flex items-center gap-1 px-2 shadow-w95 active:shadow-w95-inverted"
  class:shadow-w95-inverted={forceActive}
  on:click={() => dispatch('click')}
>
  {#if icon}
    <img src={icon} alt={iconAlt} class="h-[1.5em]"/>
  {/if}
  <span>{text}</span>
</button>