<script lang="ts">
	import * as Select from '$lib/ui/select_vertical'
	import Toggle from '$lib/ui/toggle.svelte'
	import type { Strategy_config, Strategy_id } from '$lib/data/persistent'
	import { persistent } from '$lib/data/persistent'
	import Scale_icon from '@lucide/svelte/icons/scale'
	import Timeline_area from './timeline_area.svelte'

	const p = persistent.data.strategy

	type Assert_subset<T extends keyof Strategy_config> = T
	type Select_key = Assert_subset<'first_id' | 'second_id'>

	function update_other(other_key: Select_key, id: Strategy_id) {
		if (p[other_key] === id) {
			p[other_key] = p.list.find((s) => s.id !== id)!.id
		}
	}
</script>

<div class="flex h-full w-full">
	<div class="relative flex flex-row-reverse border-r orient-v">
		<Toggle
			bind:pressed={p.compare}
			class="absolute inset-y-0 top-0 rounded-none border-0 border-b"
			Icon={Scale_icon} />
		<div class="flex flex-1 shrink-0 items-center whitespace-nowrap">
			<div class="mb-3">Life Events</div>
		</div>
		<Select.Root
			class="flex-1"
			bind:value={p.first_id}
			on_change={(id) => update_other('second_id', id as Strategy_id)}>
			<Select.Trigger
				class="rounded-none border-0 border-t"
				label={p.list.find((s) => s.id === p.first_id)!.label} />
			<Select.Menu>
				{#each p.list as strategy}
					<Select.Option value={strategy.id} label={strategy.label} />
				{/each}
			</Select.Menu>
		</Select.Root>
		{#if p.compare}
			<Select.Root
				class="flex-1"
				bind:value={p.second_id}
				on_change={(id) => update_other('first_id', id as Strategy_id)}>
				<Select.Trigger
					class="rounded-none border-0 border-t"
					label={p.list.find((s) => s.id === p.second_id)!.label} />
				<Select.Menu>
					{#each p.list as strategy}
						<Select.Option value={strategy.id} label={strategy.label} />
					{/each}
				</Select.Menu>
			</Select.Root>
		{/if}
	</div>
	<Timeline_area />
</div>
