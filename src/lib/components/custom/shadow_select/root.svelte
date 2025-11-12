<script lang="ts">
	import { set_context, type Primitive, type Root_props } from './shared.js'

	let { value = $bindable(), on_change, children, class: styles = '', ...rest }: Root_props = $props()

	const uid = $props.id()
	let open = $state(false)

	set_context({
		menu_id: `${uid}-menu`,
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
		relative: true,
		[styles]: true
	}}
	{...rest}
>
	{@render children?.()}
</div>
