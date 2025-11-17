<script lang="ts" generics="V extends Value">
	import clsx from 'clsx'
	import type { Merge, Value } from '$lib/utils.js'
	import Scroll_area from './scroll-area.svelte'
	import Check_icon from '@lucide/svelte/icons/check'
	import Chevron_down_icon from '@lucide/svelte/icons/chevron-down'
	import type { Scroll_id } from '$lib/data/schema'

	type Props = Merge<
		{
			value: V
			values: readonly V[]
			labels?: Record<V, string>
			on_change?: (value: V) => void
			scroll_id?: Scroll_id
		},
		HTMLDivElement
	>
	let { value = $bindable(), values, labels, on_change, scroll_id, class: class_, ...rest }: Props = $props()

	let trigger = $state<HTMLButtonElement>()!
	let menu = $state<HTMLDivElement>()!
	const uid = $props.id()
	const menu_id = `${uid}_menu`

	function select(new_value: V) {
		if (value !== new_value) {
			value = new_value
			on_change?.(new_value)
		}
		menu.hidePopover()
	}

	function toggle_menu() {
		// @ts-ignore new api
		menu.togglePopover({ source: trigger })
	}
</script>

<div class={[clsx(class_)]} {...rest}>
	<button
		bind:this={trigger}
		popovertarget={menu_id}
		onclick={(e) => e.preventDefault()}
		onpointerdown={toggle_menu}
		class="relative flex h-32 w-full items-center rounded-md border pr-36 pl-10 whitespace-nowrap hover:bg-accent">
		{labels?.[value] ?? value}
		<Chevron_down_icon class="pointer-events-none absolute right-8 text-muted" />
	</button>
	<div
		bind:this={menu}
		id={menu_id}
		popover="auto"
		class="translate-y-4 shadow-md border rounded-md place-bottom-middle">
		<Scroll_area scroll_id={scroll_id} class="h-256">
			{#each values as option_value}
				{@const selected = option_value === value}
				<button
					onpointerdown={() => select(option_value)}
					onpointerup={() => select(option_value)}
					class={[
						'relative flex w-full items-center rounded-sm py-6 pr-34 pl-8 hover:bg-accent',
						selected ? '' : 'text-muted',
					]}>
					{labels?.[option_value] ?? option_value}
					<Check_icon class={['absolute right-8', selected ? '' : 'hidden']} />
				</button>
			{/each}
		</Scroll_area>
	</div>
</div>
