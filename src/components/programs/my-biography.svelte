<script>
  import me from '$img/me.png';
  const age = new Date().getFullYear() - 1999;
</script>

<div
  class="flex flex-col gap-4 items-center justify-center p-2 bg-white text-center w-72 h-[30rem] min-w-full min-h-full max-w-screen max-h-screen"
>
  <img class="w-56 rounded-sm select-none" src={me} alt="Raza Mahmood wearing sunglasses" />
  <h1 class="text-xl">Raza Mahmood</h1>
  <p>I am a {age} year old software developer who specializes in front end web development.</p>

  <div class="flex flex-col">
    <a class="text-w95-blue" href="mailto:razammahmood@gmail.com">razammahmood@gmail.com</a>
    <a class="text-w95-blue" href="https://github.com/RMMahmood">https://github.com/RazaMM</a>
    <a class="text-w95-blue" href="https://www.linkedin.com/in/rmmahmood/">https://www.linkedin.com/in/rmmahmood/</a>
  </div>
</div>
