<script lang="ts">
	import { perm, type Page_id } from '$lib/data/perm'
	import type { Icon } from '@lucide/svelte'
	import type { Component } from 'svelte'
	import Circle_dollar_sign_icon from '@lucide/svelte/icons/circle-dollar-sign'
	import Person_standing_icon from '@lucide/svelte/icons/person-standing'
	import Trending_up_icon from '@lucide/svelte/icons/trending-up'
	import Bolt_icon from '@lucide/svelte/icons/bolt'
	import World from '../tab_world.svelte'
	import User from '../tab_user.svelte'
	import Timeline from '../tab_timeline.svelte'
	import Simulation from '../tab_simulation.svelte'
	import * as Tabbed from '$lib/ui/tabbed_vertical'

	type Page = {
		id: Page_id
		name: string
		Icon: typeof Icon
		Content: Component
	}

	const pages: Page[] = [
		{
			id: 'w',
			name: 'World',
			Icon: Circle_dollar_sign_icon,
			Content: World,
		},
		{
			id: 'u',
			name: 'User',
			Icon: Person_standing_icon,
			Content: User,
		},
		{
			id: 't',
			name: 'Timeline',
			Icon: Trending_up_icon,
			Content: Timeline,
		},
		{
			id: 's',
			name: 'Config',
			Icon: Bolt_icon,
			Content: Simulation,
		},
	]

	const active_page = $derived(pages.find((p) => p.id === perm.data.p)!)
</script>

<Tabbed.Root bind:value={perm.data.p} class="h-120">
	<Tabbed.Menu>
		{#each pages as page}
			<Tabbed.Option value={page.id} label={page.name} Icon={page.Icon} />
		{/each}
	</Tabbed.Menu>
	<Tabbed.Window
		class={[
			perm.data.p === pages[0].id ? 'rounded-tl-none' : '',
			perm.data.p === pages[pages.length - 1].id ? 'rounded-bl-none' : '',
		]}>
		<active_page.Content />
	</Tabbed.Window>
</Tabbed.Root>
<div class="border rounded-lg grow"></div>
