<script lang="ts">
	import * as Field from '$lib/components/ui/field/index.js'
	import * as Select from '$lib/components/custom/shadow_select/index.js'
	import * as Segments from '$lib/components/custom/segments'
	import Input_row from './input_row.svelte'
	import type { Year } from '$lib/data/persistent'
	import { persistent, year_options } from '$lib/data/persistent'

	const p = persistent.data.simulation
</script>

<div class="w-full p-4">
	<Field.Set class="w-64">
		<Field.Legend>Profile</Field.Legend>
		<Field.Group class="gap-2">
			<Input_row label="Current year">
				<Select.Root
					scrollAlignment="center"
					type="single"
					bind:value={() => p.this_year.toString(), (v) => (p.this_year = Number(v) as Year)}>
					<Select.Trigger size="sm" class="shadow-none">
						{p.this_year}
					</Select.Trigger>
					<Select.Content class="max-h-64">
						{#each year_options.filter((y) => y < p.end_year) as year (year)}
							{@const year_string = year.toString()}
							<Select.Item value={year_string} label={year_string}>
								{year}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</Input_row>
			<Input_row label="End year">
				<Select.Root
					scrollAlignment="center"
					type="single"
					bind:value={() => p.end_year.toString(), (v) => (p.end_year = Number(v) as Year)}>
					<Select.Trigger size="sm" class="shadow-none">
						{p.end_year}
					</Select.Trigger>
					<Select.Content class="max-h-64">
						{#each year_options.filter((y) => y > p.this_year) as year (year)}
							{@const year_string = year.toString()}
							<Select.Item value={year_string} label={year_string}>
								{year}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</Input_row>
			<Input_row label="Time reference">
				<Segments.Root bind:value={p.age_scale}>
					<Segments.Item value={false}>Year</Segments.Item>
					<Segments.Item value={true}>Age</Segments.Item>
				</Segments.Root>
			</Input_row>
		</Field.Group>
	</Field.Set>
</div>
