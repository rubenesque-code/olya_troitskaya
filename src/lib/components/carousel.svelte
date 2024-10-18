<script lang="ts" context="module">
	import { onMount } from 'svelte';

	import images from '^content/image-carousel';

	import { Picture } from '^components';
	import { fade } from 'svelte/transition';

	const config = {
		interval: 15000,
		pauseAfterClick: 20000
	};
</script>

<script lang="ts">
	export let hideSlideCounter = false;

	let activeIndex = 0;

	let intervalId: number;

	onMount(() => {
		intervalId = setInterval(() => {
			goNext();
		}, config.interval);
	});

	const goNext = () => {
		activeIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
	};

	const goPrev = () => {
		activeIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
	};

	const handleClick = (type: 'prev' | 'next') => {
		clearInterval(intervalId);

		type === 'prev' ? goPrev() : goNext();

		/* 		setTimeout(() => {
			intervalId = setInterval(() => {
				goNext();
			}, config.interval);
		}, config.pauseAfterClick); */
	};
</script>

<div class="relative h-full w-full">
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

		<div
			class="absolute inset-0 flex h-full w-full transition-transform duration-300 ease-linear"
			style:transform={`translateX(-${activeIndex * 100}%)`}
		>
			{#each images as image, i}
				<div class="h-full w-full shrink-0">
					<Picture imageClass="w-full h-full object-contain" sizes="50vw" data={image} alt="" />
				</div>
			{/each}
		</div>
	</div>

	{#if !hideSlideCounter}
		<div class="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full" transition:fade>
			<p class="text-[11px] font-light">
				{activeIndex + 1} / {images.length}
			</p>
		</div>
	{/if}
</div>
