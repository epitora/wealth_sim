<script lang="ts">
	import type { Merge } from '$lib/utils.js'

	type Props = Merge<{ label: string }, HTMLButtonElement>
	let { label, class: styles = {}, ...rest }: Props = $props()
</script>

<button class={{ 'flex h-8 items-center gap-1.5 rounded-md border px-3 whitespace-nowrap': true, ...styles }} {...rest}>
	{label}
</button>
