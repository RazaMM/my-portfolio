<script>
  import '../app.pcss';
  import Taskbar from "../Taskbar.svelte";
  import { setContext } from 'svelte';
  import {list, open, active} from "../programs/programs.ts";

  setContext('programs', {
    list: list,
    active: active,
    open: open
  });
</script>

<main class="relative flex flex-col flex-1 bg-windows-cyan">
  <slot></slot>
</main>

<Taskbar />