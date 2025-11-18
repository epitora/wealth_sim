<script lang="ts">
	import clsx, { type ClassValue } from 'clsx'
	import type { Snippet } from 'svelte'

	type Props = { heading: string; children: Snippet; class?: ClassValue }
	let { heading, children, class: class_ }: Props = $props()
</script>

<div class={['flex w-300 flex-col h-fit gap-8 px-22 py-16', clsx(class_)]}>
	<div class="mb-4 font-bold text-lg">{heading}</div>
	{@render children()}
</div>
