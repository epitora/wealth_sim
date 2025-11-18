<script lang="ts" generics="V extends Value">
	import clsx, { type ClassValue } from 'clsx'
	import type { Page, Value } from '$lib/utils.js'

	type Props = { value: V; values: readonly V[]; pages: Record<V, Page>; class?: ClassValue }
	let { value = $bindable(), values, pages, class: class_ }: Props = $props()

	const page = $derived(pages[value])

	const select = (new_value: V) => {
		if (new_value !== value) value = new_value
	}
</script>

<div class={['flex', clsx(class_)]}>
	<div class={['flex flex-row-reverse gap-2 orient-v']}>
		{#each values as option_value}
			{@const active = option_value === value}
			{@const option_page = pages[option_value]}
			<button
				onpointerdown={() => select(option_value)}
				class={[
					'flex pb-10 pt-12 items-center justify-center gap-8 border border-r-0',
					active ?
						'rounded-lg w-36 -ml-2 rounded-r-none border-border'
					:	'rounded-md w-32 border-transparent text-muted hover:bg-accent',
				]}>
				<option_page.Icon />
				{option_page.name}
			</button>
		{/each}
	</div>
	<div
		class={[
			'w-full overflow-hidden rounded-lg border',
			value === values[0] ? 'rounded-tl-none' : '',
			// value === values[values.length - 1] ? 'rounded-bl-none' : '',
		]}>
		<page.Content />
	</div>
</div>
