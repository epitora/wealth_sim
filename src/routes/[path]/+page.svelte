<script lang="ts">
	import { page_id_options, type Page_id } from '$lib/data/schema'
	import { db } from '$lib/state/db.svelte'
	import Circle_dollar_sign_icon from '@lucide/svelte/icons/circle-dollar-sign'
	import Person_standing_icon from '@lucide/svelte/icons/person-standing'
	import Trending_up_icon from '@lucide/svelte/icons/trending-up'
	import Bolt_icon from '@lucide/svelte/icons/bolt'
	import World from '../tab-world.svelte'
	import Person from '../tab-person.svelte'
	import Timeline from '../tab-timeline.svelte'
	import Simulation from '../tab-simulation.svelte'
	import type { Page } from '$lib/utils'
	import Tabs from '$lib/ui/tabs.svelte'

	const pages: Record<Page_id, Page> = {
		w: {
			name: 'World',
			Icon: Circle_dollar_sign_icon,
			Content: World,
		},
		p: {
			name: 'Person',
			Icon: Person_standing_icon,
			Content: Person,
		},
		t: {
			name: 'Timeline',
			Icon: Trending_up_icon,
			Content: Timeline,
		},
		s: {
			name: 'Config',
			Icon: Bolt_icon,
			Content: Simulation,
		},
	}
</script>

<Tabs bind:value={db.s.u.p} values={page_id_options} pages={pages} class="h-480" />
<div class="border rounded-lg grow"></div>
