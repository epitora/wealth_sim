<script lang="ts">
	import { get_context, type Trigger_props } from './shared.js'
	import Chevron_down_icon from '@lucide/svelte/icons/chevron-down'

	let { children, class: styles = {}, ...rest }: Trigger_props = $props()

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
		'relative flex h-8 min-w-32 items-center gap-2 rounded-md border py-2 pr-9 pl-3 text-sm whitespace-nowrap hover:bg-accent': true,
		...styles
	}}
	{...rest}
>
	{@render children?.()}
	<Chevron_down_icon class="pointer-events-none absolute right-3 size-4  text-muted-foreground" />
</button>
