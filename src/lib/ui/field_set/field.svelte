<script lang="ts">
	import clsx from 'clsx'
	import { type Field_props } from './shared.js'
	import { field_tip_manager } from '$lib/data/tooltip.js'

	let { label, description, children, class: class_, ...rest }: Field_props = $props()

	let tooltip = $state<HTMLElement>()!
	let trigger = $state<HTMLElement>()!

	const uid = $props.id()
	const tooltip_id = `${uid}_tooltip`
	const has_tooltip = description !== undefined

	function on_enter() {
		// @ts-ignore new api
		field_tip_manager.enter(() => tooltip.showPopover({ source: trigger }))
	}

	function on_leave() {
		field_tip_manager.leave(() => tooltip.hidePopover())
	}
</script>

<div class={['flex w-full items-center justify-between gap-3', clsx(class_)]} {...rest}>
	<button
		bind:this={trigger}
		popovertarget={tooltip_id}
		onclick={(e) => e.preventDefault()}
		onpointerenter={on_enter}
		onpointerleave={on_leave}
		class={['flex gap-2', has_tooltip ? 'hover:underline' : '']}>
		{label}
	</button>
	<div
		bind:this={tooltip}
		id={tooltip_id}
		popover="auto"
		class={[
			'pointer-events-none absolute place-bottom-right max-w-34 -translate-x-2.5 translate-y-1 rounded-sm bg-fg px-2.5 py-1.5 text-sm text-bg shadow-md',
			has_tooltip ? '' : 'hidden',
		]}>
		{description}
	</div>
	{@render children()}
</div>
