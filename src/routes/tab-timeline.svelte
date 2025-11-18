<script lang="ts">
	import { db } from '$lib/state/db.svelte'
	import Scroll_area from '$lib/ui/scroll-area.svelte'
	import Scenario_select from '$lib/ui/scenario-select.svelte'
	import Timeline_year from './timeline-year.svelte'
	import Cycle from '$lib/ui/cycle.svelte'
	import New_event_dialog from './new-block-dialog.svelte'
	import { time_reference_icons, time_reference_id_options, type Scenario_id } from '$lib/data/schema'
	const update_select = (key: 'a' | 'b', id: Scenario_id) => {
		db.s.t[key] = id
		const other_key = key === 'a' ? 'b' : 'a'
		if (db.s.t[other_key] === id) db.s.t[other_key] = db.s.t.s.findIndex((_, i) => i !== id)
	}
</script>

<div class={['h-full grid grid-cols-[2rem_1fr_2rem] grid-flow-col grid-rows-[2rem_200px_200px]']}>
	<div></div>
	<Scenario_select bind:value={() => db.s.t.a, (id) => update_select('a', id)} class="flex-1 orient-v" />
	<Scenario_select bind:value={() => db.s.t.b, (id) => update_select('b', id)} class="flex-1 orient-v" />
	<Scroll_area class="row-span-full border-x" inner_class="flex-wrap" direction="h" scroll_id={0}>
		{#each Array.from({ length: db.s.s.h + 1 }) as _, index}
			<Timeline_year index={index} />
		{/each}
	</Scroll_area>
	<Cycle
		bind:value={db.s.u.r}
		options={time_reference_id_options}
		icons={time_reference_icons}
		class="rounded-none border-0" />
</div>

<New_event_dialog />
