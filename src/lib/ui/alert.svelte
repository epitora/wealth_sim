<script lang="ts">
	import clsx from 'clsx'
	import { type Merge } from '$lib/utils.js'
	import { alert_manager } from '$lib/data/alert.svelte'

	type Props = Merge<{}, HTMLDivElement>
	let { class: class_, ...rest }: Props = $props()
</script>

<div
	class={[
		'p-3 pl-4 gap-1 absolute text-error-fg max-w-md z-20 bg-bg border shadow-md rounded-lg top-4 mx-auto inset-x-0',
		alert_manager.open ? '' : 'hidden',
		clsx(class_),
	]}
	onpointerenter={() => alert_manager.interact()}
	onpointerleave={() => alert_manager.dismiss()}
	{...rest}>
	<div class="font-bold mb-1">{alert_manager.title}</div>
	<div>{alert_manager.description}</div>
</div>
