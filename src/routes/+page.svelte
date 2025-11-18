<script lang="ts">
	import { db } from '$lib/state/db.svelte'
	import { tab_id_options, tab_labcons } from '$lib/data/schema'
	import Tabs from '$lib/ui/tabs.svelte'
	import Tab_timeline from './tab-timeline.svelte'
	import Tab_simulation from './tab-simulation.svelte'
	import Tab_context from './tab-context.svelte'
	import Chart from './chart.svelte'
</script>

<Tabs
	bind:value={db.s.u.t}
	options={tab_id_options}
	labcons={tab_labcons}
	pages={{ c: Tab_context, t: Tab_timeline, s: Tab_simulation }}
	class="h-434" />
<Chart />
