<script>
  import TaskbarButton from "./TaskbarButton.svelte";
  import TaskbarClock from "./TaskbarClock.svelte";
  import StartMenu from "./StartMenu.svelte";
  import {getContext, onDestroy} from "svelte";

  const {list, open, active} = getContext('programs');
</script>

<footer class="relative flex items-center w-full p-2 gap-6 bg-w95-grey shadow-w95 select-none z-50">
  <StartMenu />

  <!-- Open windows -->
  <div class="flex-1 flex items-center gap-6">
    {#each $open as program}
      <TaskbarButton text={program.name} />
    {/each}
  </div>

  <TaskbarClock />
</footer>