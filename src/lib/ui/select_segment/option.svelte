<script lang="ts">
	import clsx from 'clsx'
	import { get_context, type Option_props } from './shared.js'

	let { value, label, class: class_, ...rest }: Option_props = $props()

	const context = get_context()
	const active = $derived(value === context.value)
</script>

<button
	onpointerdown={() => context.select_option(value)}
	class={[
		'flex flex-1 items-center justify-center gap-1.5 rounded-sm px-2 py-1 text-sm whitespace-nowrap hover:bg-accent',
		active ? '' : 'text-muted-foreground',
		clsx(class_),
	]}
	{...rest}
>
	{label}
</button>
