<script lang="ts">
	import { db } from '$lib/state/db.svelte'
	import Plus_icon from '@lucide/svelte/icons/plus'
	import clsx, { type ClassValue } from 'clsx'
	import { global } from '$lib/state/global.svelte'
	import Scroll_area from '$lib/ui/scroll-area.svelte'
	import { block_id_options, block_labels, type Block, type Block_id, type Scenario_id } from '$lib/data/schema'
	import Block_summary from './block-summary.svelte'

	type Props = { year: number; scenario_id: Scenario_id; class?: ClassValue }
	let { year, scenario_id, class: class_ }: Props = $props()

	const blocks = $derived(db.s.t.s[scenario_id].b[year])
	let trigger: HTMLButtonElement
	let menu: HTMLDivElement

	const uid = $props.id()
	const menu_id = `${uid}-menu`

	const toggle_menu = () => {
		// @ts-ignore new api
		menu.togglePopover({ source: trigger })
	}

	const open_dialog = (block_id: Block_id) => {
		global.new_block_dialog = { year, scenario_id, block_id }
		menu.hidePopover()
	}

	const delete_block = (block: Block) => {
		const index = db.s.t.s[scenario_id].b[year].findIndex((b) => b === block)
		db.s.t.s[scenario_id].b[year].splice(index, 1)
	}
</script>

<div class={['flex flex-col flex-wrap group/cell h-200 p-4 gap-4', clsx(class_)]}>
	{#each blocks as block}
		<Block_summary block={block} on_delete={() => delete_block(block)} />
	{/each}
	<button
		bind:this={trigger}
		popovertarget={menu_id}
		onclick={(e) => e.preventDefault()}
		onpointerdown={toggle_menu}
		class={[
			'grid place-content-center min-w-28 rounded-md grow text-transparent group-hover/cell:bg-accent group-hover/cell:text-muted',
		]}>
		<Plus_icon />
	</button>
	<div
		bind:this={menu}
		id={menu_id}
		popover="auto"
		class={['translate-x-4 place-right-middle shadow-md rounded-md border']}>
		<Scroll_area>
			{#each block_id_options as id}
				<button
					onpointerdown={() => open_dialog(id)}
					onpointerup={() => open_dialog(id)}
					class={['relative flex w-full items-center py-6 px-8 hover:bg-accent']}>
					{block_labels[id]}
				</button>
			{/each}
		</Scroll_area>
	</div>
</div>
