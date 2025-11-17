<script lang="ts">
	import clsx from 'clsx'
	import type { Merge } from '$lib/utils.js'
	import { onMount, type Snippet } from 'svelte'
	import type { Scroll_id } from '$lib/data/schema'
	import { db } from '$lib/state/db.svelte'

	type Props = Merge<{ direction?: 'v' | 'h'; scroll_id?: Scroll_id; children: Snippet }, HTMLDivElement>
	let { direction = 'v', scroll_id, children, class: class_, ...rest }: Props = $props()

	const v = direction === 'v'

	let viewport = $state<HTMLDivElement>()!
	let view_size = $state<number>(1) // arbitrary finite value
	let scroll_size = $state<number>(1) // arbitrary finite value
	let scroll_start = $state<number>(0)

	let at_start = $derived(scroll_start < 1)
	let at_end = $derived(scroll_start + view_size > scroll_size - 1)
	let percent_start = $derived((100 * scroll_start) / scroll_size)
	let percent_end = $derived(100 * (1 - (scroll_start + view_size) / scroll_size))

	onMount(() => {
		if (scroll_id) {
			scroll_start = db.s.u.s[scroll_id]
		}
		const observer = new ResizeObserver(update_size)
		observer.observe(viewport)
		return () => {
			observer.disconnect()
		}
	})

	function update_size() {
		viewport[v ? 'scrollTop' : 'scrollLeft'] = scroll_start
		view_size = v ? viewport.clientHeight : viewport.clientWidth
		scroll_size = v ? viewport.scrollHeight : viewport.scrollWidth
	}

	function on_scroll() {
		scroll_start = v ? viewport.scrollTop : viewport.scrollLeft
		if (scroll_id) {
			db.s.u.s[scroll_id] = Math.round(scroll_start)
		}
	}

	function on_wheel(event: WheelEvent) {
		if (!v && event.deltaY) {
			viewport.scrollLeft += event.deltaY
		}
	}
</script>

<div class={['relative group overflow-hidden', clsx(class_)]}>
	<div
		bind:this={viewport}
		onscroll={on_scroll}
		onwheel={on_wheel}
		class={['p-2', v ? 'h-full overflow-y-scroll' : 'w-full overflow-x-scroll']}
		{...rest}>
		{@render children()}
	</div>
	<div
		class={[
			'pointer-events-none absolute from-bg/90 to-transparent',
			v ? 'inset-x-0 top-0 h-24 bg-linear-to-b' : 'inset-y-0 left-0 w-24 bg-linear-to-r',
			at_start ? 'hidden' : '',
		]}>
	</div>
	<div
		class={[
			'pointer-events-none absolute from-bg/90 to-transparent',
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
