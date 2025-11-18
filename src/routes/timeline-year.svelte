<script lang="ts">
	import { db } from '$lib/state/db.svelte'
	import { global } from '$lib/state/global.svelte'
	import Timeline_cell from './timeline-cell.svelte'

	type Props = { index: number }
	let { index }: Props = $props()

	const first = index === 0
	const last = index === db.s.s.h
	const hovered = $derived(global.hovered_timeline_index === index)

	const year = db.s.c.y + index
	const age = year - db.s.c.b
	const label = $derived({ y: year - 2000, a: age, i: index }[db.s.u.r])

	const show_label_always = db.s.s.h < 25 || first || last

	const not_empty = (obj: object) => obj !== undefined && Object.keys(obj).length !== 0
	const has_content = $derived(not_empty(db.s.t.s[db.s.t.a].b[year]) || not_empty(db.s.t.s[db.s.t.b].b[year]))
	const show_label = $derived(show_label_always || label % 5 === 0 || hovered || has_content)
</script>

<div
	onpointerenter={() => (global.hovered_timeline_index = index)}
	onpointerleave={() => (global.hovered_timeline_index = undefined)}
	class={['w-auto grow']}>
	<div class={['relative orient-v font-mono text-sm h-32 w-full', hovered ? 'text-fg' : 'text-muted']}>
		<div class={['absolute inset-0 place-content-center', show_label ? 'hidden' : 'grid']}>•</div>
		<div class={['absolute inset-0 place-content-center', show_label ? 'grid' : 'hidden']}>{label}</div>
	</div>
	<Timeline_cell year={year} scenario_id={db.s.t.a} class={['border-t']} />
	<Timeline_cell year={year} scenario_id={db.s.t.b} class={['border-t']} />
</div>
