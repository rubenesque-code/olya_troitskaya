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

<main class="flex h-screen w-full landscape:gap-16 landscape:p-12">
	<Landscape.MainText />

	<div class="h-full w-[2px] bg-black portrait:hidden" />

	<div class="flex h-full w-full flex-col items-end justify-between portrait:hidden">
		<div><button class="text-[20px]" type="button">Contact</button></div>

		<div class="flex w-full flex-grow flex-col justify-center p-4">
			<div class="h-full max-h-[1200px]">
				<Carousel />
			</div>
		</div>

		<div><button class="text-[20px]" type="button">London, E9</button></div>
	</div>
</main>
