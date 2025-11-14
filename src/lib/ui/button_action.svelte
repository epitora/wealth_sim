<script lang="ts">
	import clsx from 'clsx'
	import { type Merge } from '$lib/utils.js'

	type Props = Merge<{ label: string }, HTMLButtonElement>
	let { label, class: class_, ...rest }: Props = $props()
</script>

<button
	class={['flex h-8 items-center gap-1.5 rounded-md border px-3 whitespace-nowrap hover:bg-accent', clsx(class_)]}
	{...rest}>
	{label}
</button>
