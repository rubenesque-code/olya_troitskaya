<script lang="ts" context="module">
	import { Carousel, Landscape } from '^components';
	import PortraitMainText from '^components/portrait/main-text.svelte';
	import Footer from '^components/portrait/footer.svelte';

	import { contact } from '^data';

	// TO DO
	// - icon
	// - structured data.

	// - max size for certain images?
	// - max size for all images?

	// if requested
	// - pause button

	// nice to have
	// arrows for left right
	// fast but not so fast transition on 0 or end slide

	// CHECKLIST
	// - slide counter timer
</script>

<script lang="ts">
	let aboutIsOpen = false;
</script>

<div class="flex justify-center bg-bg-primary">
	<main class="flex h-screen w-full flex-col gap-2 landscape:hidden">
		<div class="relative flex-grow overflow-hidden">
			<Carousel hideSlideCounter={aboutIsOpen} pause={aboutIsOpen} />

			{#if aboutIsOpen}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="absolute inset-0 z-10" on:click={() => (aboutIsOpen = false)} />
			{/if}

			<div
				class="absolute bottom-0 z-20 h-[48vh] overflow-y-auto bg-bg-primary p-6 transition-transform duration-300 ease-in-out scrollbar-none"
				style:transform={`translateY(${!aboutIsOpen ? 100 : 0}%)`}
				style:pointer-events={!aboutIsOpen ? 'none' : 'auto'}
			>
				<PortraitMainText />
			</div>
		</div>

		<Footer bind:aboutIsOpen />
	</main>

	<main class="flex h-screen w-full portrait:hidden landscape:gap-16 landscape:p-12">
		<Landscape.MainText />

		<div class="h-full w-[2px] bg-black portrait:hidden" />

		<div class="flex h-full w-full flex-col items-end justify-between portrait:hidden">
			<div><button class="text-[20px]" type="button">Contact</button></div>

			<div class="flex w-full flex-grow flex-col justify-center p-4">
				<div class="h-full max-h-[1200px]">
					<!-- <Carousel /> -->
				</div>
			</div>

			<div><button class="text-[20px]" type="button">London, E9</button></div>
		</div>
	</main>
</div>
