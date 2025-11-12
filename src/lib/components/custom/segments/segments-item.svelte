<script lang="ts">
	import { getContext } from 'svelte'
	import { Segments_Context_Key, type Segments_context } from './segments-context.js'
	import type { Segments_item_props } from './segments-types.js'

	let { class: class_, value, children, ...rest }: Segments_item_props = $props()

	const context = getContext<Segments_context>(Segments_Context_Key)
	if (!context) {
		throw new Error('SegmentsItem must be used within a Segments component')
	}

	const active = $derived(context.is_active(value))

	function handle_keydown(e: KeyboardEvent) {
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault()
			context.set_value(value)
		}
	}
</script>

<button
	type="button"
	role="tab"
	data-slot="segments-item"
	data-value={value}
	tabindex={active ? 0 : -1}
	class={{
		'inline-flex h-full flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm whitespace-nowrap transition-[color,background,box-shadow]': true,
		' text-muted-foreground': !active,
		' bg-accent text-foreground': active,
		[class_ as string]: true
	}}
	onpointerdown={() => context.set_value(value)}
	onkeydown={handle_keydown}
	{...rest}>
	{@render children?.()}
</button>
