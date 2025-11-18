<script lang="ts">
	import Field_set from '$lib/ui/field-set.svelte'
	import Field from '$lib/ui/field.svelte'
	import Segments from '$lib/ui/segments.svelte'
	import Select from '$lib/ui/select.svelte'
	import { birth_year_options, current_year_options, inflation_bounds } from '$lib/data/schema'
	import { db } from '$lib/state/db.svelte'
	import Currency_input from '$lib/ui/currency-input.svelte'
	import Slider from '$lib/ui/slider.svelte'
</script>

<Field_set heading="General">
	<Field label="Current year">
		<Segments bind:value={db.s.c.y} options={current_year_options} />
	</Field>
	<Field label="Inflation rate">
		<Slider bind:value={db.s.c.i} bounds={inflation_bounds} suffix="%" />
	</Field>
	<Field label="Birth year">
		<Select bind:value={db.s.c.b} options={birth_year_options} scroll_id={1} />
	</Field>
	<Field label="Net worth">
		<Currency_input bind:value={db.s.c.w} />
	</Field>
</Field_set>
