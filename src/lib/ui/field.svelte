<script lang="ts">
	import clsx, { type ClassValue } from 'clsx'
	import type { Snippet } from 'svelte'
	import { tooltip_manager } from '$lib/state/tooltip.js'

	type Props = { label: string; description?: string; children: Snippet; class?: ClassValue }
	let { label, description, children, class: class_ }: Props = $props()

	let tooltip: HTMLDivElement
	let trigger: HTMLButtonElement

	const uid = $props.id()
	const tooltip_id = `${uid}-tooltip`

	const on_enter = () => {
		// @ts-ignore new api
		tooltip_manager.interact(() => tooltip.showPopover({ source: trigger }))
	}

	const on_leave = () => {
		tooltip_manager.leave(() => tooltip.hidePopover())
	}
</script>

<div class={['flex w-full items-center justify-between gap-8', clsx(class_)]}>
	<button
		bind:this={trigger}
		popovertarget={tooltip_id}
		onclick={(e) => e.preventDefault()}
		onpointerenter={on_enter}
		onpointerleave={on_leave}
		class={['whitespace-nowrap', description ? 'underline' : '']}>
		{label}
	</button>
	<!-- <div class="border-t grow -mr-8"></div> -->
	<div
		bind:this={tooltip}
		id={tooltip_id}
		popover="auto"
		class={[
			'pointer-events-none absolute place-bottom-right max-w-160 -translate-x-10 translate-y-4 rounded-md bg-fg px-10 py-8 text-sm text-bg shadow-md',
			description ? '' : 'hidden',
		]}>
		{description}
	</div>
	{@render children()}
</div>
