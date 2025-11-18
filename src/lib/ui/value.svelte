<script lang="ts" generics="V extends Value">
	import clsx, { type ClassValue } from 'clsx'
	import type { Value } from '$lib/utils.js'

	type Props = {
		value: V
		labels?: Record<V, string>
		unit?: string
		class?: ClassValue
	}
	let { value = $bindable(), labels, unit, class: class_ }: Props = $props()

	const select = (new_value: V) => {
		if (new_value !== value) value = new_value
	}
</script>

<div
	class={[
		'h-32 rounded-md border min-w-80 overflow-hidden grid place-content-center px-8 whitespace-nowrap',
		clsx(class_),
	]}>
	{labels?.[value] ?? value}
	{unit}
</div>
