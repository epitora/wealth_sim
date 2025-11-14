<script lang="ts">
	import { persistent, type Tab_id } from '$lib/data/persistent'
	import type { Icon } from '@lucide/svelte'
	import type { Component } from 'svelte'
	import Circle_dollar_sign_icon from '@lucide/svelte/icons/circle-dollar-sign'
	import Person_standing_icon from '@lucide/svelte/icons/person-standing'
	import Trending_up_icon from '@lucide/svelte/icons/trending-up'
	import Bolt_icon from '@lucide/svelte/icons/bolt'
	import World from '../tab_world.svelte'
	import Client from '../tab_client.svelte'
	import Timeline from '../tab_timeline.svelte'
	import Simulation from '../tab_simulation.svelte'
	import * as Tabbed from '$lib/ui/tabbed_vertical'

	type Tab = {
		id: Tab_id
		name: string
		Icon: typeof Icon
		Page: Component
	}

	const tabs: Tab[] = [
		{
			id: 'world',
			name: 'World',
			Icon: Circle_dollar_sign_icon,
			Page: World,
		},
		{
			id: 'client',
			name: 'Client',
			Icon: Person_standing_icon,
			Page: Client,
		},
		{
			id: 'timeline',
			name: 'Timeline',
			Icon: Trending_up_icon,
			Page: Timeline,
		},
		{
			id: 'simulation',
			name: 'Config',
			Icon: Bolt_icon,
			Page: Simulation,
		},
	]

	const p = persistent.data
	const active_tab = $derived(tabs.find((t) => t.id === p.tab_id)!)
</script>

<Tabbed.Root bind:value={persistent.data.tab_id} class="h-120">
	<Tabbed.Menu>
		{#each tabs as tab}
			<Tabbed.Option value={tab.id} label={tab.name} Icon={tab.Icon} />
		{/each}
	</Tabbed.Menu>
	<Tabbed.Window
		class={[
			p.tab_id === tabs[0].id ? 'rounded-tl-none' : '',
			p.tab_id === tabs[tabs.length - 1].id ? 'rounded-bl-none' : '',
		]}>
		<active_tab.Page />
	</Tabbed.Window>
</Tabbed.Root>
<div class="border rounded-lg grow"></div>
