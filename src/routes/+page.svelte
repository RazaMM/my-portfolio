<script lang="ts">
  import Window from "../components/Window.svelte";
  import {activeProgram, programList, openPrograms} from "../lib/programs.ts";
</script>

<svelte:head>
  <title>Raza Mahmood's Portfolio</title>
</svelte:head>

{#each $openPrograms as program (program.name)}
  <Window
    title={program.name}
    icon={program.icon}
    active={$activeProgram === program}
    on:close={() => {
      openPrograms.remove(program);
    }}
    on:mousedown={() => {
      activeProgram.set(program);
    }}
  >
    <svelte:component this={program.component} />
  </Window>
{/each}