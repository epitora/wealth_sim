<script lang="ts">
	import * as Select from '$lib/ui/select'
	import * as Form from '$lib/ui/field_set'
	import { perm, birth_year_options, month_options, type Month } from '$lib/data/perm'

	const user = perm.data.u

	const month_names: Record<Month, string> = {
		0: 'January',
		1: 'February',
		2: 'March',
		3: 'April',
		4: 'May',
		5: 'June',
		6: 'July',
		7: 'August',
		8: 'September',
		9: 'October',
		10: 'November',
		11: 'December',
	}
</script>

<div class="px-5.5 py-4">
	<Form.Root heading="Biographical facts">
		<Form.Field label="Birth year">
			<Select.Root class="w-32" bind:value={user.y}>
				<Select.Trigger label={user.y.toString()} />
				<Select.Menu class="w-32">
					{#each birth_year_options as year}
						<Select.Option value={year} label={year.toString()} />
					{/each}
				</Select.Menu>
			</Select.Root>
		</Form.Field>
		<Form.Field label="Birth month">
			<Select.Root class="w-32" bind:value={user.m}>
				<Select.Trigger label={month_names[user.m]} />
				<Select.Menu class="w-32">
					{#each month_options as month}
						<Select.Option value={month} label={month_names[month]} />
					{/each}
				</Select.Menu>
			</Select.Root>
		</Form.Field>
	</Form.Root>
</div>
