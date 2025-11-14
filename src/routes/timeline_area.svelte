<script lang="ts">
	import { persistent } from '$lib/data/persistent'
	import { onMount } from 'svelte'
	import Timeline_year from './timeline_year.svelte'

	const p = persistent.data.simulation

	let viewport = $state<HTMLElement>()!
	let at_start = $state(true)
	let at_end = $state(true)

	onMount(update_shadows)

	function update_shadows() {
		at_start = viewport.scrollLeft < 1
		at_end = viewport.scrollLeft + viewport.clientWidth > viewport.scrollWidth - 1
	}

	function scroll_horizontal(e: WheelEvent) {
		viewport.scrollLeft += e.deltaY
	}
</script>

<div class="relative h-full w-[calc(100%-2rem)]">
	<div
		class="flex h-full w-full px-0.5 overflow-x-auto"
		bind:this={viewport}
		onscroll={update_shadows}
		onwheel={scroll_horizontal}>
		{#each Array.from({ length: p.end_year - p.start_year + 1 }) as _, index}
			<Timeline_year year={p.start_year + index} />
		{/each}
	</div>
	<div
		class={[
			'pointer-events-none absolute inset-y-0 left-0 w-6 bg-linear-to-r from-bg/90 to-transparent',
			at_start ? 'hidden' : '',
		]}>
	</div>
	<div
		class={[
			'pointer-events-none absolute inset-y-0 right-0 w-6 bg-linear-to-l from-bg/90 to-transparent',
			at_end ? 'hidden' : '',
		]}>
	</div>
</div>
