<script lang="ts">
	import clsx from 'clsx'
	import { set_context, type Primitive, type Root_props } from './shared.js'

	let { value = $bindable(), on_change, children, class: class_, ...rest }: Root_props = $props()

	set_context({
		get value() {
			return value
		},
		select_option(option_value: Primitive) {
			value = option_value
			on_change?.(option_value)
		},
	})
</script>

<div class={['flex h-8 gap-0.5 overflow-hidden rounded-md border p-0.5', clsx(class_)]} {...rest}>
	{@render children()}
</div>
