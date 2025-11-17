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
</div>
