<script lang="ts">
	import Field_set from '$lib/ui/field-set.svelte'
	import Field from '$lib/ui/field.svelte'
	import Segments from '$lib/ui/segments.svelte'
	import { horizon_options, resolution_options } from '$lib/data/schema'
	import { db } from '$lib/state/db.svelte'
</script>

<Field_set heading="Settings">
	<Field label="Horizon" description="Time length simulated into the future">
		<Segments bind:value={db.s.s.h} options={horizon_options} unit="year" />
	</Field>
	<Field label="Resolution" description="Simulated time step">
		<Segments bind:value={db.s.s.r} options={resolution_options} unit="month" />
	</Field>
</Field_set>
