<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  export let name: string;
  export let icon = '';
  export let resizable = true;
  export let active = false;

  const taskbarHeight = 40;

  let el: HTMLElement | null = null; // The window's main div
  let screenWidth = 0;
  let screenHeight = 0;

  // Drag variables and state
  const minX = 5;
  const minY = 6;
  let x = minX;
  let y = minY;
  let startDragX = 0;
  let startDragY = 0;

  // Resize variables and state
  const minWidth = 160;
  const minHeight = 80;
  let width = minWidth;
  let height = minHeight;
  let resizeDir = '';
  let startResizeX = 0;
  let startResizeY = 0;

  const dispatch = createEventDispatcher();

  const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  };

  // Drag handlers
  const dragStart = (e: MouseEvent) => {
    startDragX = e.pageX;
    startDragY = e.pageY;

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragStop);

    // Disable text selection
    document.body.classList.add('select-none');
  };

  const drag = (e: MouseEvent) => {
    if (!el) return;

    const maxX = screenWidth - el.offsetWidth - minX;
    const maxY = screenHeight - el.offsetHeight - taskbarHeight - minY;

    x = clamp(x + (e.pageX - startDragX), minX, maxX);
    y = clamp(y + (e.pageY - startDragY), minY, maxY);

    startDragX = e.pageX;
    startDragY = e.pageY;
  };

  const dragStop = () => {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', dragStop);

    // Re-enable text selection
    document.body.classList.remove('select-none');
  };

  // Resize handlers
  const resizeStart = (e: MouseEvent) => {
    startResizeX = e.pageX;
    startResizeY = e.pageY;
    resizeDir = (e.target as HTMLElement).getAttribute('data-dir') || '';

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

    // Disable text selection
    document.body.classList.add('select-none');
  };
  
  const resize = (e: MouseEvent) => {
    const resizeX = e.pageX - startResizeX;
    const resizeY = e.pageY - startResizeY;

    let newWidth = width;
    let newHeight = height;
    let newX = x;
    let newY = y;

    if (resizeDir === 'left' || resizeDir === 'up-left' || resizeDir === 'down-left') {
      newWidth = x === minX ? width : clamp(width - resizeX, minWidth, screenWidth - x);
      newX = newWidth === minWidth ? x : clamp(x + resizeX, minX, screenWidth - minWidth - minX);
    }

    if (resizeDir === 'right' || resizeDir === 'up-right' || resizeDir === 'down-right') {
      newWidth = clamp(width + resizeX, minWidth, screenWidth - x - minX);
    }

    if (resizeDir === 'up' || resizeDir === 'up-left' || resizeDir === 'up-right') {
      newHeight = y === minY ? height : clamp(height - resizeY, minHeight, screenHeight - y - taskbarHeight);
      newY = newHeight === minHeight ? y : clamp(y + resizeY, minY, screenHeight - minHeight - taskbarHeight - minY);
    }

    if (resizeDir === 'down' || resizeDir === 'down-left' || resizeDir === 'down-right') {
      newHeight = clamp(height + resizeY, minHeight, screenHeight - y - taskbarHeight);
    }

    width = newWidth;
    height = newHeight;
    x = newX;
    y = newY;

    startResizeX = e.pageX;
    startResizeY = e.pageY;
  };

  const resizeStop = () => {
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', resizeStop);

    // Reset the cursor
    document.body.classList.remove('cursor-w95-ew-resize');
    document.body.classList.remove('cursor-w95-ns-resize');
    document.body.classList.remove('cursor-w95-nwse-resize');
    document.body.classList.remove('cursor-w95-nesw-resize');

    // Re-enable text selection
    document.body.classList.remove('select-none');
  };

  // On mount, the window should be centered and be auto-sized
  onMount(() => {
    if (!el) return;

    width = clamp(el.offsetWidth, minWidth, screenWidth - minX * 2);
    height = clamp(el.offsetHeight, minHeight, screenHeight - taskbarHeight - minY * 2);
    x = Math.max((screenWidth - el.offsetWidth) / 2, minX);
    y = Math.max((screenHeight - el.offsetHeight - taskbarHeight) / 2, minY);
  });

  $: el && (el.style.width = `${width}px`);
  $: el && (el.style.height = `${height}px`);
  $: el && (el.style.transform = `translate(${x}px, ${y}px)`);
</script>

<svelte:window bind:innerWidth={screenWidth} bind:innerHeight={screenHeight} />

<div
  class="absolute z-20 flex flex-col gap-1 p-1 w-full h-full md:w-auto md:h-auto min-w-[10rem] min-h-[5rem] max-h-full max-w-full translate-x-[calc(50vw_-_50%)] translate-y-[calc(50vh_-_50%-20px)] bg-w95-grey shadow-w95"
  class:z-30={active}
  bind:this={el}
  on:mousedown={() => dispatch('mousedown')}
>
  <!-- Resize areas -->
  {#if resizable}
    <div class="absolute right-full w-2 h-full cursor-w95-ew-resize" on:mousedown={resizeStart} data-dir="left" />

    <div class="absolute left-full w-2 h-full cursor-w95-ew-resize" on:mousedown={resizeStart} data-dir="right" />

    <div class="absolute bottom-full w-full h-2 cursor-w95-ns-resize" on:mousedown={resizeStart} data-dir="up" />

    <div class="absolute top-full w-full h-2 cursor-w95-ns-resize" on:mousedown={resizeStart} data-dir="down" />

    <div
      class="absolute bottom-full right-full w-2 h-2 cursor-w95-nwse-resize"
      on:mousedown={resizeStart}
      data-dir="up-left"
    />

    <div
      class="absolute bottom-full left-full w-2 h-2 cursor-w95-nesw-resize"
      on:mousedown={resizeStart}
      data-dir="up-right"
    />

    <div
      class="absolute top-full right-full w-2 h-2 cursor-w95-nesw-resize"
      on:mousedown={resizeStart}
      data-dir="down-left"
    />

    <div
      class="absolute top-full left-full w-2 h-2 cursor-w95-nwse-resize"
      on:mousedown={resizeStart}
      data-dir="down-right"
    />
  {/if}

  <!-- Title bar and drag area -->
  <div
    class="flex h-6 gap-2 items-center text-white px-2 select-none"
    class:bg-w95-dark-grey={!active}
    class:bg-w95-blue={active}
    on:mousedown={dragStart}
  >
    <!-- Icon -->
    {#if icon}
      <img class="h-4 rendering-pixelated" src={icon} alt="{name} icon" />
    {/if}

    <!-- Title -->
    <span class="block h-full overflow-hidden text-ellipsis whitespace-nowrap mr-auto">{name}</span>

    <!-- Close button -->
    <button
      class="flex h-4 items-center justify-center text-black bg-w95-grey shadow-w95-thin active:shadow-w95-inverted-thin aspect-square"
      on:click={() => dispatch('close')}
    >
      <span class="text-sm">X</span>
    </button>
  </div>

  <!-- Window Content -->
  <div class="flex-1 w-full overflow-auto">
    <slot />
  </div>
</div>
