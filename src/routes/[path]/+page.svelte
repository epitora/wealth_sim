<script lang="ts">
	import { persistent, type Tab_id } from '$lib/data/persistent'
	import { type Icon } from '@lucide/svelte'
	import type { Component } from 'svelte'
	import Circle_dollar_sign_icon from '@lucide/svelte/icons/circle-dollar-sign'
	import Person_standing_icon from '@lucide/svelte/icons/person-standing'
	import Trending_up_icon from '@lucide/svelte/icons/trending-up'
	import Bolt_icon from '@lucide/svelte/icons/bolt'
	import World from '../world_tab.svelte'
	import Client from '../client_tab.svelte'
	import Timeline from '../timeline_tab.svelte'
	import Simulation from '../simulation_tab.svelte'
	import * as Tabbed from '$lib/components/custom/vertical_tabs'
	import Chart from '../chart.svelte'

	const id = $derived(persistent.data.tab_id)

	type Tab = {
		id: Tab_id
		name: string
		icon: typeof Icon
		component: Component
	}

	const tabs = [
		{
			id: 'world',
			name: 'World',
			icon: Circle_dollar_sign_icon,
			component: World
		},
		{
			id: 'client',
			name: 'Client',
			icon: Person_standing_icon,
			component: Client
		},
		{
			id: 'timeline',
			name: 'Timeline',
			icon: Trending_up_icon,
			component: Timeline
		},
		{
			id: 'simulation',
			name: 'Config',
			icon: Bolt_icon,
			component: Simulation
		}
	] as const satisfies Tab[]
</script>

<Tabbed.Root bind:value={persistent.data.tab_id}>
	<Tabbed.Menu>
		{#each tabs as tab}
			<Tabbed.Item value={tab.id} page={tab.component}>
				<tab.icon class="size-4 rotate-90" />
				{tab.name}
			</Tabbed.Item>
		{/each}
	</Tabbed.Menu>
	<Tabbed.Content
		class={{
			'rounded-tl-none': id === tabs[0].id,
			'rounded-bl-none': id === tabs[tabs.length - 1].id
		}}
	/>
</Tabbed.Root>
<!-- <Chart /> -->
