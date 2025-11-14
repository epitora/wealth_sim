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

	function change_selection(key: Select_key, id: Strategy_id) {
		if (key === 'first_id' && p.second_id === id) {
			p.second_id = p.first_id
		} else if (key === 'second_id' && p.first_id === id) {
			p.first_id = p.second_id
		}
		p[key] = id
	}
</script>

{#snippet Strategy_select(key: Select_key)}
	<Select.Root class="flex-1" value={p[key]} on_change={(id) => change_selection(key, id as Strategy_id)}>
		<Select.Trigger class="rounded-none border-0 border-t" label={p.list.find((s) => s.id === p[key])!.label} />
		<Select.Menu>
			{#each p.list as strategy (strategy.id)}
				<Select.Option value={strategy.id} label={strategy.label} />
			{/each}
		</Select.Menu>
	</Select.Root>
{/snippet}

<div class="flex h-full">
	<div class="relative flex flex-row-reverse border-r orient-vertical">
		<Toggle
			bind:pressed={p.compare}
			class="absolute inset-y-0 top-0 rounded-none border-0 border-b"
			Icon={Scale_icon} />
		<div class="flex flex-1 shrink-0 items-center whitespace-nowrap">
			<div class="mb-3">Life Events</div>
		</div>
		{@render Strategy_select('first_id')}
		{#if p.compare}
			{@render Strategy_select('second_id')}
		{/if}
	</div>
	<Timeline_area />
</div>
