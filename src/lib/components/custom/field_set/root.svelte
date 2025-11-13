<script lang="ts">
	import { type Root_props } from './shared.js'

	let { heading, children, class: styles = {}, ...rest }: Root_props = $props()
</script>

<div class={{ 'flex w-64 flex-col gap-2': true, ...styles }} {...rest}>
	<div class="mb-1 font-medium">{heading}</div>
	{@render children()}
</div>
