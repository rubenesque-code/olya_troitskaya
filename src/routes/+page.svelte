<script lang="ts" context="module">
	import { Carousel, Landscape } from '^components';

	// TO DO
	// - slider reset timer after click
	// - icon
	// - structured data.
	// - contact link.

	// - swipe for touch.
	// - pause slides on open about on portrait
	// - max size for certain images?
	// - max size for all images?

	// if requested
	// - pause button

	// nice to have
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
			<Carousel bind:hideSlideCounter={aboutIsOpen} bind:pause={aboutIsOpen} />

			{#if aboutIsOpen}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="fixed inset-0 z-10" on:click={() => (aboutIsOpen = false)} />
			{/if}
			<div
				class="absolute bottom-0 z-20 h-[48vh] overflow-y-auto bg-bg-primary p-6 transition-transform duration-300 ease-in-out scrollbar-none"
				style:transform={`translateY(${!aboutIsOpen ? 100 : 0}%)`}
				style:pointer-events={!aboutIsOpen ? 'none' : 'auto'}
			>
				<div class="flex h-full flex-col text-[16px] leading-relaxed">
					<div>
						<p>
							Olya Troitskaya is a Lead Graphic Designer and Educator based in London. Operating at
							the intersection of innovative print production and digital technology, she helps
							brands develop visual direction and produce graphic applications across multiple
							channels.
						</p>
					</div>

					<div class="mt-8 flex flex-col">
						<h2 class="text-[20px]">Experience</h2>

						<p class="mt-4">
							In her current role as Lead Designer at Tommy Hilfiger, she oversees a team of 4-6
							designers and delivers digital and print materials, including marketing campaigns,
							newsletters, website pages, point-of-sale materials, event collateral, lookbooks,
							packaging, social media and more.
						</p>

						<p class="mt-8">
							As a Senior Designer at Burberry within the Beauty team, she helped interpret and
							implement the Burberry Beauty design vision, supporting product packaging, campaign
							designs and activations related to new product launches.
						</p>

						<p class="mt-8">
							In her role as a Senior Freelance Designer at COS, she delivered a recent brand
							update, developing the vision and all the assets for a new brand image, including a
							new logo, typographic treatment, packaging, and other applications. Prior to that, she
							conducted special research into sustainable materials and circular production. She
							gained an understanding of different recycling processes and worked directly with a
							broad body of H&M group factories and international suppliers to develop more
							sustainable approaches to COS packaging and marketing materials.
						</p>

						<p class="mt-8">
							Before working for brands as an in-house designer, she worked for leading design
							studios such as Zak Group, Fraser Muggeridge Studio, OK-RM, and The Beautiful Meme.
							Her work has been exhibited and presented in several international institutions,
							including Strelka Institute, V-A-C Foundation, Tate Exchange, Tallinn Art Hall, Lost
							and Found Archive, amongst others. She has taught as a Senior Lecturer at Ravensbourne
							University and was an Associate Lecturer at Camberwell College of Arts and Kingston
							University, conducting workshops at Casco (Netherlands), Konstfack (Sweden), and the
							Royal College of Art. She is the founder of Evening Class, a radical educational and
							design platform.
						</p>
					</div>
				</div>
			</div>
		</div>

		<footer
			class="fixed bottom-0 z-30 flex w-full items-center justify-between bg-bg-primary px-6 py-6 text-[17px]"
		>
			<button on:click={() => (aboutIsOpen = !aboutIsOpen)} type="button">About</button>

			<a href="/">Contact</a>
		</footer>

		<footer class="flex items-center justify-between bg-bg-primary px-6 pb-6 pt-4 text-[17px]">
			<button type="button">About</button>

			<a href="/">Contact</a>
		</footer>
	</main>

	<main class="flex h-screen w-full portrait:hidden landscape:gap-16 landscape:p-12">
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
</div>
