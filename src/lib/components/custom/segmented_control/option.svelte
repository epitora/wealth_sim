<script lang="ts">
	import { get_context, type Option_props } from './shared.js'

	let { value, children, class: styles = '', ...rest }: Option_props = $props()

	const context = get_context()
	const selected = $derived(context.is_selected(value))
</script>

<button
	onpointerdown={() => context.set_value(value)}
	class={{
		'inline-flex h-full flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm whitespace-nowrap transition-[color,background,box-shadow]': true,
		' text-muted-foreground': !selected,
		' bg-accent text-foreground': selected,
		[styles]: true
	}}
	{...rest}
>
	{@render children?.()}
</button>
