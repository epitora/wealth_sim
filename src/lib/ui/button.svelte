<script lang="ts">
	import clsx, { type ClassValue } from 'clsx'

	type Props = { label: string; on_click: () => void; variant?: 'outline' | 'ghost'; class?: ClassValue }
	let { label, on_click, variant = 'outline', class: class_ }: Props = $props()

	const variant_styles = {
		outline: 'border bg-fg text-bg hover:bg-fg/75',
		ghost: 'text-muted hover:bg-accent',
	}
</script>

<button
	onpointerdown={on_click}
	class={['flex h-32 px-12 items-center justify-center rounded-md', variant_styles[variant], clsx(class_)]}>
	{label}
</button>
