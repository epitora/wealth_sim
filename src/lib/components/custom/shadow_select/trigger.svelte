<script lang="ts">
	import { get_context, type Trigger_props } from './shared.js'
	import Chevron_down_icon from '@lucide/svelte/icons/chevron-down'

	let { children, class: styles = '', ...rest }: Trigger_props = $props()

	const context = get_context()
	let trigger = $state<HTMLElement>()

	function toggle_menu() {
		const menu = document.getElementById(context.menu_id)!
		// @ts-ignore new api
		menu.togglePopover({ source: trigger })
	}
</script>

<button
	bind:this={trigger}
	onclick={(e) => e.preventDefault()}
	onpointerdown={toggle_menu}
	popovertarget={context.menu_id}
	class={{
		'relative flex h-8 min-w-32 items-center justify-between gap-2 rounded-md border border-border bg-transparent py-2 pr-9 pl-3 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none select-none *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2': true,
		[styles]: true
	}}
	{...rest}
>
	{@render children?.()}
	<Chevron_down_icon class="pointer-events-none absolute right-3 size-4  text-muted-foreground" />
</button>
