<script lang="ts">
	import { get_context, type Option_props } from './shared.js'

	let { value, label, Icon, class: styles = {}, ...rest }: Option_props = $props()

	const context = get_context()
	const active = $derived(value === context.value)

	if (context.value === value) {
		context.set_value(value)
	}
</script>

<button
	onpointerdown={() => context.set_value(value)}
	data-active={active}
	class={{
		'flex grow items-center justify-center gap-2 rounded-md border text-sm font-normal hover:bg-accent': true,
		'h-8.5 rounded-b-none border-b-0 border-border bg-accent pb-0.75': active,
		'h-8 border-transparent text-muted-foreground': !active,
		...styles
	}}
	{...rest}
>
	<Icon class="size-4 rotate-90" />
	{label}
</button>
