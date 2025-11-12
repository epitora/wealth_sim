<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui'
	import { cn, type WithoutChild } from '$lib/utils.js'

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 4,
		portalProps,
		children,
		...restProps
	}: WithoutChild<SelectPrimitive.ContentProps> & {
		portalProps?: SelectPrimitive.PortalProps
	} = $props()

	let viewport = $state<HTMLElement | null>(null)
	let hide_top = $state(false)
	let hide_bottom = $state(false)

	$effect(update_shadows)

	function update_shadows() {
		if (viewport === null) {
			return
		}
		hide_top = viewport.scrollTop === 0
		hide_bottom = viewport.scrollTop + viewport.clientHeight >= viewport.scrollHeight
	}
</script>

<SelectPrimitive.Portal {...portalProps}>
	<SelectPrimitive.Content
		bind:ref
		{sideOffset}
		data-slot="select-content"
		class={cn(
			'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-h-(--bits-select-content-available-height) origin-(--bits-select-content-transform-origin) relative z-50 min-w-24 overflow-y-auto overflow-x-hidden rounded-md border shadow-md data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
			className
		)}
		{...restProps}
	>
		<SelectPrimitive.Viewport
			bind:ref={viewport}
			onscroll={update_shadows}
			class={cn('h-(--bits-select-anchor-height) min-w-(--bits-select-anchor-width) w-full scroll-my-1 p-1')}
		>
			{@render children?.()}
		</SelectPrimitive.Viewport>
		<div
			class={{
				'absolute inset-x-0 top-0 h-6 bg-linear-to-b from-background to-transparent pointer-events-none': true,
				hidden: hide_top,
			}}
		></div>
		<div
			class={{
				'absolute inset-x-0 bottom-0 h-6 bg-linear-to-t from-background to-transparent pointer-events-none': true,
				hidden: hide_bottom,
			}}
		></div>
	</SelectPrimitive.Content>
</SelectPrimitive.Portal>
