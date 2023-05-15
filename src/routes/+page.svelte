<script lang="ts">
  import Window from "../components/Window.svelte";
  import {activeProgram, openPrograms} from "../lib/programs.ts";
  import DesktopIcon from "../components/DesktopIcon.svelte";

  import MyBio from "../components/MyBio.svelte";
  import MyBioIcon from "../icons/bio.png";
</script>

<svelte:head>
  <title>Raza Mahmood's Portfolio</title>
</svelte:head>

<div class="flex flex-col flex-wrap gap-4 w-fit max-h-[calc(100vh-40px)] p-2">
  <DesktopIcon program={{name: "My Bio", icon: MyBioIcon, component: MyBio }}/>
</div>

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
    <svelte:component this={program.component}/>
  </Window>
{/each}