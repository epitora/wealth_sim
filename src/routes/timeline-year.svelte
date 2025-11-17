<script lang="ts">
	import clsx from 'clsx'
	import { type Merge } from '$lib/utils.js'
	import { db } from '$lib/state/db.svelte'
	import { global } from '$lib/state/global.svelte'
	import Plus_icon from '@lucide/svelte/icons/plus'

	type Props = Merge<{ index: number }, HTMLDivElement>
	let { index, class: class_, ...rest }: Props = $props()

	const hovered = $derived(global.hovered_timeline_index === index)

	const year = db.s.w.y + index
	const age = year - db.s.p.b
	const label = { y: year, a: age, i: index }[db.s.u.r]
	const show_label_always = db.s.s.h < 25 || index === 0 || index === db.s.s.h || label % 5 === 0
	const show_label = $derived(show_label_always || hovered)
</script>

<div class={['group relative flex min-w-5 grow flex-col', clsx(class_)]} {...rest}>
	<div
		class={[
			'absolute top-0 right-0 mx-auto w-full orient-v font-mono text-sm text-muted',
			hovered ? 'text-fg' : '',
			db.s.u.r === 'y' ? 'h-10' : 'h-6',
		]}>
		<div class={['absolute inset-0 grid place-content-center', show_label ? 'hidden' : '']}>•</div>
		<div class={['absolute inset-0 grid place-content-center', show_label ? '' : 'hidden']}>{label}</div>
	</div>
	<div class="flex-4 flex">
		<button class={['bg-accent rounded-sm my-2 w-full not-group-hover:hidden']}>
			<Plus_icon class="text-muted" />
		</button>
	</div>
	<div class="flex-4 border-t flex">
		<button class={['bg-accent grid place-content-center rounded-sm my-2 w-full not-group-hover:hidden']}>
			<Plus_icon class="text-muted" />
		</button>
	</div>
	<div class={['flex-4 border-t flex', db.s.u.r ? '' : 'hidden']}>
		<button class={['hover:bg-accent rounded-sm my-2 w-full bg-error-accent']}>
			<Plus_icon class="text-muted" />
		</button>
	</div>
</div>
