<script lang="ts">
	import { db } from '$lib/state/db.svelte'
	import Plus_icon from '@lucide/svelte/icons/plus'
	import clsx, { type ClassValue } from 'clsx'
	import { global } from '$lib/state/global.svelte'

	type Props = { index: number; class?: ClassValue }
	let { index, class: class_ }: Props = $props()

	// const hovered = $derived(global.hovered_timeline_index === index)
</script>

<div class={['flex gap-2 min-w-32 group/cell', clsx(class_)]}>
	<button class={['grid place-content-center grow text-muted hover:bg-accent not-group-hover/cell:hidden']}>
		<Plus_icon />
	</button>
</div>
