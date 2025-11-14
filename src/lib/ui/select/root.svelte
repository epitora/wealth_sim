<script lang="ts">
	import clsx from 'clsx'
	import { set_context, type Primitive, type Root_props } from './shared.js'

	let { value = $bindable(), on_change, children, class: class_, ...rest }: Root_props = $props()

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
		},
	})
</script>

<div class={[clsx(class_)]} {...rest}>
	{@render children()}
</div>
