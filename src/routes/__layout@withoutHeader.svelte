<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { fetchPages } from '$lib/helper/fetchPage';
	import HomeHeader from '$lib/components/HomeHeader.svelte';
	import type Page from '$lib/types/page';
	import Analyics from '$lib/components/Analyics.svelte';

	export const load: Load = async ({ params }) => {
		const pages = await fetchPages();
		return {
			props: {
				pages: pages.map(({ metadata }) => metadata)
			}
		};
	};
</script>

<script lang="ts">
	export let pages: Page[];
</script>

<Analyics />

<HomeHeader {pages} />

<slot />
