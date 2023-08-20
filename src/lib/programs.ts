import { get, writable } from 'svelte/store';
import type { ComponentType } from 'svelte';

// To add a new program, create a new svelte file in src/programs/ with a script module with exports for name, resizable, icon. Then import it here as a namespace and add it to the programs array.

import * as MyBiography from '$programs/my-biography.svelte';
import * as MyEducation from '$programs/my-education.svelte';
import * as MyExperience from '$programs/my-experience.svelte';

export type Program = {
  name: string;
  default: ComponentType;
  resizable: boolean;
  icon: string;
};

export const programs: Program[] = [MyBiography, MyEducation, MyExperience];

export const activeProgram = writable(null as Program | null);

const { subscribe, set } = writable([] as Program[]);

export const openPrograms = {
  subscribe,
  open: (program: Program) => {
    const current = get(openPrograms);
    activeProgram.set(program);

    if (current.find((p) => p.name === program.name)) {
      return;
    }

    set([...current, program]);
  },
  close: (program: Program) => {
    const current = get(openPrograms);

    if (get(activeProgram) === program) {
      activeProgram.set(null);
    }

    set(current.filter((p) => p.name !== program.name));
  }
};
