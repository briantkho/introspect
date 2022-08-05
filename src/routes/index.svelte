<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('./habits');
		const habits = await res.json;
		return {
			props: {
				habits
			}
		};
	};
</script>
