import { get, writable } from "svelte/store";

import MyBiographyComponent from "$components/my-biography.svelte";
import MyBiographyIcon from "$icons/bio.png";

import MyEducationComponent from "$components/my-education.svelte";
import MyEducationIcon from "$icons/book.png";

import MyExperienceComponent from "$components/my-experience.svelte";
import MyExperienceIcon from "$icons/notepad.png";

import MinesweeperComponent from "$components/minesweeper.svelte";
import MinesweeperIcon from "$icons/minesweeper.png";

export type Program = {
    name: string,
    component: typeof MyBiographyComponent,
    resizeable?: boolean,
    icon?: string
}

export const MyBiography: Program = {
    name: "My Biography",
    icon: MyBiographyIcon,
    resizeable: true,
    component: MyBiographyComponent
}

export const MyEducation: Program = {
    name: "My Education",
    icon: MyEducationIcon,
    resizeable: true,
    component: MyEducationComponent
}

export const MyExperience: Program = {
    name: "My Experience",
    icon: MyExperienceIcon,
    resizeable: true,
    component: MyExperienceComponent
}

export const Minesweeper: Program = {
    name: "Minesweeper",
    icon: MinesweeperIcon,
    resizeable: false,
    component: MinesweeperComponent
}

export const programs = [
    MyBiography,
    MyEducation,
    MyExperience
];

export const activeProgram = writable(null as Program | null);

const { subscribe, set } = writable([] as Program[]);

export const openPrograms = {
    subscribe,
    open: (program: Program) => {
        const current = get(openPrograms);
        activeProgram.set(program);

        if (current.find(p => p.name === program.name)) {
            return;
        }

        set([...current, program]);
    },
    close: (program: Program) => {
        const current = get(openPrograms);

        if (get(activeProgram) === program) {
            activeProgram.set(null);
        }

        set(current.filter(p => p.name !== program.name));
    }
}