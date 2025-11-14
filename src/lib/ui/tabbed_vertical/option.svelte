<script lang="ts">
	import clsx from 'clsx'
	import { get_context, type Option_props } from './shared.js'

	let { value, label, Icon, class: class_, ...rest }: Option_props = $props()

	const context = get_context()
	const active = $derived(value === context.value)

	if (context.value === value) {
		context.set_value(value)
	}
</script>

<button
	onpointerdown={() => context.set_value(value)}
	data-active={active}
	class={[
		'flex grow items-center box-content justify-center gap-2 rounded-md border border-r-0 hover:bg-accent',
		active ? 'w-9 -ml-0.5 rounded-r-none border-border' : 'w-8 border-transparent text-muted-foreground',
		clsx(class_),
	]}
	{...rest}>
	<Icon />
	{label}
</button>
