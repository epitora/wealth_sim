<script lang="ts">
	import Field_set from '$lib/ui/field-set.svelte'
	import Field from '$lib/ui/field.svelte'
	import Segments from '$lib/ui/segments.svelte'
	import Select from '$lib/ui/select.svelte'
	import { birth_year_options, current_year_options } from '$lib/data/schema'
	import { db } from '$lib/state/db.svelte'
	import Input from '$lib/ui/input.svelte'
	import Dollar_sign_icon from '@lucide/svelte/icons/dollar-sign'
	import Slider from '$lib/ui/slider.svelte'

	const number_pattern = '[-+]?[0-9]{0,10}'
</script>

<Field_set heading="General">
	<Field label="Current year">
		<Segments bind:value={db.s.c.y} values={current_year_options} />
	</Field>
	<Field label="Inflation rate">
		<Slider bind:value={db.s.c.i} min={0} max={10} step={0.5} suffix="%" />
	</Field>
	<Field label="Birth year">
		<Select bind:value={db.s.c.b} values={birth_year_options} scroll_id={1} />
	</Field>
	<Field label="Net worth">
		<Input
			bind:value={db.s.c.w}
			alphabet="-+0-9"
			pattern={number_pattern}
			Icon={Dollar_sign_icon}
			parse={(text: string) => (text === '+' || text === '-' ? 0 : Number(text))} />
	</Field>
</Field_set>
