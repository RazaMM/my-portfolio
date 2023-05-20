<script lang="ts">
    import Window from "$components/Window.svelte";
    import { activeProgram, openPrograms, programs } from "$lib/programs.ts";
</script>

<svelte:head>
    <title>Raza Mahmood's Portfolio</title>
</svelte:head>

<div class="flex flex-col flex-wrap items-center gap-4 w-fit max-h-[calc(100vh-40px)] p-2">
    {#each programs as program}
        <button class="flex flex-col items-center gap-0.5 w-fit h-fit" on:dblclick={() => openPrograms.open(program)}>
            <img class="h-10 rendering-pixelated" src={program.icon} alt="{program.name} icon"/>
            <span class="text-white text-center">{program.name}</span>
        </button>
    {/each}
</div>

{#each $openPrograms as program (program.name)}
    <Window
        name={program.name}
        icon={program.icon}
        active={$activeProgram === program}
        resizable={program.resizeable}
        on:close={() => openPrograms.close(program)}
        on:mousedown={() => activeProgram.set(program)}
    >
        <svelte:component this={program.component}/>
    </Window>
{/each}