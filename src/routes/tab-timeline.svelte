<script lang="ts">
	import { db } from '$lib/state/db.svelte'
	import Cycle from '$lib/ui/cycle.svelte'
	import Rows_2_icon from '@lucide/svelte/icons/rows-2'
	import Rows_3_icon from '@lucide/svelte/icons/rows-3'
	import Timeline_area from './timeline-area.svelte'
	import { bit_options, type Strategy_id } from '$lib/data/schema'
	import Strategy_select from './strategy-select.svelte'

	function update_a(id: Strategy_id) {
		if (db.s.t.a === id) {
			db.s.t.a = db.s.t.s.find((s) => s.i !== id)!.i
		}
	}

	function update_b(id: Strategy_id) {
		if (db.s.t.b === id) {
			db.s.t.b = db.s.t.s.find((s) => s.i !== id)!.i
		}
	}
</script>

<div class={['flex']}>
	<div class="relative flex flex-row-reverse border-r orient-v">
		<Cycle
			bind:value={db.s.t.c}
			values={bit_options}
			class="absolute inset-y-0 top-0 rounded-none border-0"
			icons={{ 0: Rows_2_icon, 1: Rows_3_icon }} />
		<div class="flex flex-4 shrink-0 items-center whitespace-nowrap">
			<div class="mb-12">Life Events</div>
		</div>
		<Strategy_select class="flex-1" bind:value={db.s.t.a} on_change={(id) => update_b(id as Strategy_id)} />
		{#if db.s.t.c}
			<Strategy_select class="flex-1" bind:value={db.s.t.b} on_change={(id) => update_a(id as Strategy_id)} />
		{/if}
	</div>
	<Timeline_area />
</div>
