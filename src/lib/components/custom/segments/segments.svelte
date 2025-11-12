<script lang="ts">
	import { setContext } from 'svelte'
	import type { Primitive, Segments_root_props } from './segments-types.js'
	import { Segments_Context_Key, type Segments_context } from './segments-context.js'

	let { class: class_, value = $bindable(), on_value_change, children, ...rest }: Segments_root_props = $props()

	function set_value(new_value: Primitive) {
		value = new_value
		on_value_change?.(new_value)
	}

	function is_active(item_value: Primitive): boolean {
		return value === item_value
	}

	setContext<Segments_context>(Segments_Context_Key, {
		get value() {
			return value
		},
		set_value: set_value,
		is_active: is_active
	})
</script>

<div
	class={{
		'flex h-8 min-w-32 items-center justify-center overflow-hidden rounded-lg border p-0.5 text-muted-foreground': true,
		[class_ as string]: true
	}}
	{...rest}>
	{@render children?.()}
</div>
