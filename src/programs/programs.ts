import TestWindow from "./TestProgram.svelte";
import {get, writable} from "svelte/store";
import type {SvelteComponent} from "svelte";

type Program = {
  name: string,
  component: SvelteComponent,
  icon?: string
}

// A list of all the programs available mapped by name
export const list = {
  "test": {
    "name": "test",
    "component": TestWindow
  },
  "test2": {
    "name": "test2",
    "component": TestWindow
  }
}

// A list of the currently open programs
const {subscribe, set, update} = writable([] as Program[]);
export const open = {
  subscribe,
  add: (program: Program) => {
    const current = get(open);

    if (current.find(p => p.name === program.name)) {
      return;
    }

    set([...current, program]);
  },
  remove: (program: Program) => {
    const current = get(open);
    set(current.filter(p => p.name !== program.name));
  }
}

export const active = writable(null as Program | null);