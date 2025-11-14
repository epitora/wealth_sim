<script lang="ts">
	import clsx from 'clsx'
	import { get_context, type Option_props } from './shared.js'

	let { value, label, Icon, class: class_, ...rest }: Option_props = $props()

	const context = get_context()
	const active = $derived(value === context.value)
</script>

<button
	onpointerdown={() => context.set_value(value)}
	data-active={active}
	class={[
		'flex grow items-center box-content justify-center gap-2 border border-r-0 hover:bg-accent',
		active ? 'rounded-lg w-9 -ml-0.5 rounded-r-none border-border' : 'rounded-md w-8 border-transparent text-muted',
		clsx(class_),
	]}
	{...rest}>
	<Icon />
	{label}
</button>
