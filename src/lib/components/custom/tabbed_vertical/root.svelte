<script lang="ts">
	import clsx from 'clsx'
	import { set_context, type Primitive, type Root_props } from './shared.js'

	let { value = $bindable(), on_change, children, class: class_, ...rest }: Root_props = $props()

	set_context({
		get value() {
			return value
		},
		set_value(tab_value: Primitive) {
			value = tab_value
			on_change?.(tab_value)
		},
	})
</script>

<div class={['flex', clsx(class_)]} {...rest}>
	{@render children()}
</div>
