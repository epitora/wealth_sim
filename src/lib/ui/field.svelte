<script lang="ts">
	import clsx from 'clsx'
	import type { Snippet } from 'svelte'
	import type { Merge } from '$lib/utils.js'
	import { tooltip_manager } from '$lib/state/tooltip.js'

	type Props = Merge<{ label: string; description?: string; children: Snippet }, HTMLDivElement>
	let { label, description, children, class: class_, ...rest }: Props = $props()

	let tooltip = $state<HTMLDivElement>()!
	let trigger = $state<HTMLButtonElement>()!

	const uid = $props.id()
	const tooltip_id = `${uid}_tooltip`
	const has_tooltip = description !== undefined

	function on_enter() {
		// @ts-ignore new api
		tooltip_manager.interact(() => tooltip.showPopover({ source: trigger }))
	}

	function on_leave() {
		tooltip_manager.leave(() => tooltip.hidePopover())
	}
</script>

<div class={['flex w-full items-center justify-between gap-2', clsx(class_)]} {...rest}>
	<button
		bind:this={trigger}
		popovertarget={tooltip_id}
		onclick={(e) => e.preventDefault()}
		onpointerenter={on_enter}
		onpointerleave={on_leave}
		class={['flex gap-32 whitespace-nowrap', has_tooltip ? 'hover:underline' : '']}>
		{label}
	</button>
	<!-- <div class="border-t grow -mr-2"></div> -->
	<div
		bind:this={tooltip}
		id={tooltip_id}
		popover="auto"
		class={[
			'pointer-events-none absolute place-bottom-right max-w-160 -translate-x-10 translate-y-4 rounded-sm bg-fg px-10 py-8 text-sm text-bg shadow-md',
			has_tooltip ? '' : 'hidden',
		]}>
		{description}
	</div>
	{@render children()}
</div>
