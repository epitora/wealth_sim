<script lang="ts">
	import clsx from 'clsx'
	import { type Merge } from '$lib/utils.js'
	import { perm } from '$lib/data/perm'
	import { temp } from '$lib/data/temp.svelte'
	import Plus_icon from '@lucide/svelte/icons/plus'

	type Props = Merge<{ year: number }, HTMLDivElement>
	let { year, class: class_, ...rest }: Props = $props()

	const simulation = perm.data.s
	const timeline = perm.data.t
	const hovered = $derived(temp.data.hovered_year === year)

	const age = year - perm.data.u.y
	const metric = simulation.a ? age : year
	const show_label_always =
		simulation.e - simulation.s < 25 || year === simulation.s || year === simulation.e || metric % 5 === 0
	const show_label = $derived(show_label_always || hovered)
</script>

<div class={['group relative flex min-w-5 grow flex-col', clsx(class_)]} {...rest}>
	<div
		class={[
			'absolute top-0 right-0 mx-auto w-full orient-v font-mono text-sm text-muted',
			hovered ? 'text-fg' : '',
			simulation.a ? 'h-6' : 'h-10',
		]}>
		<div class={['absolute inset-0 grid place-content-center', show_label ? 'hidden' : '']}>•</div>
		<div class={['absolute inset-0 grid place-content-center', show_label ? '' : 'hidden']}>{metric}</div>
	</div>
	<div class="flex-1 flex">
		<button class={['bg-accent rounded-sm my-0.5 w-full not-group-hover:hidden']}>
			<Plus_icon class="text-muted" />
		</button>
	</div>
	<div class="flex-1 border-t flex">
		<button class={['bg-accent grid place-content-center rounded-sm my-0.5 w-full not-group-hover:hidden']}>
			<Plus_icon class="text-muted" />
		</button>
	</div>
	<div class={['flex-1 border-t flex', timeline.c ? '' : 'hidden']}>
		<button class={['hover:bg-accent rounded-sm my-0.5 w-full bg-error-accent']}>
			<Plus_icon class="text-muted" />
		</button>
	</div>
</div>
