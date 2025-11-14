<script lang="ts">
	import clsx from 'clsx'
	import { get_context, type Menu_props } from './shared.js'

	let { children, class: class_, ...rest }: Menu_props = $props()

	const context = get_context()

	let viewport = $state<HTMLElement>()!
	let at_start = $state(true)
	let at_end = $state(true)

	function update_shadows() {
		at_start = viewport.scrollTop < 1
		at_end = viewport.scrollTop + viewport.clientHeight > viewport.scrollHeight - 1
	}
</script>

<div
	id={context.menu_id}
	popover="auto"
	ontoggle={update_shadows}
	class={[
		'absolute box-content max-h-64 min-w-32 translate-x-1 rounded-md border shadow-md orient-h place-right-middle',
		clsx(class_),
	]}
	{...rest}>
	<div bind:this={viewport} onscroll={update_shadows} class={['max-h-64 w-full overflow-y-auto p-0.5']}>
		{@render children()}
	</div>
	<div
		class={[
			'pointer-events-none absolute inset-x-0 top-0 h-6 bg-linear-to-b from-bg/90 to-transparent',
			at_start ? 'hidden' : '',
		]}>
	</div>
	<div
		class={[
			'pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-linear-to-t from-bg/90 to-transparent',
			at_end ? 'hidden' : '',
		]}>
	</div>
</div>
