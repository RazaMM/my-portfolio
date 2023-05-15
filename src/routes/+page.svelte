<script lang="ts">
  import Window from "../components/Window.svelte";
  import {activeProgram, programList, openPrograms} from "../lib/programs.ts";

  openPrograms.add(programList['test']);
  openPrograms.add(programList['test2']);
</script>

<svelte:head>
  <title>Raza Mahmood's Portfolio</title>
</svelte:head>

{#each $openPrograms as program}
  <Window title={program.name} icon={program.icon} />
{/each}