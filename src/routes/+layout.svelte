<script>
    import '../app.pcss';
    import Taskbar from "$components/taskbar.svelte";
</script>

<main class="relative flex flex-col flex-1 bg-w95-cyan">
    <slot></slot>
</main>

<Taskbar/>