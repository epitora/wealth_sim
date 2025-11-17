<script lang="ts">
	import Field_set from '$lib/ui/field-set.svelte'
	import Field from '$lib/ui/field.svelte'
	import Segments from '$lib/ui/segments.svelte'
	import { horizon_options, resolution_options, type Resolution } from '$lib/data/schema'
	import { db } from '$lib/state/db.svelte'
</script>

<div class="px-22 py-16">
	<Field_set heading="Simulation settings">
		<Field label="Horizon (year)" description="Time length simulated into the future">
			<Segments bind:value={db.s.s.h} values={horizon_options} />
		</Field>
		<Field label="Resolution (month)" description="Simulated time step">
			<Segments bind:value={db.s.s.r} values={resolution_options} />
		</Field>
	</Field_set>
</div>
