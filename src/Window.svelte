<script>
  import {createEventDispatcher, onMount} from "svelte";

  export let title;
  export let icon = '';
  export let resizable = true;

  const taskbarHeight = 40;

  let el = null;
  let screenWidth = 0;
  let screenHeight = 0;

  const minX = 4;
  const minY = 4;
  let x = minX;
  let y = minY;
  let startDragX = 0;
  let startDragY = 0;

  const minWidth = 100;
  const minHeight = 100;
  let width = minWidth;
  let height = minHeight;
  let resizeDir = '';
  let startResizeX = 0;
  let startResizeY = 0;

  let minimized = false;

  // max-width: ${screenWidth - x}px; max-height: ${screenHeight - y}px

  const dispatch = createEventDispatcher();

  const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  }

  const dragStart = (e) => {
    startDragX = e.pageX;
    startDragY = e.pageY;

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragStop);
  }
  const drag = (e) => {
    const maxX = screenWidth - el.offsetWidth - minX;
    const maxY = screenHeight - el.offsetHeight - taskbarHeight - minY;

    x = clamp(x + (e.pageX - startDragX), minX, maxX);
    y = clamp(y + (e.pageY - startDragY), minY, maxY);

    startDragX = e.pageX;
    startDragY = e.pageY;
  }
  const dragStop = (e) => {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', dragStop);
  }

  const resizeStart = (e) => {
    startResizeX = e.pageX;
    startResizeY = e.pageY;
    resizeDir = e.target.getAttribute('data-dir');

    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', resizeStop);

    // Force the cursor to be the resize cursor
    switch (resizeDir) {
      case 'left':
      case 'right':
        document.body.classList.add('cursor-w95-ew-resize');
        break;
      case 'up':
      case 'down':
        document.body.classList.add('cursor-w95-ns-resize');
        break;
      case 'up-left':
      case 'down-right':
        document.body.classList.add('cursor-w95-nwse-resize');
        break;
      case 'up-right':
      case 'down-left':
        document.body.classList.add('cursor-w95-nesw-resize');
        break;
    }
  }

  const resize = (e) => {
    const resizeX = e.pageX - startResizeX;
    const resizeY = e.pageY - startResizeY;

    // TODO: extract common logic into separate functions for each direction, and clean this mess up
    // TODO: stop x/y position changing when min width/height is reached
    switch (resizeDir) {
      case 'left':
        width = clamp(width - resizeX, minWidth, screenWidth - x);
        x = clamp(x + resizeX, minX, screenWidth - minWidth - minX);
        break;
      case 'right':
        width = clamp(width + resizeX, minWidth, screenWidth - x);
        break;
      case 'up':
        height = clamp(height - resizeY, minHeight, screenHeight - y);
        y = clamp(y + resizeY, minY, screenHeight - minHeight - taskbarHeight - minY);
        break;
      case 'down':
        height = clamp(height + resizeY, minHeight, screenHeight - y - taskbarHeight);
        break;
      case 'up-left':
        width = clamp(width - resizeX, minWidth, screenWidth - x);
        x = clamp(x + resizeX, minX, screenWidth - minWidth - minX);
        height = clamp(height - resizeY, minHeight, screenHeight - y - taskbarHeight);
        y = clamp(y + resizeY, minY, screenHeight - minHeight - taskbarHeight - minY);
        break;
      case 'up-right':
        width = clamp(width + resizeX, minWidth, screenWidth - x);
        height = clamp(height - resizeY, minHeight, screenHeight - y - taskbarHeight);
        y = clamp(y + resizeY, minY, screenHeight - minHeight - taskbarHeight - minY);
        break;
      case 'down-left':
        width = clamp(width - resizeX, minWidth, screenWidth - x);
        x = clamp(x + resizeX, minX, screenWidth - minWidth - minX);
        height = clamp(height + resizeY, minHeight, screenHeight - y - taskbarHeight);
        break;
      case 'down-right':
        width = clamp(width + resizeX, minWidth, screenWidth - x);
        height = clamp(height + resizeY, minHeight, screenHeight - y - taskbarHeight);
        break;
    }

    startResizeX = e.pageX;
    startResizeY = e.pageY;
  }

  const resizeStop = (e) => {
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', resizeStop);

    // Reset the cursor
    document.body.classList.remove('cursor-w95-ew-resize');
    document.body.classList.remove('cursor-w95-ns-resize');
    document.body.classList.remove('cursor-w95-nwse-resize');
    document.body.classList.remove('cursor-w95-nesw-resize');
  }

  onMount(() => {
    width = el.offsetWidth;
    height = el.offsetHeight;
    x = Math.round((screenWidth - el.offsetWidth) / 2);
    y = Math.round((screenHeight - el.offsetHeight - taskbarHeight) / 2);
  });

  $: el && (el.style.width = `${width}px`);
  $: el && (el.style.height = `${height}px`);
  $: el && (el.style.transform = `translate(${x}px, ${y}px)`);
</script>

<svelte:window bind:innerWidth={screenWidth} bind:innerHeight={screenHeight}></svelte:window>

<div
  class="absolute z-20 flex flex-col min-w-[10rem] min-h-[10rem] max-h-full max-w-full translate-x-[calc(50vw_-_50%)] translate-y-[calc(50vh_-_50%-20px)] bg-w95-grey shadow-w95"
  bind:this={el}
>
  {#if resizable}
    <div
      class="absolute right-full w-2 h-full cursor-w95-ew-resize"
      on:mousedown={resizeStart}
      data-dir="left"
    ></div>

    <div
      class="absolute left-full w-2 h-full cursor-w95-ew-resize"
      on:mousedown={resizeStart}
      data-dir="right"
    ></div>

    <div
      class="absolute bottom-full w-full h-2 cursor-w95-ns-resize"
      on:mousedown={resizeStart}
      data-dir="up"
    ></div>

    <div
      class="absolute top-full w-full h-2 cursor-w95-ns-resize"
      on:mousedown={resizeStart}
      data-dir="down"
    ></div>

    <div
      class="absolute bottom-full right-full w-2 h-2 cursor-w95-nwse-resize"
      on:mousedown={resizeStart}
      data-dir="up-left"
    ></div>

    <div
      class="absolute bottom-full left-full w-2 h-2 cursor-w95-nesw-resize"
      on:mousedown={resizeStart}
      data-dir="up-right"
    ></div>

    <div
      class="absolute top-full right-full w-2 h-2 cursor-w95-nesw-resize"
      on:mousedown={resizeStart}
      data-dir="down-left"
    ></div>

    <div
      class="absolute top-full left-full w-2 h-2 cursor-w95-nwse-resize"
      on:mousedown={resizeStart}
      data-dir="down-right"
    ></div>
  {/if}

  <!-- Title bar -->
  <div
    class="flex h-6 gap-2 items-center m-1 bg-w95-blue text-white px-2 select-none"
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
      class="flex h-4 items-center justify-center text-black bg-w95-grey shadow-w95-thin active:shadow-w95-inverted-thin aspect-square"
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