<script lang="ts" generics="V extends Value">
	import clsx, { type ClassValue } from 'clsx'
	import type { Value } from '$lib/utils.js'
	import type { Icon as Icon_ } from '@lucide/svelte'

	type Props = {
		value: V
		options: readonly V[]
		icons: Record<V, typeof Icon_>
		class?: ClassValue
	}
	let { value = $bindable(), options, icons, class: class_ }: Props = $props()

	const Icon = $derived(icons[value])

	const cycle = () => {
		const index = options.findIndex((x) => x === value)
		const next_index = (index + 1) % options.length
		value = options[next_index]
	}
</script>

<button
	onpointerdown={cycle}
	class={['grid size-32 place-content-center rounded-md border text-muted hover:bg-accent', clsx(class_)]}>
	<Icon />
</button>
