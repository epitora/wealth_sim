<script lang="ts" generics="V extends Value">
	import clsx, { type ClassValue } from 'clsx'
	import type { Value } from '$lib/utils.js'
	import type { Icon as Icon_ } from '@lucide/svelte'
	import type { Component } from 'svelte'

	type Props = {
		value: V
		options: readonly V[]
		labcons: Record<V, { label: string; Icon: typeof Icon_ }>
		pages: Record<V, Component>
		class?: ClassValue
	}
	let { value = $bindable(), options, labcons, pages, class: class_ }: Props = $props()

	const Page = $derived(pages[value])

	const select = (new_value: V) => {
		if (new_value !== value) value = new_value
	}
</script>

<div class={['flex', clsx(class_)]}>
	<div class={['flex flex-row-reverse gap-2 orient-v']}>
		{#each options as option_value}
			{@const active = option_value === value}
			{@const labcon = labcons[option_value]}
			<button
				onpointerdown={() => select(option_value)}
				class={[
					'flex pb-10 pt-12 items-center justify-center gap-8 border border-r-0',
					active ?
						'rounded-lg w-36 -ml-2 rounded-r-none border-border'
					:	'rounded-md w-32 border-transparent text-muted hover:bg-accent',
				]}>
				<labcon.Icon />
				{labcon.label}
			</button>
		{/each}
	</div>
	<div
		class={[
			'w-full overflow-hidden rounded-lg border',
			value === options[0] ? 'rounded-tl-none' : '',
			// value === options[options.length - 1] ? 'rounded-bl-none' : '',
		]}>
		<Page />
	</div>
</div>
