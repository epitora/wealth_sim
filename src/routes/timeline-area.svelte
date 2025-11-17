<script lang="ts">
	import { db } from '$lib/state/db.svelte'
	import Timeline_year from './timeline-year.svelte'
	import Scroll_area from '$lib/ui/scroll-area.svelte'
</script>

<Scroll_area direction="h" scroll_id={0} class="w-[calc(100%-2rem)]">
	{#each Array.from({ length: db.s.s.h }) as _, index}
		<Timeline_year index={index} />
	{/each}
</Scroll_area>
