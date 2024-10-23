<script lang="ts" context="module">
	import { Carousel, Landscape } from '^components';
	import PortraitMainText from '^components/portrait/main-text.svelte';
	import Footer from '^components/portrait/footer.svelte';

	import { contact } from '^data';

	// TO DO

	// MAYBE
	// - pause on image not loaded
	// - lossless
	// - alt from file name?
	// - max size for certain images?
	// - max size for all images?

	// IF REQUESTED
	// - pause button

	// NICE TO HAVE
	// fast but not so fast transition on 0 or end slide
	// remount carousel on page size change

	// CHECKLIST
	// - slide counter timer
</script>

<script lang="ts">
	let aboutIsOpen = false;

	let activeIndex = 0;

	let isLandscape: boolean;

	let windowWidth: number;
	let windowHeight: number;

	$: if (windowWidth && windowHeight) {
		isLandscape = windowWidth > windowHeight;
	}

	let portraitMountPoint: HTMLDivElement;
	let landscapeMountPoint: HTMLDivElement;

	$: activePoint = isLandscape
		? landscapeMountPoint
			? landscapeMountPoint
			: portraitMountPoint
		: portraitMountPoint
			? portraitMountPoint
			: landscapeMountPoint;

	$: rect = activePoint?.getBoundingClientRect();

	let aboutMaxHeight: number;
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

{#if isLandscape !== undefined && rect}
	<div
		class="fixed z-10"
		style:left={`${rect.left}px`}
		style:top={`${rect.top}px`}
		style:width={`${rect.width}px`}
		style:height={`${rect.height}px`}
	>
		<Carousel bind:activeIndex pause={aboutIsOpen} />
	</div>
{/if}

<div class="flex justify-center bg-bg-primary">
	{#if isLandscape !== undefined}
		{#if !isLandscape}
			<main class="flex h-screen w-full portrait:flex-col portrait:gap-2">
				<div class="relative flex-grow overflow-hidden">
					<div class="h-full w-full" bind:this={portraitMountPoint} />

					{#if aboutIsOpen}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div class="absolute inset-0 z-20" on:click={() => (aboutIsOpen = false)} />
					{/if}

					<div
						class="absolute -bottom-[1px] z-30 box-content h-[48vh] overflow-y-auto bg-bg-primary p-6 transition-transform duration-300 ease-in-out scrollbar-none landscape:hidden"
						style:transform={`translateY(${!aboutIsOpen ? 100 : 0}%)`}
						style:pointer-events={!aboutIsOpen ? 'none' : 'auto'}
						style:max-height={!aboutMaxHeight ? 'auto' : `${aboutMaxHeight + 1}px`}
					>
						<PortraitMainText bind:height={aboutMaxHeight} />
					</div>
				</div>

				<Footer bind:aboutIsOpen {activeIndex} />
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

					<div class="flex w-full flex-grow flex-col justify-center">
						<div class="h-full w-full" bind:this={landscapeMountPoint} />
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
	{/if}
</div>
