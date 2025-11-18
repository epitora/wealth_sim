<script lang="ts" generics="V extends Value">
	import clsx, { type ClassValue } from 'clsx'
	import type { Value } from '$lib/utils.js'
	import Scroll_area from './scroll-area.svelte'
	import Check_icon from '@lucide/svelte/icons/check'
	import Chevron_down_icon from '@lucide/svelte/icons/chevron-down'
	import type { Scroll_id } from '$lib/data/schema'

	type Props = {
		value: V
		options: readonly V[]
		labels?: Record<V, string>
		scroll_id?: Scroll_id
		class?: ClassValue
	}
	let { value = $bindable(), options, labels, scroll_id, class: class_ }: Props = $props()

	let trigger: HTMLButtonElement
	let menu: HTMLDivElement
	const uid = $props.id()
	const menu_id = `${uid}-menu`

	const select = (new_value: V) => {
		if (new_value === value) return
		value = new_value
		menu.hidePopover()
	}

	const toggle_menu = () => {
		// @ts-ignore new api
		menu.togglePopover({ source: trigger })
	}
</script>

<div class={['min-w-80', clsx(class_)]}>
	<button
		bind:this={trigger}
		popovertarget={menu_id}
		onclick={(e) => e.preventDefault()}
		onpointerdown={toggle_menu}
		class="relative flex h-32 w-full items-center rounded-md border pr-34 pl-10 whitespace-nowrap hover:bg-accent">
		{labels?.[value] ?? value}
		<Chevron_down_icon class="pointer-events-none absolute right-6 text-muted" />
	</button>
	<div
		bind:this={menu}
		id={menu_id}
		popover="auto"
		class="translate-y-4 min-w-80 shadow-md border rounded-md place-bottom-middle">
		<Scroll_area scroll_id={scroll_id} class="h-256">
			{#each options as option_value}
				{@const selected = option_value === value}
				<button
					onpointerdown={() => select(option_value)}
					onpointerup={() => select(option_value)}
					class={[
						'relative flex w-full items-center py-6 pr-32 pl-8',
						selected ? '' : 'text-muted hover:bg-accent',
					]}>
					{labels?.[option_value] ?? option_value}
					<Check_icon class={['absolute right-6', selected ? '' : 'hidden']} />
				</button>
			{/each}
		</Scroll_area>
	</div>
</div>
