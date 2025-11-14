<script lang="ts">
	import clsx from 'clsx'
	import { get_context, type Trigger_props } from './shared.js'
	import Chevron_right_icon from '@lucide/svelte/icons/chevron-right'

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
		'relative flex h-full w-8 flex-col items-start justify-center gap-2 rounded-md border pt-9 pb-3 text-sm whitespace-nowrap orient-vertical hover:bg-accent',
		clsx(class_),
	]}
	{...rest}
>
	{label}
	<Chevron_right_icon class="pointer-events-none absolute top-3 size-4 text-muted-foreground" />
</button>
