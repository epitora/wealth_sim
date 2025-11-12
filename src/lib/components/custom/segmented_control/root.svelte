<script lang="ts">
	import { set_context, type Primitive, type Root_props } from './shared.js'

	let { value = $bindable(), on_change, children, class: styles = '', ...rest }: Root_props = $props()

	set_context({
		get value() {
			return value
		},
		set_value(new_value: Primitive) {
			value = new_value
			on_change?.(new_value)
		},
		is_selected(option_value: Primitive): boolean {
			return value === option_value
		}
	})
</script>

<div
	class={{
		'flex h-8 min-w-32 items-center justify-center overflow-hidden rounded-lg border p-0.5 text-muted-foreground': true,
		[styles]: true
	}}
	{...rest}
>
	{@render children?.()}
</div>
