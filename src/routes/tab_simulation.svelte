<script lang="ts">
	import * as Select from '$lib/ui/select'
	import * as Segment from '$lib/ui/select_segment'
	import * as Form from '$lib/ui/field_set'
	import { persistent, year_options } from '$lib/data/persistent'

	const p = persistent.data.simulation
</script>

<div class="px-5.5 py-4">
	<Form.Root heading="Global settings">
		<Form.Field label="Current year" description="Start simulation on this year">
			<Select.Root class="w-32" bind:value={p.this_year}>
				<Select.Trigger label={p.this_year.toString()} />
				<Select.Menu class="w-32">
					{#each year_options.filter((y) => y < p.end_year) as year (year)}
						<Select.Option value={year} label={year.toString()} />
					{/each}
				</Select.Menu>
			</Select.Root>
		</Form.Field>
		<Form.Field label="End year" description="Simulate up to and including this year">
			<Select.Root class="w-32" bind:value={p.end_year}>
				<Select.Trigger label={p.end_year.toString()} />
				<Select.Menu class="w-32">
					{#each year_options.filter((y) => y > p.this_year) as year (year)}
						<Select.Option value={year} label={year.toString()} />
					{/each}
				</Select.Menu>
			</Select.Root>
		</Form.Field>
		<Form.Field label="Time metric" description="What to show on timeline and the graph">
			<Segment.Root class="w-32" bind:value={p.age_scale}>
				<Segment.Option value={false} label="Year" />
				<Segment.Option value={true} label="Age" />
			</Segment.Root>
		</Form.Field>
	</Form.Root>
</div>
