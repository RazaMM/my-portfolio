<script lang="ts">
    import { activeProgram, openPrograms, programs } from "$lib/programs";
    import { onMount } from "svelte";
    import logo from "$icons/windows.png";
    import { focusWithin } from "$lib/focus-within";

    /* Clock logic */
    let hours = "0";
    let minutes = "0";
    let amOrPm = "AM";

    const updateClock = () => {
        const date = new Date();
        const hours24 = date.getHours();

        hours = (hours24 % 12 || 12).toString();
        minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes().toString();
        amOrPm = hours24 >= 12 ? "PM" : "AM";
    };

    onMount(() => {
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    });

    /* Start Menu logic */
    let startMenuOpen = false;
</script>

<footer class="relative flex items-center w-full p-2 gap-6 bg-w95-grey shadow-w95 select-none z-50">
    <!-- Start Menu -->
    <div
        use:focusWithin
        on:focusoutside={() => {
            startMenuOpen = false;
        }}
        tabindex="-1"
    >
        <!-- Start Menu Button -->
        <button
            class="flex items-center gap-1 px-2 shadow-w95 whitespace-nowrap active:shadow-w95-inverted"
            class:shadow-w95-inverted={startMenuOpen}
            on:click={() => (startMenuOpen = !startMenuOpen)}
        >
            <img src={logo} alt="w icon" class="h-6 rendering-pixelated" />
            <span class="block h-full overflow-hidden text-ellipsis whitespace-nowrap">Start</span>
        </button>

        <!-- Start Menu Content-->
        <div
            class="flex w-80 max-w-full gap-2 p-1.5 absolute bottom-full left-0 bg-w95-grey shadow-w95"
            class:invisible={!startMenuOpen}
        >
            <!-- Sideways Text -->
            <span
                class="flex items-center w-8 py-2 text-xl text-white rotate-180 bg-w95-dark-grey vertical-writing-lr orientation-sideways tracking-widest"
                >Portfolio 95</span
            >

            <!-- Start Menu Items -->
            <div class="flex-1 flex flex-col justify-end">
                {#each programs as program}
                    <button
                        class="flex items-center gap-1 p-1 w-full h-10 hover:bg-w95-blue hover:text-white focus:outline-none focus:bg-w95-blue focus:text-white"
                        on:click={() => openPrograms.open(program)}
                    >
                        {#if program.icon}
                            <img src={program.icon} alt="{program.name} icon" class="h-full rendering-pixelated" />
                        {/if}
                        <span>{program.name}</span>
                    </button>
                {/each}

                <hr class="h-2 shadow-windows w-full" />

                <button
                    class="flex items-center gap-1 p-1 w-full h-10 hover:bg-w95-blue hover:text-white focus:outline-none focus:bg-w95-blue focus:text-white"
                >
                    <span>Shut Down...</span>
                </button>
            </div>
        </div>
    </div>

    <!-- Open programs -->
    <div class="flex-1 flex items-center gap-6">
        {#each $openPrograms as program}
            <button
                class="flex items-center gap-1 px-2 shadow-w95 whitespace-nowrap active:shadow-w95-inverted"
                class:shadow-w95-inverted={$activeProgram === program}
                on:click={() => activeProgram.set(program)}
            >
                {#if program.icon}
                    <img src={program.icon} alt="{program.name} icon" class="h-6 rendering-pixelated" />
                {/if}
                <span class="block h-full overflow-hidden text-ellipsis whitespace-nowrap">{program.name}</span>
            </button>
        {/each}
    </div>

    <!-- Clock -->
    <div class="shadow-w95-inverted-thin px-3 whitespace-nowrap">
        <span>{hours}:{minutes} {amOrPm}</span>
    </div>
</footer>
