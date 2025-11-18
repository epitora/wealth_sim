<script lang="ts">
	import Field from '$lib/ui/field.svelte'
	import Value from '$lib/ui/value.svelte'
	import { block_icons, block_labels, frequency_labels, growth_type_labels, type Block } from '$lib/data/schema'
	import { clsx, type ClassValue } from 'clsx'
	import X_icon from '@lucide/svelte/icons/x'

	type Props = {
		block: Block
		on_delete: () => void
		class?: ClassValue
	}
	let { block, on_delete, class: class_ }: Props = $props()

	const Icon = $derived(block_icons[block.t])
</script>

<div class={['border rounded-md h-fit px-8 py-6 text-sm whitespace-nowrap', clsx(class_)]}>
	<div class="flex gap-6 items-center mb-4">
		<Icon class="size-14" />
		{block_labels[block.t]}
		<button
			class="text-muted ml-auto -mr-2 hover:bg-error-accent hover:text-error-fg p-1 rounded-full"
			onpointerdown={on_delete}>
			<X_icon class="size-14" />
		</button>
	</div>
	{#if block.t === 'i' || block.t === 'e'}
		${block.a} {frequency_labels[block.f].toLowerCase()}
	{/if}
	{#if block.t === 'm'}
		${block.a}
		{frequency_labels[block.f].toLowerCase()}<br />
		{block.r}% return<br />
		{block.v}% volatility
	{/if}
	{#if block.t === 'u'}
		${block.b}<br />
		${block.p} premium<br />
		${block.f} fee, ${block.c} COI<br />
		{block.r}% {growth_type_labels[block.g].toLowerCase()} growth
	{/if}
</div>
