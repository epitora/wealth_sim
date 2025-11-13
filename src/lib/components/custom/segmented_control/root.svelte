<script lang="ts">
	import { set_context, type Primitive, type Root_props } from './shared.svelte.js'

	let { value = $bindable(), on_change, children, class: styles = {}, ...rest }: Root_props = $props()

	set_context({
		get value() {
			return value
		},
		select_option(option_value: Primitive) {
			value = option_value
			on_change?.(option_value)
		}
	})
</script>

<div
	class={{ 'flex h-8 min-w-32 items-stretch gap-0.5 overflow-hidden rounded-md border p-0.5': true, ...styles }}
	{...rest}
>
	{@render children?.()}
</div>
