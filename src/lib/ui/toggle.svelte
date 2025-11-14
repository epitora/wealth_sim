<script lang="ts">
	import clsx from 'clsx'
	import { type Merge } from '$lib/utils.js'
	import type { Icon as Icon_ } from '@lucide/svelte'

	type Props = Merge<
		{
			pressed: boolean
			on_change?: (pressed: boolean) => void
			Icon: typeof Icon_
		},
		HTMLButtonElement
	>
	let { pressed = $bindable(), on_change, Icon, class: class_, ...rest }: Props = $props()

	function toggle() {
		pressed = !pressed
		on_change?.(pressed)
	}
</script>

<button
	class={[
		'grid size-8 place-content-center rounded-md border hover:bg-accent',
		pressed ? '' : 'text-muted-foreground',
		clsx(class_),
	]}
	onpointerdown={toggle}
	{...rest}>
	<Icon class="text-current" />
</button>
