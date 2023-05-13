<script>
  import {createEventDispatcher, onMount} from "svelte";

  export let title;
  export let icon = '';
  export let resizable = true;

  let el = null;
  let screenWidth = 0;
  let screenHeight = 0;

  let x = 'auto';
  let y = 'auto';
  let isDragging = false;
  let startDragX = 0;
  let startDragY = 0;

  let width = 0;
  let height = 0;
  let isResizing = false;
  let startResizeX = 0;
  let startResizeY = 0;

  let minimized = false;

  // max-width: ${screenWidth - x}px; max-height: ${screenHeight - y}px

  const dispatch = createEventDispatcher();

  const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  }

  const dragStart = (e) => {
    isDragging = true;
    startDragX = e.pageX;
    startDragY = e.pageY;

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragStop);

  }
  const drag = (e) => {
    if (isDragging) {
      x = clamp(x + (e.pageX - startDragX), 4, screenWidth - el.offsetWidth - 4);
      y = clamp(y + (e.pageY - startDragY), 4, screenHeight - el.offsetHeight - 40 - 4);
      startDragX = e.pageX;
      startDragY = e.pageY;
    }
  }
  const dragStop = (e) => {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', dragStop);
  }

  onMount(() => {
    x = Math.round((screenWidth - el.offsetWidth) / 2);
    y = Math.round((screenHeight - el.offsetHeight - 40) / 2);
  });

</script>

<svelte:window bind:innerWidth={screenWidth} bind:innerHeight={screenHeight}></svelte:window>

<div
  class="absolute z-20 flex flex-col min-w-[10rem] min-h-[10rem] translate-x-[calc(50vw_-_50%)] translate-y-[calc(50vh_-_50%-20px)] bg-windows-grey shadow-windows"
  style={`transform: translate(${x}px, ${y}px);`}
  bind:this={el}
>
  <div class="absolute left-full w-4 h-full"></div>
  <div class="absolute right-full w-4 h-full"></div>
  <div class="absolute top-full w-full h-4"></div>
  <div class="absolute bottom-full w-full h-4"></div>
  <!-- Title bar -->
  <div
    class="flex h-6 gap-2 items-center m-1 bg-windows-blue text-white px-2 select-none"
    on:mousedown={dragStart}
  >
    <!-- Icon -->
    {#if icon}
      <img class="h-4" src={icon} aria-hidden="true" alt=""/>
    {/if}

    <!-- Title -->
    <span class="block h-full overflow-hidden text-ellipsis whitespace-nowrap mr-auto">{title}</span>

    <!-- Close button -->
    <button
      class="flex h-4 items-center justify-center text-black bg-windows-grey shadow-windows-thin active:shadow-windows-inverted-thin aspect-square"
      on:click={() => dispatch('close')}
    >
      <span class="text-sm">X</span>
    </button>
  </div>

  <!-- Window Content -->
  <div class="flex flex-col flex-1 m-1 mb-3 max-w-full max-h-full overflow-auto">
    <slot/>
  </div>

</div>