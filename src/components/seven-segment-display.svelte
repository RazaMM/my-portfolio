<script lang="ts">
  export let value = '';
  let digits: number[] = [];

  const map = {
    '0': 0b0111111,
    '1': 0b0000110,
    '2': 0b1011011,
    '3': 0b1001111,
    '4': 0b1100110,
    '5': 0b1101101,
    '6': 0b1111101,
    '7': 0b0000111,
    '8': 0b1111111,
    '9': 0b1101111
  };

  $: digits = value.split('').map((val) => map[val as keyof typeof map] || 0b0000000);

  const segmentOpacity = (digit: number, segment: number) => {
    return digit & (1 << segment) ? 1 : 0.25;
  };
</script>

<div class="flex h-[1em] w-fit bg-black">
  {#each digits as digit}
    <svg
      viewBox="0 0 460 880"
      class="h-[1em] p-0.5 rendering-pixelated fill-[#ff0000] stroke-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M320 120L420 0L40 5.68434e-14L140 120L320 120Z" opacity={segmentOpacity(digit, 0)} />
      <path d="M340 320L460 420L460 40L340 140L340 320Z" opacity={segmentOpacity(digit, 1)} />
      <path d="M340 740L460 840L460 460L340 560L340 740Z" opacity={segmentOpacity(digit, 2)} />
      <path d="M140 760L40 880L420 880L320 760L140 760Z" opacity={segmentOpacity(digit, 3)} />
      <path d="M120 560L5.68434e-14 460L5.68434e-14 840L120 740L120 560Z" opacity={segmentOpacity(digit, 4)} />
      <path d="M120 140L0 40L0 420L120 320L120 140Z" opacity={segmentOpacity(digit, 5)} />
      <path d="M320 500L380 440L320 380L140 380L80 440L140 500L320 500Z" opacity={segmentOpacity(digit, 6)} />
    </svg>
  {/each}
</div>
