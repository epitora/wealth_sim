<script lang="ts">
	import clsx from 'clsx'
	import { get_context, type Option_props } from './shared.js'
	import Check_icon from '@lucide/svelte/icons/check'

	let { value, label, class: class_, ...rest }: Option_props = $props()

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
	class={[
		'relative flex w-full items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm hover:bg-accent',
		active ? '' : 'text-muted-foreground',
		clsx(class_),
	]}
	{...rest}
>
	<Check_icon class={['absolute right-2 size-4', active ? '' : 'hidden']} />
	{label}
</button>
