import TestWindow from "../components/TestProgram.svelte";
import {get, writable} from "svelte/store";
import type {SvelteComponent} from "svelte";

export type Program = {
  name: string,
  component: SvelteComponent,
  icon?: string
}

// A list of all the lib available mapped by name
export const programList = {
  "test": {
    "name": "test",
    "component": TestWindow
  },
  "test2": {
    "name": "test2",
    "component": TestWindow
  }
}

// A list of the currently open lib
const {subscribe, set, update} = writable([] as Program[]);

export const openPrograms = {
  subscribe,
  add: (program: Program) => {
    const current = get(openPrograms);

    if (current.find(p => p.name === program.name)) {
      return;
    }

    set([...current, program]);
  },
  remove: (program: Program) => {
    const current = get(openPrograms);
    set(current.filter(p => p.name !== program.name));
  }
}

export const activeProgram = writable(null as Program | null);