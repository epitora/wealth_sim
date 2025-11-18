<script lang="ts" generics="V extends Value">
	import clsx, { type ClassValue } from 'clsx'
	import type { Value } from '$lib/utils.js'

	type Props = {
		value: V
		values: readonly V[]
		labels?: Record<V, string>
		unit?: string
		class?: ClassValue
	}
	let { value = $bindable(), values, labels, unit, class: class_ }: Props = $props()

	const select = (new_value: V) => {
		if (new_value !== value) value = new_value
	}
</script>

<div class={['flex h-32 rounded-md border min-w-80 overflow-hidden', clsx(class_)]}>
	{#each values as option_value}
		{@const selected = option_value === value}
		<button
			onpointerdown={() => select(option_value)}
			class={['grid place-content-center px-8 whitespace-nowrap', selected ? '' : 'text-muted hover:bg-accent']}>
			{labels?.[option_value] ?? option_value}
			{selected ? unit : ''}
		</button>
	{/each}
</div>
