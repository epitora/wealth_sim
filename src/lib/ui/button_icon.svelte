<script lang="ts">
	import clsx from 'clsx'
	import { type Merge } from '$lib/utils.js'
	import type { Icon as Icon_ } from '@lucide/svelte'

	type Props = Merge<
		{
			on_click: () => void
			Icon: typeof Icon_
		},
		HTMLButtonElement
	>
	let { on_click, Icon, class: class_, ...rest }: Props = $props()
</script>

<button
	class={['group grid size-8 place-content-center rounded-md text-muted-foreground hover:bg-accent', clsx(class_)]}
	onpointerdown={on_click}
	{...rest}>
	<Icon class="text-current" />
</button>
