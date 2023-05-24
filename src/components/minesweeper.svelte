<script>
  import SevenSegmentDisplay from '$components/seven-segment-display.svelte';

  export let width = 9;
  export let height = 9;
</script>

<div class="flex flex-col gap-4 p-2 shadow-w95-alt">
  <div class="flex text-3xl justify-between items-center shadow-w95-alt-inverted gap-2 p-2">
    <SevenSegmentDisplay value="000" />
    <button class="w-6 h-6 shadow-w95-alt active:shadow-w95-alt-inverted" />
    <SevenSegmentDisplay value="000" />
  </div>
  <div class="grid gap-1" style={`grid-template-columns: repeat(${width}, 1rem);`}>
    {#each Array(width * height) as _, i}
      <button
        class="flex items-center justify-center w-4 h-4 shadow-w95-alt-thin active:shadow-w95-alt-inverted-thin"
      />
    {/each}
  </div>
</div>
