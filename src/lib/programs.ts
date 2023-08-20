import { get, writable } from 'svelte/store';
import type { ComponentType } from 'svelte';

import MyBiographyComponent from '$programs/my-biography.svelte';
import MyBiographyIcon from '$icons/bio.png';

import MyEducationComponent from '$programs/my-education.svelte';
import MyEducationIcon from '$icons/book.png';

import MyExperienceComponent from '$programs/my-experience.svelte';
import MyExperienceIcon from '$icons/notepad.png';

import MinesweeperComponent from '$programs/minesweeper.svelte';
import MinesweeperIcon from '$icons/minesweeper.png';

export type Program = {
  name: string;
  component: ComponentType;
  resizable?: boolean;
  icon?: string;
};

export const MyBiography: Program = {
  name: 'My Biography',
  icon: MyBiographyIcon,
  resizable: true,
  component: MyBiographyComponent
};

export const MyEducation: Program = {
  name: 'My Education',
  icon: MyEducationIcon,
  resizable: true,
  component: MyEducationComponent
};

export const MyExperience: Program = {
  name: 'My Experience',
  icon: MyExperienceIcon,
  resizable: true,
  component: MyExperienceComponent
};

export const Minesweeper: Program = {
  name: 'Minesweeper',
  icon: MinesweeperIcon,
  resizable: false,
  component: MinesweeperComponent
};

export const programs = [MyBiography, MyEducation, MyExperience];

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
