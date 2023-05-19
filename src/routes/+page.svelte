<script lang="ts">
    import Window from "$components/Window.svelte";
    import { activeProgram, openPrograms, programs } from "$lib/programs.ts";
    import DesktopIcon from "$components/DesktopIcon.svelte";
</script>

<svelte:head>
    <title>Raza Mahmood's Portfolio</title>
</svelte:head>

<div class="flex flex-col flex-wrap items-center gap-4 w-fit max-h-[calc(100vh-40px)] p-2">

    {#each programs as program}
        <DesktopIcon program={program}/>
    {/each}
</div>

{#each $openPrograms as program (program.name)}
    <Window
        name={program.name}
        icon={program.icon}
        active={$activeProgram === program}
        resizable={program.resizeableWindow}
        on:close={() => {
      openPrograms.close(program);
    }}
        on:mousedown={() => {
      activeProgram.set(program);
    }}
    >
        <svelte:component this={program.component}/>
    </Window>
{/each}