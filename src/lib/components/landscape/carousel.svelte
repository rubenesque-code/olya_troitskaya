<script lang="ts">
	import { Carousel } from '^components';

	export let hideSlideCounter: boolean;
	export let pause: boolean;
	export let activeIndex: number;
</script>

<div class="flex w-full flex-grow flex-col justify-center p-4">
	<div class="h-full max-h-[1200px]">
		<Carousel bind:activeIndex {hideSlideCounter} {pause} />
	</div>
</div>
