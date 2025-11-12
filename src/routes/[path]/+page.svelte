<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js'
	import { persistent, type Tab_id } from '$lib/data/persistent'
	import type { Icon } from '@lucide/svelte'
	import type { Component } from 'svelte'
	import Earth_icon from '@lucide/svelte/icons/earth'
	import Circle_dollar_sign_icon from '@lucide/svelte/icons/circle-dollar-sign'
	import Person_standing_icon from '@lucide/svelte/icons/person-standing'
	import Trending_up_icon from '@lucide/svelte/icons/trending-up'
	import Bolt_icon from '@lucide/svelte/icons/bolt'
	import World from '../world_tab.svelte'
	import Client from '../client_tab.svelte'
	import Timeline from '../timeline_tab.svelte'
	import Simulation from '../simulation_tab.svelte'
	import Chart from '../chart.svelte'

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

	const active_tab = $derived(tabs.find((t) => t.id === persistent.data.tab_id)!)
</script>

<div class="relative flex h-100">
	<div class="absolute flex w-100 origin-top-right -translate-x-full -rotate-90 flex-row-reverse gap-0.5">
		{#each tabs as tab}
			<Button
				class={{
					'grow border border-b-0 border-transparent bg-background font-normal text-muted-foreground': true,
					'h-8.5 rounded-b-none border-border pb-0.5 text-foreground': tab === active_tab
				}}
				variant="ghost"
				size="sm"
				onpointerdown={() => (persistent.data.tab_id = tab.id)}>
				<tab.icon class="rotate-90" />
				{tab.name}
			</Button>
		{/each}
	</div>
	<div
		class={{
			'ml-8.5 h-full w-full overflow-hidden rounded-md border': true,
			'rounded-tl-none': tabs.indexOf(active_tab) === 0,
			'rounded-bl-none': tabs.indexOf(active_tab) === 3
		}}>
		<active_tab.component />
	</div>
</div>
<!-- <Chart /> -->
