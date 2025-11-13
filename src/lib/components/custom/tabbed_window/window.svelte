<script lang="ts">
	import { type Content_props } from './shared.js'

	let { children, class: styles = {}, ...rest }: Content_props = $props()
</script>

<div class={{ 'relative ml-8.5 h-full w-full overflow-hidden rounded-md border': true, ...styles }} {...rest}>
	<div class={{ 'absolute inset-0': true }}>
		{@render children()}
	</div>
</div>
