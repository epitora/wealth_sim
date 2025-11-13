<script lang="ts">
	import { type Field_props } from './shared.js'
	import { tooltip_manager } from '$lib/data/tooltip_manager.js'

	let { label, description, children, class: styles = {}, ...rest }: Field_props = $props()

	let tooltip = $state<HTMLElement>()!
	let trigger = $state<HTMLElement>()!

	const uid = $props.id()
	const tooltip_id = `${uid}_tooltip`
	const has_tooltip = $derived(description !== undefined)
</script>

<div class={{ 'relative flex w-full items-center justify-between gap-3': true, ...styles }} {...rest}>
	<button
		bind:this={trigger}
		popovertarget={tooltip_id}
		onclick={(e) => e.preventDefault()}
		onpointerenter={() => tooltip_manager.enter(() => tooltip.showPopover({ source: trigger }))}
		onpointerleave={() => tooltip_manager.leave(() => tooltip.hidePopover())}
		class={{ 'flex grow gap-2 text-sm': true, 'hover:underline': has_tooltip }}
	>
		{label}
	</button>
	<div
		bind:this={tooltip}
		id={tooltip_id}
		popover="auto"
		class={{
			'pointer-events-none absolute max-w-34 translate-y-1 rounded-sm bg-primary px-2.5 py-1.5 text-xs text-primary-foreground': true,
			'hidden': !has_tooltip
		}}
	>
		{description}
	</div>
	{@render children()}
</div>

<style>
	[popover] {
		position-area: bottom span-all;
	}
</style>
