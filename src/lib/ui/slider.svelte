<script lang="ts">
	import clsx, { type ClassValue } from 'clsx'
	import { clip } from '$lib/utils.js'
	import Chevrons_left_right_icon from '@lucide/svelte/icons/chevrons-left-right'

	type Props = { value: number; min?: number; max?: number; step?: number; suffix?: string; class?: ClassValue }
	let { value = $bindable(), min = 0, max = 10, step = 1, suffix, class: class_ }: Props = $props()

	const calc_value = (i: number) => min + i * step
	const max_index = Math.round((max - min) / step)
	const decimal_places = Math.ceil(-Math.log10(Math.min(step, 1)))

	const index = $derived(Math.round((value - min) / step))
	let track: HTMLButtonElement
	let track_x: number
	let thumb_width = $state<number>(0)
	let dragging = $state(false)
	const spacing = $derived(Math.max((120 - thumb_width) / max_index, 2))

	const update_value = (client_x: number) => {
		const relative_x = client_x - track_x - thumb_width / 2
		const new_index = clip(Math.round(relative_x / spacing), 0, max_index)
		if (new_index !== index) value = calc_value(new_index)
	}

	const start_drag = (event: PointerEvent) => {
		dragging = true
		track_x = track.getBoundingClientRect().left
		update_value(event.clientX)
	}

	const continue_drag = (event: PointerEvent) => {
		if (dragging) update_value(event.clientX)
	}

	const end_drag = () => {
		if (dragging) dragging = false
	}
</script>

<svelte:window onpointermove={continue_drag} onpointerup={end_drag} />

<button
	bind:this={track}
	onpointerdown={start_drag}
	style={`width: ${thumb_width + spacing * max_index + 32}px;`}
	class={[
		'pr-30 h-32 rounded-md border min-w-80 overflow-hidden relative ',
		dragging ? 'bg-accent' : 'hover:bg-accent',
		clsx(class_),
	]}>
	<div style={`margin: 0 ${thumb_width / 2}px;`} class="border-t"></div>
	<div
		bind:clientWidth={thumb_width}
		style={`left: ${index * spacing}px;`}
		class={[
			'pointer-events-none absolute inset-y-0 grid bg-bg place-content-center px-6 h-full border-r',
			index === 0 ? '' : 'border-l',
			// index === max_index ? '' : 'border-r',
		]}>
		{#each Array.from({ length: max_index + 1 }) as _, option_index}
			{@const selected = option_index === index}
			<div class={['whitespace-nowrap col-start-1 row-start-1', selected ? '' : 'invisible']}>
				{calc_value(option_index).toFixed(decimal_places)}
				{suffix}
			</div>
		{/each}
	</div>
	<Chevrons_left_right_icon class="pointer-events-none absolute right-6 inset-y-0 my-auto text-muted" />
</button>
