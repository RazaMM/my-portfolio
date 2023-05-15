import {get, writable} from "svelte/store";
import type {SvelteComponent} from "svelte";
import MyBio from "../components/MyBio.svelte";
import bioIcon from "../icons/bio.png";

export type Program = {
  name: string,
  component: SvelteComponent,
  icon?: string
}

// A list of all the lib available mapped by name
export const programList = {
  "myBio": {
    "name": "My Bio",
    "icon": bioIcon,
    "component": MyBio
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