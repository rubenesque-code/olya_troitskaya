<script lang="ts" context="module">
	import { onMount } from 'svelte';

	import images from '^content/image-carousel';

	import { Picture } from '^components';
	import { fade } from 'svelte/transition';

	const config = {
		interval: 5000,
		pauseAfterClick: 20000
	};
</script>

<script lang="ts">
	export let hideSlideCounter = false;
	export let pause = false;
	$: console.log('pause:', pause);

	let activeIndex = 0;

	let direction: 'prev' | 'next' = 'next';

	let intervalStatus: 'not-init' | 'init' = 'not-init';
	let intervalId: number | null;
	$: console.log('intervalId:', intervalId);

	onMount(() => {
		intervalId = setInterval(() => {
			goNext();
			intervalStatus = 'init';
		}, config.interval);
	});

	$: if (pause) {
		if (intervalId) {
			console.log('CLEARING INTERVAL');
			clearInterval(intervalId);
			intervalId = null;
		}
	} else if (intervalStatus === 'init' && !pause && !intervalId) {
		console.log('SET INTERVAL AFTER PAUSE');

		intervalId = setInterval(() => {
			if (direction === 'next') goNext();
			else goPrev();
		}, config.interval);
	}

	const goNext = () => {
		activeIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
	};

	const goPrev = () => {
		activeIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
	};

	const handleClick = (type: 'prev' | 'next') => {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}

		if (type === 'prev') {
			direction = 'prev';
			goPrev();
		} else {
			direction = 'next';
			goNext();
		}

		setTimeout(() => {
			intervalId = setInterval(() => {
				if (direction === 'next') goNext();
				else goPrev();
			}, config.interval);
		}, config.pauseAfterClick);
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
