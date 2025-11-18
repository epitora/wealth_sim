import type { Block_id, Scenario_id } from '$lib/data/schema'

type Global = {
	hovered_timeline_index?: number
	new_block_dialog?: { year: number; scenario_id: Scenario_id; block_id: Block_id }
}

export const global: Global = $state({
	hovered_timeline_index: undefined,
	new_event_dialog: undefined,
})
