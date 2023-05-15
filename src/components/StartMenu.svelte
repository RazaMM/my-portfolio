<script>
  import TaskbarButton from "./TaskbarButton.svelte";
  import logo from "../icons/windows.png";

  let startMenuOpen = false;
</script>

<!-- Start Menu Button -->
<TaskbarButton
  icon={logo}
  iconAlt="Windows 95 Logo"
  text="Start"
  on:click={() => {
    startMenuOpen = !startMenuOpen;
  }}
/>


<!-- Start Menu Content-->
<div
  class="flex w-80 max-w-full gap-2 p-1.5 absolute bottom-full left-0 bg-w95-grey shadow-w95"
  class:invisible={!startMenuOpen}
>
  <!-- Sideways Text -->
  <span
    class="flex items-center w-8 py-2 text-xl text-white rotate-180 bg-w95-dark-grey vertical-writing-lr orientation-sideways tracking-widest"
  >Portfolio 95</span>

  <!-- Start Menu Items -->
  <div class="flex-1"></div>
</div>
