<script lang="ts">
	import * as Select from '$lib/components/custom/select'
	import * as Segment from '$lib/components/custom/select_segment'
	import * as Form from '$lib/components/custom/field_set'
	import { persistent, year_options } from '$lib/data/persistent'

	const p = persistent.data.simulation
</script>

<div class="px-5.5 py-4">
	<Form.Root heading="Global settings">
		<Form.Field label="Current year" description="Start simulation on this year">
			<Select.Root bind:value={p.this_year}>
				<Select.Trigger label={p.this_year.toString()} />
				<Select.Menu>
					{#each year_options.filter((y) => y < p.end_year) as year (year)}
						<Select.Option value={year} label={year.toString()} />
					{/each}
				</Select.Menu>
			</Select.Root>
		</Form.Field>
		<Form.Field label="End year" description="Simulate up to and including this year">
			<Select.Root bind:value={p.end_year}>
				<Select.Trigger label={p.end_year.toString()} />
				<Select.Menu>
					{#each year_options.filter((y) => y > p.this_year) as year (year)}
						<Select.Option value={year} label={year.toString()} />
					{/each}
				</Select.Menu>
			</Select.Root>
		</Form.Field>
		<Form.Field label="Time metric" description="What to show on timeline and the graph">
			<Segment.Root bind:value={p.age_scale}>
				<Segment.Option value={false} label="Year" />
				<Segment.Option value={true} label="Age" />
			</Segment.Root>
		</Form.Field>
	</Form.Root>
</div>
