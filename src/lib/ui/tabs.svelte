<script lang="ts" generics="V extends Value">
	import clsx from 'clsx'
	import type { Merge, Page, Value } from '$lib/utils.js'

	type Props = Merge<
		{
			value: V
			values: readonly V[]
			pages: Record<V, Page>
			on_change?: (value: V) => void
		},
		HTMLDivElement
	>
	let { value = $bindable(), values, pages, on_change, class: class_, ...rest }: Props = $props()

	const page = $derived(pages[value])

	function select(new_value: V) {
		if (value !== new_value) {
			value = new_value
			on_change?.(new_value)
		}
	}
</script>

<div class={['flex', clsx(class_)]} {...rest}>
	<div class={['flex flex-row-reverse gap-2 orient-v']}>
		{#each values as option_value}
			{@const active = option_value === value}
			{@const option_page = pages[option_value]}
			<button
				onpointerdown={() => select(option_value)}
				data-active={active}
				class={[
					'flex grow items-center box-content justify-center gap-8 border border-r-0 hover:bg-accent',
					active ?
						'rounded-lg w-36 -ml-2 rounded-r-none border-border'
					:	'rounded-md w-32 border-transparent text-muted',
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
			value === values[values.length - 1] ? 'rounded-bl-none' : '',
		]}>
		<page.Content />
	</div>
</div>
