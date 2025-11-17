<script lang="ts" generics="V extends Value">
	import clsx from 'clsx'
	import type { Merge, Value } from '$lib/utils.js'

	type Props = Merge<
		{
			value: V
			values: readonly V[]
			labels?: Record<V, string>
			on_change?: (value: V) => void
		},
		HTMLDivElement
	>
	let { value = $bindable(), values, labels, on_change, class: class_, ...rest }: Props = $props()

	function select(new_value: V) {
		if (value !== new_value) {
			value = new_value
			on_change?.(new_value)
		}
	}
</script>

<div class={['flex h-32 overflow-hidden rounded-md border p-2', clsx(class_)]} {...rest}>
	{#each values as option_value}
		{@const selected = option_value === value}
		<button
			onpointerdown={() => select(option_value)}
			class={[
				'flex flex-4 items-center justify-center gap-6 rounded-sm px-8 py-4 whitespace-nowrap hover:bg-accent',
				selected ? '' : 'text-muted',
			]}>
			{labels?.[option_value] ?? option_value}
		</button>
	{/each}
</div>
