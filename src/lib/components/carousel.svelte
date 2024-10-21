<script lang="ts" context="module">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { swipe } from 'svelte-gestures';

	import images from '^content/image-carousel';

	import { Picture } from '^components';

	const config = {
		interval: 5000,
		delayAfterInteraction: 7000,
		delayAfterPause: 900
	};
</script>

<script lang="ts">
	export let hideSlideCounter = false;
	export let pause = false;
	export let activeIndex: number;

	let direction: 'prev' | 'next' = 'next';

	let intervalId: number | null;

	onMount(() => {
		console.log('===============================');
		console.log('MOUNT');
		console.log('===============================');

		intervalId = setInterval(() => {
			console.log('MOUNT ---> INTERVAL ---> GO ');
			goNext();
		}, config.interval);
	});

	let pauseFlag: 'was paused' | 'idle' = 'idle';

	$: if (pause) {
		if (intervalId) {
			console.log('===============================');
			console.log('PAUSE');
			console.log('===============================');

			clearInterval(intervalId);
			intervalId = null;

			pauseFlag = 'was paused';
		}
	}

	// play after pause
	$: if (!pause && pauseFlag === 'was paused') {
		console.log('===============================');
		console.log('WAS PAUSED');
		console.log('===============================');

		pauseFlag = 'idle';

		setTimeout(() => {
			if (direction === 'next') goNext();
			else goPrev();

			intervalId = setInterval(() => {
				console.log('WAS PAUSED ---> SET INTERVAL ---> GO');

				if (direction === 'next') goNext();
				else goPrev();
			}, config.interval);
		}, config.delayAfterPause);
	}

	const goNext = () => {
		activeIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
	};

	const goPrev = () => {
		activeIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
	};

	const handleInteraction = (type: 'prev' | 'next') => {
		console.log('===============================');
		console.log('HANDLE INTERACTION', type);
		console.log('===============================');

		if (intervalId) {
			console.log('HANDLE INTERACTION ---> CLEAR INTERVAL', intervalId);

			clearInterval(intervalId);
			intervalId = null;
		}

		direction = type;

		if (type === 'prev') {
			goPrev();
		} else {
			goNext();
		}

		setTimeout(() => {
			intervalId = setInterval(() => {
				console.log('HANDLE INTERACTION ---> SET_INTERVAL -> GO');
				if (direction === 'next') goNext();
				else goPrev();
			}, config.interval);
		}, config.delayAfterInteraction);
	};
</script>

<div
	class="relative h-full w-full"
	use:swipe={{ timeframe: 300, minSwipeDistance: 60 }}
	on:swipe={(e) => {
		const direction = e.detail.direction;

		if (direction !== 'left' && direction !== 'right') {
			return;
		}

		handleInteraction(direction === 'left' ? 'next' : 'prev');
	}}
>
	<div class="relative h-full w-full overflow-hidden">
		<button
			class="absolute left-0 top-0 z-10 h-full w-1/2"
			on:click={() => handleInteraction('prev')}
			type="button"
		/>
		<button
			class="absolute right-0 top-0 z-10 h-full w-1/2"
			on:click={() => handleInteraction('next')}
			type="button"
		/>

		<div
			class="absolute inset-0 flex h-full w-full transition-transform duration-300 ease-linear"
			style:transform={`translateX(-${activeIndex * 100}%)`}
		>
			{#each images as image}
				<div class="h-full w-full shrink-0">
					<Picture imageClass="w-full h-full object-contain" sizes="50vw" data={image} alt="" />
				</div>
			{/each}
		</div>
	</div>

	{#if !hideSlideCounter}
		<div class="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full" transition:fade>
			<p class="text-[11px] sm/md:text-[12px] md:text-[13px] lg:text-[14px] 2xl:text-[15px]">
				{activeIndex + 1} / {images.length}
			</p>
		</div>
	{/if}
</div>
