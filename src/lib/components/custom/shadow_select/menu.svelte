<script lang="ts">
	import { get_context, type Menu_props } from './shared.js'

	let { children, class: styles = '', ...rest }: Menu_props = $props()

	const context = get_context()

	let viewport = $state<HTMLElement>()
	let at_top = $state(false)
	let at_bottom = $state(false)

	function update_shadows() {
		if (viewport !== undefined) {
			at_top = viewport.scrollTop === 0
			at_bottom = viewport.scrollTop + viewport.clientHeight >= viewport.scrollHeight
		}
	}
</script>

<div
	id={context.menu_id}
	popover="auto"
	ontoggle={update_shadows}
	class={{
		'absolute box-content max-h-64 min-w-32 translate-y-1 rounded-md border shadow-md': true,
		'animate-in fade-in-0 slide-in-from-top-5 zoom-in-95': true,
		[styles]: true
	}}
	{...rest}
>
	<div
		bind:this={viewport}
		onscroll={update_shadows}
		class={{
			'max-h-64 w-full overflow-y-auto p-1 [&::-webkit-scrollbar]:hidden': true
		}}
	>
		{@render children?.()}
	</div>
	<div
		class={{
			'pointer-events-none absolute inset-x-0 top-0 h-6 bg-linear-to-b from-background/90 to-transparent': true,
			'hidden': at_top
		}}
	></div>
	<div
		class={{
			'pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-linear-to-t from-background/90 to-transparent': true,
			'hidden': at_bottom
		}}
	></div>
</div>

<style>
	[popover] {
		position-area: bottom center;
	}
</style>
