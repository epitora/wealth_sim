<script lang="ts">
	import Field_set from '$lib/ui/field-set.svelte'
	import Field from '$lib/ui/field.svelte'
	import Segments from '$lib/ui/segments.svelte'
	import { current_year_options } from '$lib/data/schema'
	import { db } from '$lib/state/db.svelte'
	import Scroll_area from '$lib/ui/scroll-area.svelte'
</script>

<div class="px-22 py-16">
	<Field_set heading="General">
		<Field label="Current year">
			<Segments bind:value={db.s.w.y} values={current_year_options} />
		</Field>
	</Field_set>
	<Scroll_area class="border rounded-md" direction="v" scroll_id="a">
		{#each Array.from({ length: 200 }) as _, index}
			Index {index}
		{/each}
	</Scroll_area>
	<Scroll_area class="border rounded-md" direction="h" scroll_id="b">
		{#each Array.from({ length: 200 }) as _, index}
			Index {index}
		{/each}
	</Scroll_area>
</div>
