<script lang="ts" context="module">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	import { Picture } from '^components';

	import image from '^assets/images';

	let images = [
		image.work.burberry_pink_item,
		image.work.coloured_photos,
		image.work.burberry_pink_item,
		image.work.coloured_photos
		/* 		image.work.burberry_pink_item,
		image.work.coloured_photos,
		image.work.burberry_pink_item,
		image.work.coloured_photos */
	];
</script>

<script lang="ts">
	let activeIndex = 0;

	let intervalId: number;

	onMount(() => {
		intervalId = setInterval(() => {
			goNext();
		}, 2000);
	});

	// let lastInteraction: number;

	const goNext = () => {
		activeIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
	};

	const goPrev = () => {
		activeIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
	};

	const handleClick = (type: 'prev' | 'next') => {
		// lastInteraction = Date.now();

		clearInterval(intervalId);

		type === 'prev' ? goPrev() : goNext();

		setTimeout(() => {
			intervalId = setInterval(() => {
				goNext();
			}, 2000);
		}, 8000);
	};
</script>

<div class="relative h-full w-full overflow-hidden">
	<button
		class="absolute left-0 top-0 z-10 h-full w-1/2 cursor-w-resize"
		on:click={() => handleClick('prev')}
		type="button"
	/>
	<button
		class="absolute right-0 top-0 z-10 h-full w-1/2 cursor-e-resize"
		on:click={() => handleClick('next')}
		type="button"
	/>

	<div class="flex h-full w-full">
		{#each images as image, i}
			{#if activeIndex === i}
				<div class="h-full max-h-[1200px] w-full shrink-0" transition:fade>
					<Picture imageClass="w-full h-full object-contain" sizes="50vw" data={image} alt="" />
				</div>
			{/if}
		{/each}
	</div>
</div>
