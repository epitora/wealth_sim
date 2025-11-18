<script lang="ts">
	import clsx, { type ClassValue } from 'clsx'
	import { onMount, type Snippet } from 'svelte'
	import type { Scroll_id } from '$lib/data/schema'
	import { db } from '$lib/state/db.svelte'

	type Props = {
		direction?: 'v' | 'h'
		scroll_id?: Scroll_id
		children: Snippet
		class?: ClassValue
		inner_class?: ClassValue
	}
	let { direction = 'v', scroll_id, children, class: class_, inner_class }: Props = $props()

	const v = direction === 'v'

	let view: HTMLDivElement
	let view_size = $state<number>(1) // arbitrary finite value
	let scroll_size = $state<number>(1) // arbitrary finite value
	let scroll_start = $state<number>(0)

	let at_start = $derived(scroll_start < 1)
	let at_end = $derived(scroll_start + view_size > scroll_size - 1)
	let percent_start = $derived((100 * scroll_start) / scroll_size)
	let percent_end = $derived(100 * (1 - (scroll_start + view_size) / scroll_size))

	onMount(() => {
		if (scroll_id) scroll_start = db.s.u.s[scroll_id]
		const observer = new ResizeObserver(update_size)
		observer.observe(view) // changes to view_size
		for (const child of view.children) {
			observer.observe(child) // changes to scroll_size
		}
		return () => observer.disconnect()
	})

	const update_size = () => {
		view[v ? 'scrollTop' : 'scrollLeft'] = scroll_start
		view_size = v ? view.clientHeight : view.clientWidth
		scroll_size = v ? view.scrollHeight : view.scrollWidth
	}

	const on_scroll = () => {
		scroll_start = v ? view.scrollTop : view.scrollLeft
		if (scroll_id) db.s.u.s[scroll_id] = Math.round(scroll_start)
	}

	const on_wheel = (event: WheelEvent) => {
		if (!v && event.deltaY) view.scrollLeft += event.deltaY
	}
</script>

<div class={['relative group/scroll overflow-hidden', clsx(class_)]}>
	<div
		bind:this={view}
		onscroll={on_scroll}
		onwheel={on_wheel}
		class={[
			'flex w-full h-full',
			v ? 'flex-col overflow-y-scroll' : 'flex-row overflow-x-scroll',
			clsx(inner_class),
		]}>
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
			'pointer-events-none absolute not-group-hover/scroll:hidden delay-hide',
			v ? 'right-1 inset-y-0 w-2' : 'bottom-1 inset-x-0 h-2',
			at_start && at_end ? 'hidden' : '',
		]}>
		<div
			style={`${v ? 'top' : 'left'}: ${percent_start}%; ${v ? 'bottom' : 'right'}: ${percent_end}%;`}
			class={['absolute bg-muted rounded-full', v ? 'w-full' : 'h-full']}>
		</div>
	</div>
</div>
