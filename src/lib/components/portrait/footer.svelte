<script lang="ts" context="module">
	import { contact } from '^data';
</script>

<script lang="ts">
	export let aboutIsOpen: boolean;
</script>

<footer
	class="fixed bottom-0 z-30 flex w-full items-center justify-between bg-bg-primary px-6 py-6 text-[16px] decoration-2 underline-offset-2 xs:text-[17px] xs/sm:text-[19px] sm:text-[21px] sm/md:text-[22px] md:text-[23px] landscape:hidden"
>
	<button
		class={`${aboutIsOpen ? 'underline' : ''}`}
		on:click={() => (aboutIsOpen = !aboutIsOpen)}
		type="button">About</button
	>

	<a href={`mailto:${contact.email}`}>Contact</a>
</footer>

<footer
	class="flex items-center justify-between bg-bg-primary px-6 pb-6 pt-4 text-[16px] leading-relaxed xs:text-[17px] xs/sm:text-[19px] sm:text-[21px] sm/md:text-[22px] md:text-[23px] landscape:hidden"
>
	<button type="button">About</button>

	<a href={`mailto:${contact.email}`}>Contact</a>
</footer>
