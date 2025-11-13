<script lang="ts">
	import { get_context, type Content_props } from './shared.js'

	let { children, class: styles = {}, ...rest }: Content_props = $props()

	const context = get_context()
</script>

<div class={{ 'relative ml-8.5 h-full w-full overflow-hidden rounded-md border': true, ...styles }} {...rest}>
	{#key context.value}
		<div class={{ 'absolute inset-0 animate-in fade-in': true }}>
			<context.page />
		</div>
	{/key}
</div>
