<script lang="ts">
	import * as Field from '$lib/components/ui/field'
	import * as Select from '$lib/components/custom/shadow_select'
	import * as Segment from '$lib/components/custom/segmented_control'
	import Input_row from './input_row.svelte'
	import { persistent, year_options } from '$lib/data/persistent'

	const p = persistent.data.simulation
</script>

<div class="w-full p-4">
	<Field.Set class="w-64">
		<Field.Legend>Global settings</Field.Legend>
		<Field.Group class="gap-2">
			<Input_row label="Current year">
				<Select.Root bind:value={p.this_year}>
					<Select.Trigger>
						{p.this_year}
					</Select.Trigger>
					<Select.Menu class="max-h-64">
						{#each year_options.filter((y) => y < p.end_year) as year (year)}
							<Select.Item value={year}>
								{year}
							</Select.Item>
						{/each}
					</Select.Menu>
				</Select.Root>
			</Input_row>
			<Input_row label="End year">
				<Select.Root bind:value={p.end_year}>
					<Select.Trigger>
						{p.end_year}
					</Select.Trigger>
					<Select.Menu>
						{#each year_options.filter((y) => y > p.this_year) as year (year)}
							<Select.Item value={year}>
								{year}
							</Select.Item>
						{/each}
					</Select.Menu>
				</Select.Root>
			</Input_row>
			<Input_row label="Time metric">
				<Segment.Root bind:value={p.age_scale}>
					<Segment.Item value={false}>Year</Segment.Item>
					<Segment.Item value={true}>Age</Segment.Item>
				</Segment.Root>
			</Input_row>
		</Field.Group>
	</Field.Set>
</div>
