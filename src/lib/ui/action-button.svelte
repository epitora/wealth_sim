<script lang="ts">
	import clsx from 'clsx'
	import { type Merge } from '$lib/utils.js'
	import type { Icon as Icon_ } from '@lucide/svelte'
	import Circle_check_icon from '@lucide/svelte/icons/circle-check'
	import Circle_x_icon from '@lucide/svelte/icons/circle-x'
	import Loader_circle_icon from '@lucide/svelte/icons/loader-circle'
	import Circle_icon from '@lucide/svelte/icons/circle'

	type Props = Merge<
		{
			on_start: () => void
			Icon: typeof Icon_
			Success_icon: typeof Icon_
			Fail_icon: typeof Icon_
		},
		HTMLButtonElement
	>
	let {
		on_start,
		Icon,
		Success_icon = Circle_check_icon,
		Fail_icon = Circle_x_icon,
		class: class_,
		...rest
	}: Props = $props()

	// idle, loading,
	type Status = 0 | 1 | 2 | 3
	let status = $state(0)

	function on_click() {}
</script>

<button
	class={['group grid size-32 place-content-center rounded-md text-muted hover:bg-accent', clsx(class_)]}
	onpointerdown={on_click}
	{...rest}>
	<Icon class="text-current" />
</button>
