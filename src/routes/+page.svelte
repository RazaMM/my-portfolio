<script lang="ts">
  import Window from "$components/Window.svelte";
  import {activeProgram, programs} from "$lib/programs.ts";
  import DesktopIcon from "$components/DesktopIcon.svelte";

  import MyBiography from "$components/MyBiography.svelte";
  import MyBiographyIcon from "$icons/bio.png";

  import MyExperience from "$components/MyExperience.svelte";
  import MyExperienceIcon from "$icons/notepad.png";

  import MyEducation from "$components/MyEducation.svelte";
  import MyEducationIcon from "$icons/book.png";
</script>

<svelte:head>
  <title>Raza Mahmood's Portfolio</title>
</svelte:head>

<div class="flex flex-col flex-wrap items-center gap-4 w-fit max-h-[calc(100vh-40px)] p-2">
  <DesktopIcon
    program={{
      name: "My Biography",
      icon: MyBiographyIcon,
      resizeableWindow: true,
      component: MyBiography
    }}
  />
  <DesktopIcon
    program={{
      name: "My Experience",
      icon: MyExperienceIcon,
      resizeableWindow: true,
      component: MyExperience
   }}
  />
  <DesktopIcon
    program={{
      name: "My Education",
      icon: MyEducationIcon,
      resizeableWindow: true,
      component: MyEducation
   }}
  />
</div>

{#each $programs as program (program.name)}
  <Window
    name={program.name}
    icon={program.icon}
    active={$activeProgram === program}
    resizable={program.resizeableWindow}
    on:close={() => {
      programs.close(program);
    }}
    on:mousedown={() => {
      activeProgram.set(program);
    }}
  >
    <svelte:component this={program.component}/>
  </Window>
{/each}