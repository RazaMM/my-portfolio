<script>
  import TaskbarButton from "./TaskbarButton.svelte";
  import TaskbarClock from "./TaskbarClock.svelte";
  import StartMenu from "./StartMenu.svelte";
  import {activeProgram, openPrograms} from "$lib/programs.ts";
</script>

<footer class="relative flex items-center w-full p-2 gap-6 bg-w95-grey shadow-w95 select-none z-50">
  <StartMenu/>

  <!-- Open windows -->
  <div class="flex-1 flex items-center gap-6">
    {#each $openPrograms as program}
      <TaskbarButton
        icon={program.icon}
        text={program.name}
        active={$activeProgram === program}
        on:click={() => activeProgram.set(program)}
      />
    {/each}
  </div>

  <TaskbarClock/>
</footer>