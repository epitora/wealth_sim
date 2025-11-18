<script lang="ts">
	import { db } from '$lib/state/db.svelte'
	import { bit_options, time_reference_options, type Strategy_id } from '$lib/data/schema'
	import Strategy_select from '../lib/ui/strategy-select.svelte'
	import Scroll_area from '$lib/ui/scroll-area.svelte'
	import Timeline_year from './timeline-year.svelte'
	import Cycle from '$lib/ui/cycle.svelte'
	import Rows_2_icon from '@lucide/svelte/icons/rows-2'
	import Rows_3_icon from '@lucide/svelte/icons/rows-3'
	import Calendar_icon from '@lucide/svelte/icons/calendar'
	import Hash_icon from '@lucide/svelte/icons/hash'
	import Cake_icon from '@lucide/svelte/icons/cake'

	const update_select = (key: 'a' | 'b', id: Strategy_id) => {
		db.s.t[key] = id
		const other_key = key === 'a' ? 'b' : 'a'
		if (db.s.t[other_key] === id) db.s.t[other_key] = db.s.t.s.find((s) => s.i !== id)!.i
	}
</script>

<div
	class={[
		'h-full grid grid-cols-[2rem_1fr_2rem] grid-flow-col',
		db.s.t.c ? 'grid-rows-[2rem_1fr_1fr_1fr]' : 'grid-rows-[2rem_1fr_1fr]',
	]}>
	<Cycle
		bind:value={db.s.t.c}
		values={bit_options}
		class="rounded-none border-0"
		icons={{ 0: Rows_2_icon, 1: Rows_3_icon }} />
	<div class="pb-12 flex items-center orient-v">Life Events</div>
	<Strategy_select class="flex-1 orient-v" bind:value={() => db.s.t.a, (id) => update_select('a', id)} />
	{#if db.s.t.c}
		<Strategy_select class="flex-1 orient-v" bind:value={() => db.s.t.b, (id) => update_select('b', id)} />
	{/if}
	<Scroll_area class="row-span-full border-x" direction="h" scroll_id={0}>
		{#each Array.from({ length: db.s.s.h + 1 }) as _, index}
			<Timeline_year index={index} />
		{/each}
	</Scroll_area>
	<Cycle
		bind:value={db.s.u.r}
		values={time_reference_options}
		class="rounded-none border-0"
		icons={{ a: Cake_icon, y: Calendar_icon, i: Hash_icon }} />
</div>
