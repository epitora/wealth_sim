<script lang="ts">
	import * as Select from '$lib/ui/select_vertical'
	import Toggle from '$lib/ui/toggle.svelte'
	import type { Strategy_id } from '$lib/data/perm'
	import { perm } from '$lib/data/perm'
	import Scale_icon from '@lucide/svelte/icons/scale'
	import Timeline_area from './timeline_area.svelte'

	const timeline = perm.data.t
	// const age = year - persistent.data.client.birth_year

	// const show_any = c.end_year - c.start_year < 20 || year === c.start_year || year === c.end_year
	// const metric = c.age_metric ? age : year
	// const show_label = show_any || metric % 5 < 1

	function update_a(id: Strategy_id) {
		if (timeline.a === id) {
			timeline.a = timeline.l.find((s) => s.i !== id)!.i
		}
	}

	function update_b(id: Strategy_id) {
		if (timeline.b === id) {
			timeline.b = timeline.l.find((s) => s.i !== id)!.i
		}
	}
</script>

<div class={['flex h-full w-full', 'grid ']}>
	<div class="relative flex flex-row-reverse border-r orient-v">
		<Toggle bind:pressed={timeline.c} class="absolute inset-y-0 top-0 rounded-none border-0" Icon={Scale_icon} />
		<div class="flex flex-1 shrink-0 items-center whitespace-nowrap">
			<div class="mb-3">Life Events</div>
		</div>
		<Select.Root class="flex-1" bind:value={timeline.a} on_change={(id) => update_a(id as Strategy_id)}>
			<Select.Trigger
				class="rounded-none border-0 border-t"
				label={timeline.l.find((s) => s.i === timeline.a)!.l} />
			<Select.Menu>
				{#each timeline.l as strategy}
					<Select.Option value={strategy.i} label={strategy.l} />
				{/each}
			</Select.Menu>
		</Select.Root>
		{#if timeline.c}
			<Select.Root class="flex-1" bind:value={timeline.b} on_change={(id) => update_b(id as Strategy_id)}>
				<Select.Trigger
					class="rounded-none border-0 border-t"
					label={timeline.l.find((s) => s.i === timeline.b)!.l} />
				<Select.Menu>
					{#each timeline.l as strategy}
						<Select.Option value={strategy.i} label={strategy.l} />
					{/each}
				</Select.Menu>
			</Select.Root>
		{/if}
	</div>
	<Timeline_area />
</div>
