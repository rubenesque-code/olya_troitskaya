<script lang="ts" context="module">
	import { Carousel } from '^components';

	// import image from '^assets/images';
</script>

<div class="flex justify-center bg-bg-primary">
	<main class="flex max-w-[2200px] gap-16 w-full h-screen p-12">
		<div class="max-w-[490px] h-full max-h-full overflow-y-auto pr-4 scrollbar-none">
			<div class="flex flex-col leading-relaxed text-[22px] h-full">
				<div>
					<p>
						Olya Troitskaya is a Lead Graphic Designer and Educator based in London. Operating at
						the intersection of innovative print production and digital technology, she helps brands
						to develop visual direction and produces graphic applications across multiple channels.
					</p>
				</div>

				<div class="mt-8">
					<h2 class="text-[20px]">Experience</h2>

					<p class="mt-4 flex flex-col gap-8">
						In her current role as a Lead Designer at Tommy Hilfiger, she oversees a team of 4-6
						designers and delivers digital and print materials, including marketing campaigns,
						newsletters, website pages, point-of-sale materials, event collateral, lookbooks,
						packaging, social media &#8232;and more.
					</p>

					<p>
						In her role as a Senior Designer at Burberry within Beauty team she helped to interpret
						and implement the Burberry Beauty design vision and supported product packaging,
						campaigns designs and activations related to launches &#8232;of the new products.
					</p>

					<p>
						In her role as a Senior Freelance Designer at COS she delivered a recent brand update,
						developing vision and all the assets for a new brand image, including new logo,
						typographic treatment, packaging and other applications. Prior to that she conducted
						special research into sustainable materials and circular production. She was able to
						understand the different recycling processes and work directly with broad body of
						H&amp;M group factories and international suppliers in developing more sustainable
						approaches to COS packaging and marketing materials.
					</p>

					<p>
						Before working for brands as an in-house designer, she has worked for leading design
						studios such as Zak Group, Fraser Muggeridge Studio, OK-RM and The Beautiful Meme. Her
						work has been exhibited and presented in several international institutions including
						Strelka Institute, V-A-C foundation, Tate Exchange, Talinn Art Hall, Lost and Found
						Archive amongst others. She has taught in a Senior Lecturer capacity at Ravensbourne
						University and was an Associate Lecturer at Camberwell College of Arts, Kingston
						University and conducted workshops at Casco (Netherlands), Konstfack (Sweden), and Royal
						College of Art. She is a founder of Evening Class, a radical educational and design
						platform.
					</p>
				</div>
			</div>
		</div>

		<div class="w-[2px] bg-black h-full" />

		<div class="h-full flex flex-col items-end justify-between w-full">
			<div><button class="text-[20px]" type="button">Contact</button></div>

			<div class="flex-grow p-4 w-full flex flex-col justify-center">
				<div class="max-h-[1200px] h-full">
					<Carousel />
				</div>
			</div>

			<div><button class="text-[20px]" type="button">London, E9</button></div>
		</div>
	</main>
</div>
