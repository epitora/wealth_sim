<script lang="ts">
	import type { Component } from 'svelte'
	import { set_context, type Primitive, type Root_props } from './shared.js'

	let { value = $bindable(), on_change, children, class: styles = {}, ...rest }: Root_props = $props()

	let page = $state<Component>()

	set_context({
		get value() {
			return value
		},
		get page() {
			return page!
		},
		set_tab(tab_value: Primitive, tab_page: Component) {
			value = tab_value
			page = tab_page
			on_change?.(tab_value)
		}
	})
</script>

<div class={{ 'relative flex h-100': true, ...styles }} {...rest}>
	{@render children?.()}
</div>
