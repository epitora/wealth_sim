<script lang="ts">
	import clsx from 'clsx'
	import { type Field_props } from './shared.js'
	import { tooltip_manager } from '$lib/data/tooltip_manager.js'

	let { label, description, children, class: class_, ...rest }: Field_props = $props()

	let tooltip = $state<HTMLElement>()!
	let trigger = $state<HTMLElement>()!

	const uid = $props.id()
	const tooltip_id = `${uid}_tooltip`
	const has_tooltip = $derived(description !== undefined)

	function on_enter() {
		// @ts-ignore new api
		tooltip_manager.enter(() => tooltip.showPopover({ source: trigger }))
	}

	function on_leave() {
		tooltip_manager.leave(() => tooltip.hidePopover())
	}
</script>

<div class={['relative flex w-full items-center justify-between gap-3', clsx(class_)]} {...rest}>
	<button
		bind:this={trigger}
		popovertarget={tooltip_id}
		onclick={(e) => e.preventDefault()}
		onpointerenter={on_enter}
		onpointerleave={on_leave}
		class={['flex gap-2 text-sm position-bottom-right', has_tooltip ? 'hover:underline' : '']}
	>
		{label}
	</button>
	<div
		bind:this={tooltip}
		id={tooltip_id}
		popover="auto"
		class={[
			'pointer-events-none absolute max-w-34 -translate-x-2.5 translate-y-1 rounded-sm bg-primary px-2.5 py-1.5 text-xs text-primary-foreground shadow-md',
			has_tooltip ? '' : 'hidden',
		]}
	>
		{description}
	</div>
	{@render children()}
</div>
