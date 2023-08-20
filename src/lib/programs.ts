import { get, writable } from 'svelte/store';
import type { ComponentType } from 'svelte';

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
