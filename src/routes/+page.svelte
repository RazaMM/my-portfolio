<script lang="ts">
  import Window from '$components/window.svelte';
  import { activeProgram, openPrograms, programs, type Program } from '$lib/programs';

  let stackingOrder: Program[] = [];

  $: {
    if (stackingOrder.length < $openPrograms.length) {
      // New program opened
      stackingOrder = [...stackingOrder, $openPrograms.at(-1) as Program];
    } else if (stackingOrder.length > $openPrograms.length) {
      // Program closed
      stackingOrder = stackingOrder.filter((program) => $openPrograms.includes(program));
    }

    if ($activeProgram !== null && $activeProgram !== (stackingOrder.at(-1) as Program)) {
      // Active program changed
      stackingOrder = [...stackingOrder.filter((p) => p.name !== $activeProgram?.name), $activeProgram];
    }
  }
</script>

<svelte:head>
  <title>Raza Mahmood's Portfolio</title>
</svelte:head>

<div class="flex flex-col flex-wrap items-center gap-4 w-fit max-h-[calc(100vh-40px)] p-2">
  {#each programs as program}
    <button class="flex flex-col items-center gap-0.5 w-fit h-fit" on:dblclick={() => openPrograms.open(program)}>
      <img class="h-10 rendering-pixelated" src={program.icon} alt="{program.name} icon" />
      <span class="text-white text-center">{program.name}</span>
    </button>
  {/each}
</div>

{#each stackingOrder as program (program.name)}
  <Window
    name={program.name}
    icon={program.icon}
    active={$activeProgram?.name === program.name}
    resizable={program.resizable}
    on:close={() => openPrograms.close(program)}
    on:mousedown={() => {
      activeProgram.set(program);
      stackingOrder = [...stackingOrder.filter((p) => p.name !== program.name), program];
    }}
  >
    <svelte:component this={program.default} />
  </Window>
{/each}
