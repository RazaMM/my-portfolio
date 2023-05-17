<script lang="ts">
  type Experience = {
    title: string,
    start: string,
    end: string,
    company: string,
    location: string,
    description: string[],
  }

  const experiences: Experience[] = [
    {
      title: 'Front End Web Developer (Co-op)',
      start: 'September 2019',
      end: 'August 2021',
      company: 'University of Guelph',
      location: 'Guelph, Ontario, Canada',
      description: [
        'Led a self-managed project to revamp the University campus map using the Google Maps JavaScript API, resulting in an improved user experience.',
        'Assisted with regular web maintenance and bug fixing, ensuring smooth and error-free operation of the University\'s web properties.',
        'Developed and implemented several responsive Web Components (using JavaScript), streamlining the development process across several university departments.',
      ],
    },
    {
      title: 'Freelance Web Developer/Designer',
      start: 'April 2022',
      end: 'May 2022',
      company: 'Adorable Aliens NFT',
      location: 'Ontario, Canada',
      description: [
        'Designed and developed a custom website for an NFT project using React, Styled Components and Gatsby.',
        'Created a responsive design that worked well on both desktop and mobile devices.',
        'Used version control tools such as Git to manage the codebase and collaborate with other developers.',
      ],
    },
    {
      title: 'Freelance Web Developer/Designer',
      start: 'January 2023',
      end: 'February 2023',
      company: 'Inspectech Services',
      location: 'Mississauga, Ontario, Canada',
      description: [
        'Designed and implemented a website for a home inspection company.',
        'Utilized SvelteKit and TailwindCSS to build the website\'s front-end design, ensuring a visually appealing and functional experience for users.',
        'Implemented a simple email booking form using EmailJS, allowing users to book appointments with the company through the website.',
      ],
    }
  ];

  let idx = 0;

  const next = () => {
    idx = (idx + 1) % experiences.length;
  }

  const prev = () => {
    idx = (idx - 1 + experiences.length) % experiences.length;
  }
</script>

<div class="flex flex-col p-2 justify-between bg-white w-96 min-w-full min-h-full max-w-screen max-h-screen">
  <div class="flex flex-col">
    <span class="text-2xl">{experiences[idx].title}</span>
    <span>{experiences[idx].start} - {experiences[idx].end}</span>
    <span>{experiences[idx].company} - {experiences[idx].location}</span>

    <span class="w-full my-2"></span>

    <ul class="flex flex-col gap-2 items-start list-inside list-disc">
      {#each experiences[idx].description as description}
        <li>{description}</li>
      {/each}
    </ul>
  </div>

  <div class="flex w-full justify-between">
    <button class="text-2xl" on:click={prev}>&lt;-</button>
    <button class="text-2xl" on:click={next}>-&gt;</button>
  </div>
</div>