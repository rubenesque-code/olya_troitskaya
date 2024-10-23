<script lang="ts" context="module">
	import { onMount } from 'svelte';
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
	export let pause = false;
	export let activeIndex: number;

	let direction: 'prev' | 'next' = 'next';

	let intervalIds: number[] = [];

	onMount(() => {
		/* 		console.log('===============================');
		console.log('MOUNT');
		console.log('==============================='); */

		const intervalId = setInterval(() => {
			// console.log('MOUNT ---> INTERVAL ---> GO ');
			goNext();
		}, config.interval);

		intervalIds.push(intervalId);
	});

	let pauseFlag: 'was paused' | 'idle' = 'idle';

	$: if (pause) {
		if (intervalIds.length) {
			/* 			console.log('===============================');
			console.log('PAUSE');
			console.log('==============================='); */

			intervalIds.forEach((intervalId) => clearInterval(intervalId));

			intervalIds = [];

			pauseFlag = 'was paused';
		}
	}

	// play after pause
	$: if (!pause && pauseFlag === 'was paused') {
		/* 		console.log('===============================');
		console.log('WAS PAUSED');
		console.log('==============================='); */

		pauseFlag = 'idle';

		const intervalId = setInterval(() => {
			// console.log('WAS PAUSED ---> INTERVAL ---> GO');

			if (direction === 'next') goNext();
			else goPrev();
		}, config.interval);

		intervalIds.push(intervalId);
	}

	const goNext = () => {
		activeIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
	};

	const goPrev = () => {
		activeIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
	};

	const handleInteraction = (type: 'prev' | 'next') => {
		/* 		console.log('===============================');
		console.log('HANDLE INTERACTION', type);
		console.log('==============================='); */

		if (intervalIds.length) {
			// console.log('HANDLE INTERACTION ---> CLEAR INTERVAL');

			intervalIds.forEach((intervalId) => clearInterval(intervalId));

			intervalIds = [];
		}

		direction = type;

		if (type === 'prev') {
			goPrev();
		} else {
			goNext();
		}

		const intervalId = setInterval(() => {
			// console.log('HANDLE INTERACTION ---> SET_INTERVAL -> GO');
			if (direction === 'next') goNext();
			else goPrev();
		}, config.interval);

		intervalIds.push(intervalId);
	};

	let mouseX: number;
	let mouseY: number;

	let leftHalf: HTMLButtonElement;
	$: leftRect = leftHalf?.getBoundingClientRect();

	let mouseInLeftHalf = false;

	let rightHalf: HTMLButtonElement;
	$: rightRect = rightHalf?.getBoundingClientRect();

	let mouseInRightHalf = false;
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
			class="absolute left-0 top-0 z-10 h-full w-1/2 cursor-none"
			on:click={() => handleInteraction('prev')}
			on:mouseenter={() => (mouseInLeftHalf = true)}
			on:mouseleave={() => (mouseInLeftHalf = false)}
			on:mousemove={(e) => {
				if (!leftRect) {
					return;
				}

				mouseX = e.clientX - leftRect.left;
				mouseY = e.clientY - leftRect.top;
			}}
			bind:this={leftHalf}
			type="button"
		>
			{#if mouseInLeftHalf}
				<div class="absolute z-50 h-[52px] w-[52px]" style="left: {mouseX}px; top: {mouseY}px;">
					<img src="left-arrow.png" alt="mouse cursor as left arrow" />
				</div>
			{/if}
		</button>

		<button
			class="absolute right-0 top-0 z-10 h-full w-1/2 cursor-none"
			on:click={() => handleInteraction('prev')}
			on:mouseenter={() => (mouseInRightHalf = true)}
			on:mouseleave={() => (mouseInRightHalf = false)}
			on:mousemove={(e) => {
				if (!rightRect) {
					return;
				}

				mouseX = e.clientX - rightRect.left;
				mouseY = e.clientY - rightRect.top;
			}}
			bind:this={rightHalf}
			type="button"
		>
			{#if mouseInRightHalf}
				<div class="absolute z-50 h-[52px] w-[52px]" style="left: {mouseX}px; top: {mouseY}px;">
					<img src="right-arrow.png" alt="mouse cursor as right arrow" />
				</div>
			{/if}
		</button>

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

	<div class="absolute -bottom-2 left-1/2 z-10 -translate-x-1/2 translate-y-full portrait:hidden">
		<p class="text-[11px] sm/md:text-[12px] md:text-[13px] lg:text-[14px] 2xl:text-[15px]">
			{activeIndex + 1} / {images.length}
		</p>
	</div>
</div>
