<script lang="ts">
	import { set_context, type Primitive, type Root_props } from './shared.js'

	let { value = $bindable(), on_change, children, class: styles = {}, ...rest }: Root_props = $props()

	const uid = $props.id()
	const menu_id = `${uid}_menu`

	set_context({
		menu_id,
		get value() {
			return value
		},
		select_option(option_value: Primitive) {
			value = option_value
			on_change?.(option_value)
		}
	})
</script>

<div class={{ relative: true, ...styles }} {...rest}>
	{@render children?.()}
</div>
