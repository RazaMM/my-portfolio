<script context="module">
  import Icon from '$img/notepad.png';

  export const name = 'My Experience';
  export const icon = Icon;
  export const resizable = true;
</script>

<script lang="ts">
  type Experience = {
    title: string;
    start: string;
    end: string;
    company: string;
    location: string;
    description: string[];
  };

  const experiences: Experience[] = [
    {
      title: 'Front End Web Developer (Co-op)',
      start: 'September 2019',
      end: 'August 2021',
      company: 'University of Guelph - Communications & Public Affairs',
      location: 'Guelph, Ontario, Canada',
      description: [
        'Led a self-managed project to revamp the University campus map using the Google Maps JavaScript API, resulting in an improved user experience.',
        "Assisted with regular web maintenance and bug fixing, ensuring smooth and error-free operation of the University's web properties.",
        'Developed and implemented several responsive Web Components (using JavaScript), streamlining the development process across several university departments.'
      ]
    },
    {
      title: 'Freelance Web Developer/Designer',
      start: 'April 2022',
      end: 'May 2022',
      company: 'Adorable Aliens',
      location: 'Ontario, Canada',
      description: [
        'Designed and developed a custom website for an art project using React, Styled Components and Gatsby.',
        'Created a responsive design that worked well on both desktop and mobile devices.',
        'Used version control tools such as Git to manage the codebase and collaborate with other developers.'
      ]
    },
    {
      title: 'Freelance Web Developer/Designer',
      start: 'January 2023',
      end: 'February 2023',
      company: 'Inspectech Services',
      location: 'Mississauga, Ontario, Canada',
      description: [
        'Designed and implemented a website for a home inspection company.',
        "Utilized SvelteKit and TailwindCSS to build the website's front-end design, ensuring a visually appealing and functional experience for users.",
        'Implemented a simple email booking form using EmailJS, allowing users to book appointments with the company through the website.'
      ]
    }
    /*
    {
      title: 'Front End Web Intern',
      start: 'June 2023',
      end: 'Current',
      company: 'University of Guelph - Communications & Marketing',
      location: 'Guelph, Ontario, Canada',
      description: [
        "Led the development of a web component library using StencilJS, allowing for the creation of reusable components across the University's web properties.",
        'Assisted with the development of a handful of new web pages including a revamped homepage, using GatsbyJS and React.',
        'Performed regular web maintenance and bug fixing, ensuring a smooth, accessible and error-free experience for users.'
      ]
    }*/
  ];

  let idx = 0;
</script>

<div class="flex flex-col p-2 justify-between bg-white w-96 min-w-full min-h-full max-w-full">
  <div class="flex flex-col">
    <span class="text-2xl">{experiences[idx].title}</span>
    <span>{experiences[idx].start} - {experiences[idx].end}</span>
    <span>{experiences[idx].company} - {experiences[idx].location}</span>

    <span class="w-full my-2" />

    <ul class="flex flex-col gap-2 items-start list-inside list-disc">
      {#each experiences[idx].description as description}
        <li>{description}</li>
      {/each}
    </ul>
  </div>

  <div class="flex w-full justify-between">
    {#if idx !== 0}
      <button class="text-2xl user-select-none" on:click={() => idx--}>&lt;-</button>
    {/if}

    {#if idx !== experiences.length - 1}
      <button class="text-2xl ml-auto user-select-none" on:click={() => idx++}>-&gt;</button>
    {/if}
  </div>
</div>
