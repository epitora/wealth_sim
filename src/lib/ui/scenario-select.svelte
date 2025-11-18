<script lang="ts">
	import clsx, { type ClassValue } from 'clsx'
	import Scroll_area from './scroll-area.svelte'
	import Check_icon from '@lucide/svelte/icons/check'
	import Chevron_right_icon from '@lucide/svelte/icons/chevron-right'
	import { db } from '$lib/state/db.svelte'
	import { scenario_id_options, scenario_labels, type Scenario_id } from '$lib/data/schema'

	type Props = { value: Scenario_id; class?: ClassValue }
	let { value = $bindable(), class: class_ }: Props = $props()

	let trigger: HTMLButtonElement
	let menu: HTMLDivElement

	const uid = $props.id()
	const menu_id = `${uid}-menu`
	const scenario = $derived(db.s.t.s[value])

	const select = (new_value: Scenario_id) => {
		if (new_value === value) return
		value = new_value
		menu.hidePopover()
	}

	const toggle_menu = () => {
		// @ts-ignore new api
		menu.togglePopover({ source: trigger })
	}
</script>

<div class={['relative', clsx(class_)]}>
	<button
		bind:this={trigger}
		popovertarget={menu_id}
		onclick={(e) => e.preventDefault()}
		onpointerdown={toggle_menu}
		class="relative flex h-full w-32 items-center justify-center gap-10 border-t pt-34 pb-10 whitespace-nowrap orient-v hover:bg-accent">
		<div id="swatch" style="--color: var(--chart-{scenario.c})" class="size-8 rounded-full"></div>
		{scenario_labels[value]}
		<Chevron_right_icon class="pointer-events-none absolute top-6 text-muted" />
	</button>
	<div
		bind:this={menu}
		id={menu_id}
		popover="auto"
		class={['translate-x-4 orient-h place-right-middle shadow-md rounded-md border']}>
		<Scroll_area>
			{#each scenario_id_options as id}
				{@const selected = id === value}
				<button
					onpointerdown={() => select(id)}
					onpointerup={() => select(id)}
					class={[
						'relative flex w-full items-center py-6 pr-32 pl-8',
						selected ? '' : 'text-muted hover:bg-accent',
					]}>
					{scenario_labels[id]}
					<Check_icon class={['absolute right-6', selected ? '' : 'hidden']} />
				</button>
			{/each}
		</Scroll_area>
	</div>
</div>

<style>
	#swatch {
		background-color: var(--color);
	}
</style>
