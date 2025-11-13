<script lang="ts">
	import { get_context, type Option_props } from './shared.js'
	import CheckIcon from '@lucide/svelte/icons/check'

	let { value, children, class: styles = {}, ...rest }: Option_props = $props()

	const context = get_context()
	const active = $derived(value === context.value)

	function select() {
		context.select_option(value)
		const menu = document.getElementById(context.menu_id)!
		menu.hidePopover()
	}
</script>

<button
	onpointerup={select}
	class={{
		'relative flex w-full items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm hover:bg-accent': true,
		'bg-accent': active,
		...styles
	}}
	{...rest}
>
	<CheckIcon class={{ 'absolute right-2 size-4 transition-none': true, 'hidden': !active }} />
	{@render children?.()}
</button>
