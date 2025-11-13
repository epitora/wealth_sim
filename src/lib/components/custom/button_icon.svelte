<script lang="ts">
	import type { Merge } from '$lib/utils.js'
	import { type Icon as Icon_ } from '@lucide/svelte'

	type Props = Merge<{ Icon: typeof Icon_ }, HTMLButtonElement>
	let { Icon, class: styles = {}, ...rest }: Props = $props()
</script>

<button class={{ 'flex h-8 items-center gap-1.5 rounded-md border px-3 whitespace-nowrap': true, ...styles }} {...rest}>
	<Icon class="size-4 text-current" />
</button>
