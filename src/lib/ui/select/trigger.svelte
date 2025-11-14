<script lang="ts">
	import clsx from 'clsx'
	import { get_context, type Trigger_props } from './shared.js'
	import Chevron_down_icon from '@lucide/svelte/icons/chevron-down'

	let { label, class: class_, ...rest }: Trigger_props = $props()

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
	popovertarget={context.menu_id}
	onclick={(e) => e.preventDefault()}
	onpointerdown={toggle_menu}
	class={[
		'relative flex h-8 w-full items-center gap-2 rounded-md border pr-9 pl-3 text-sm whitespace-nowrap hover:bg-accent',
		clsx(class_),
	]}
	{...rest}
>
	{label}
	<Chevron_down_icon class="pointer-events-none absolute right-3 size-4  text-muted-foreground" />
</button>
