<script lang="ts">
	import clsx from 'clsx'
	import type { Merge } from '$lib/utils.js'
	import { onMount, type Snippet } from 'svelte'
	import type { Scroll_id } from '$lib/data/schema'
	import { db } from '$lib/state/db.svelte'

	type Props = Merge<{ direction?: 'v' | 'h'; scroll_id?: Scroll_id; children: Snippet }, HTMLDivElement>
	let { scroll_id, direction = 'v', children, class: class_, ...rest }: Props = $props()

	const v = direction === 'v'

	let viewport = $state<HTMLDivElement>()!
	let viewport_size = $state<number>(1) // arbitrary finite value
	let scroll_size = $state<number>(1) // arbitrary finite value
	let scroll_start = $state<number>(0)

	let at_start = $derived(scroll_start < 1)
	let at_end = $derived(scroll_start + viewport_size > scroll_size - 1)
	let percent_start = $derived((100 * scroll_start) / scroll_size)
	let percent_end = $derived((100 * (scroll_size - scroll_start - viewport_size)) / scroll_size)

	onMount(() => {
		if (scroll_id) {
			scroll_start = db.s.u.s[scroll_id]
			viewport[v ? 'scrollTop' : 'scrollLeft'] = scroll_start
		}
		update_size()
		new MutationObserver(update_size).observe(viewport, { childList: true })
	})

	function update_size() {
		viewport_size = v ? viewport.clientHeight : viewport.clientWidth
		scroll_size = v ? viewport.scrollHeight : viewport.scrollWidth
	}

	function update_scroll() {
		scroll_start = v ? viewport.scrollTop : viewport.scrollLeft
		if (scroll_id) {
			db.s.u.s[scroll_id] = scroll_start
		}
	}

	function scroll_horizontal(event: WheelEvent) {
		if (!v && event.deltaY) {
			viewport.scrollLeft += event.deltaY
		}
	}
</script>

<div class={['relative group overflow-hidden', v ? 'h-full' : 'w-full', clsx(class_)]}>
	<div
		bind:this={viewport}
		onscroll={update_scroll}
		onwheel={scroll_horizontal}
		class={[v ? 'overflow-y-scroll max-h-full' : 'overflow-x-scroll max-w-full']}
		{...rest}>
		{@render children()}
	</div>
	<div
		class={[
			'pointer-events-none absolute from-chart-g/90 to-transparent',
			v ? 'inset-x-0 top-0 h-24 bg-linear-to-b' : 'inset-y-0 left-0 w-24 bg-linear-to-r',
			at_start ? 'hidden' : '',
		]}>
	</div>
	<div
		class={[
			'pointer-events-none absolute from-chart-g/90 to-transparent',
			v ? 'inset-x-0 bottom-0 h-24 bg-linear-to-t' : 'inset-y-0 right-0 w-24 bg-linear-to-l',
			at_end ? 'hidden' : '',
		]}>
	</div>
	<div
		class={[
			'pointer-events-none absolute not-group-hover:hidden delay-hide',
			v ? 'right-1 inset-y-0 w-2' : 'bottom-1 inset-x-0 h-2',
			at_start && at_end ? 'hidden' : '',
		]}>
		<div
			style={`${v ? 'top' : 'left'}: ${percent_start}%; ${v ? 'bottom' : 'right'}: ${percent_end}%;`}
			class={['absolute bg-muted rounded-full', v ? 'w-full' : 'h-full']}>
		</div>
	</div>
</div>
