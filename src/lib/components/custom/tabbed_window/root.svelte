<script lang="ts">
	import { set_context, type Primitive, type Root_props } from './shared.js'

	let { value = $bindable(), on_change, children, class: styles = {}, ...rest }: Root_props = $props()

	set_context({
		get value() {
			return value
		},
		set_value(tab_value: Primitive) {
			value = tab_value
			on_change?.(tab_value)
		}
	})
</script>

<div class={{ 'relative flex h-100': true, ...styles }} {...rest}>
	{@render children()}
</div>
