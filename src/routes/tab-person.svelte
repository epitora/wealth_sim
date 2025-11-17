<script lang="ts">
	import Select from '$lib/ui/select.svelte'
	import Field_set from '$lib/ui/field-set.svelte'
	import Field from '$lib/ui/field.svelte'
	import { birth_year_options } from '$lib/data/schema'
	import { db } from '$lib/state/db.svelte'
</script>

<div class="px-22 py-16">
	<Field_set heading="Biographical facts">
		<Field label="Birth year">
			<Select bind:value={db.s.p.b} values={birth_year_options} scroll_id={1} />
		</Field>
	</Field_set>
</div>
