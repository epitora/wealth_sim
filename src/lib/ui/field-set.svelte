<script lang="ts">
	import clsx from 'clsx'
	import type { Snippet } from 'svelte'
	import type { Merge } from '$lib/utils.js'

	type Props = Merge<{ heading: string; children: Snippet }, HTMLDivElement>
	let { heading, children, class: class_, ...rest }: Props = $props()
</script>

<div class={['flex w-256 flex-col gap-8', clsx(class_)]} {...rest}>
	<div class="mb-4 font-bold text-lg">{heading}</div>
	{@render children()}
</div>
