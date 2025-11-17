<script lang="ts" generics="V extends Value">
	import clsx from 'clsx'
	import type { Merge, Value } from '$lib/utils.js'
	import type { Icon as Icon_ } from '@lucide/svelte'

	type Props = Merge<
		{
			value: V
			values: readonly V[]
			icons: Record<V, typeof Icon_>
			on_change?: (value: V) => void
		},
		HTMLButtonElement
	>
	let { value = $bindable(), values, icons, on_change, class: class_, ...rest }: Props = $props()

	const Icon = $derived(icons[value])

	function cycle() {
		const index = values.findIndex((x) => x === value)
		const next_index = (index + 1) % values.length
		value = values[next_index]
		on_change?.(value)
	}
</script>

<button
	onpointerdown={cycle}
	class={['grid size-32 place-content-center rounded-md border text-muted hover:bg-accent', clsx(class_)]}
	{...rest}>
	<Icon class="text-current" />
</button>
