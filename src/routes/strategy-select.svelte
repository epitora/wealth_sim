<script lang="ts">
	import clsx from 'clsx'
	import type { Merge } from '$lib/utils.js'
	import Scroll_area from '../lib/ui/scroll-area.svelte'
	import Check_icon from '@lucide/svelte/icons/check'
	import Chevron_right_icon from '@lucide/svelte/icons/chevron-right'
	import { db } from '$lib/state/db.svelte'
	import type { Strategy_id } from '$lib/data/schema'

	type Props = Merge<
		{
			value: Strategy_id
			on_change?: (id: Strategy_id) => void
		},
		HTMLDivElement
	>
	let { value = $bindable(), on_change, class: class_, ...rest }: Props = $props()

	let trigger = $state<HTMLButtonElement>()!
	let menu = $state<HTMLDivElement>()!

	const uid = $props.id()
	const menu_id = `${uid}_menu`
	const strategy = $derived(db.s.t.s.find((x) => x.i === value)!)

	function select(new_id: Strategy_id) {
		if (value !== new_id) {
			value = new_id
			on_change?.(new_id)
		}
		menu.hidePopover()
	}

	function toggle_menu() {
		// @ts-ignore new api
		menu.togglePopover({ source: trigger })
	}
</script>

<div class={['relative', clsx(class_)]} {...rest}>
	<button
		bind:this={trigger}
		popovertarget={menu_id}
		onclick={(e) => e.preventDefault()}
		onpointerdown={toggle_menu}
		class="relative flex h-full w-32 items-center gap-8 border-t pt-36 pb-10 whitespace-nowrap orient-v hover:bg-accent">
		<div id="swatch" style="--color: var(--chart-{strategy.c})" class="size-8 rounded-full"></div>
		{strategy.l}
		<Chevron_right_icon class="pointer-events-none absolute top-8 text-muted" />
	</button>
	<div
		bind:this={menu}
		id={menu_id}
		popover="auto"
		class={['translate-x-4 orient-h place-right-middle shadow-md rounded-md border']}>
		<Scroll_area class="p-2">
			{#each db.s.t.s as option}
				{@const selected = option.i === value}
				<button
					onpointerdown={() => select(option.i)}
					onpointerup={() => select(option.i)}
					class={[
						'relative flex w-full items-center gap-32 rounded-sm py-6 pr-34 pl-8 hover:bg-accent',
						selected ? '' : 'text-muted',
					]}>
					{option.l}
					<Check_icon class={['absolute right-8', selected ? '' : 'hidden']} />
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
