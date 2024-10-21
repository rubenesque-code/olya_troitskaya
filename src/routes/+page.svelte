<script lang="ts" context="module">
	import { Carousel, Landscape } from '^components';
	import PortraitMainText from '^components/portrait/main-text.svelte';
	import Footer from '^components/portrait/footer.svelte';
	import { contact } from '^data';

	// TO DO
	// - carousel not working properly
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

	let activeIndex = 0;

	let isLandscape = false;

	let windowWidth: number;
	let windowHeight: number;

	$: if (windowWidth && windowHeight) {
		isLandscape = windowWidth > windowHeight;
	}
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

<div class="flex justify-center bg-bg-primary">
	{#if !isLandscape}
		<main class="flex h-screen w-full portrait:flex-col portrait:gap-2">
			<div class="relative flex-grow overflow-hidden">
				<Carousel bind:activeIndex hideSlideCounter={aboutIsOpen} pause={aboutIsOpen} />

				{#if aboutIsOpen}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="absolute inset-0 z-10" on:click={() => (aboutIsOpen = false)} />
				{/if}

				<div
					class="absolute bottom-0 z-20 h-[48vh] overflow-y-auto bg-bg-primary p-6 transition-transform duration-300 ease-in-out scrollbar-none landscape:hidden"
					style:transform={`translateY(${!aboutIsOpen ? 100 : 0}%)`}
					style:pointer-events={!aboutIsOpen ? 'none' : 'auto'}
				>
					<PortraitMainText />
				</div>
			</div>

			<Footer bind:aboutIsOpen />
		</main>
	{/if}

	{#if isLandscape}
		<main
			class="flex h-screen w-full max-w-[3200px] gap-3 p-4 md/lg:gap-5 xl:gap-12 xl:p-8 2xl:gap-14 2xl:p-12 3xl:gap-16"
		>
			<Landscape.MainText />

			<div class="h-full w-[1px] bg-black lg:w-[2px]" />

			<div
				class="flex h-full w-full flex-col items-end justify-between gap-1 sm:gap-[5px] xl:gap-4"
			>
				<a
					class="text-[13px] sm:text-[14px] sm/md:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]"
					href={`mailto:${contact.email}`}>Contact</a
				>

				<div class="flex w-full flex-grow flex-col justify-center p-4">
					<div class="h-full max-h-[1200px]">
						<Carousel bind:activeIndex hideSlideCounter={aboutIsOpen} pause={aboutIsOpen} />
					</div>
				</div>

				<div>
					<p
						class="text-[13px] sm:text-[14px] sm/md:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]"
					>
						London, E9
					</p>
				</div>
			</div>
		</main>
	{/if}
</div>
