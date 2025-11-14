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
		'flex grow items-center justify-center gap-2 rounded-md border pt-2.5 pb-2 text-sm font-normal hover:bg-accent',
		active
			? 'w-8.5 rounded-r-none border-r-0 border-border bg-accent pr-0.75'
			: 'w-8 border-transparent text-muted-foreground',
		clsx(class_),
	]}
	{...rest}
>
	<Icon class="size-4" />
	{label}
</button>
