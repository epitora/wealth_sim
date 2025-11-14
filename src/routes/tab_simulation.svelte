<script lang="ts">
	import * as Select from '$lib/ui/select'
	import * as Segment from '$lib/ui/select_segment'
	import * as Form from '$lib/ui/field_set'
	import { perm, year_options } from '$lib/data/perm'

	const simulation = perm.data.s
</script>

<div class="px-5.5 py-4">
	<Form.Root heading="Global settings">
		<Form.Field label="Current year" description="Start simulation on this year">
			<Select.Root class="w-32" bind:value={simulation.s}>
				<Select.Trigger label={simulation.s.toString()} />
				<Select.Menu class="w-32">
					{#each year_options.filter((y) => y < simulation.e) as year}
						<Select.Option value={year} label={year.toString()} />
					{/each}
				</Select.Menu>
			</Select.Root>
		</Form.Field>
		<Form.Field label="End year" description="Simulate up to and including this year">
			<Select.Root class="w-32" bind:value={simulation.e}>
				<Select.Trigger label={simulation.e.toString()} />
				<Select.Menu class="w-32">
					{#each year_options.filter((y) => y > simulation.s) as year}
						<Select.Option value={year} label={year.toString()} />
					{/each}
				</Select.Menu>
			</Select.Root>
		</Form.Field>
		<Form.Field label="Time metric" description="What to show on timeline and the graph">
			<Segment.Root class="w-32" bind:value={simulation.a}>
				<Segment.Option value={false} label="Year" />
				<Segment.Option value={true} label="Age" />
			</Segment.Root>
		</Form.Field>
	</Form.Root>
</div>
