import {get, writable} from "svelte/store";
import type {SvelteComponent} from "svelte";

export type Program = {
  name: string,
  component: SvelteComponent,
  icon?: string
}

export const activeProgram = writable(null as Program | null);

const {subscribe, set, update} = writable([] as Program[]);

export const programs = {
  subscribe,
  open: (program: Program) => {
    const current = get(programs);

    if (current.find(p => p.name === program.name)) {
      activeProgram.set(program);
      return;
    }

    set([...current, program]);
  },
  close: (program: Program) => {
    const current = get(programs);

    if (get(activeProgram) === program) {
      activeProgram.set(null);
    }

    set(current.filter(p => p.name !== program.name));
  }
}

