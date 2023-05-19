<script lang="ts">
    import type { Program } from "$lib/programs";
    import { openPrograms } from "$lib/programs.ts";

    export let program: Program;
</script>

<button class="flex flex-col items-center gap-0.5 w-fit h-fit" on:dblclick={() => openPrograms.open(program)}>
    <img class="h-10 rendering-pixelated" src={program.icon} alt="{program.name} icon"/>
    <span class="text-white text-center">{program.name}</span>
</button>