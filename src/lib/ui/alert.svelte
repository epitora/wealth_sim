<script lang="ts">
	import clsx from 'clsx'
	import { type Merge } from '$lib/utils.js'
	import { alert_manager } from '$lib/data/manage_alert.svelte'
	import Circle_alert_icon from '@lucide/svelte/icons/circle-alert'
	import X_icon from '@lucide/svelte/icons/x'
	import Button_icon from './button_icon.svelte'

	type Props = Merge<{}, HTMLDivElement>
	let { class: class_, ...rest }: Props = $props()
</script>

<div
	class={[
		'grid grid-cols-[auto_1fr_auto] grid-rows-[1fr_auto] gap-x-3 gap-y-1 items-center',
		'pt-2 pb-4 pl-4 pr-4 absolute max-w-sm z-20 bg-background border shadow-md rounded-md top-4 mx-auto inset-x-0 text-destructive',
		alert_manager.open ? '' : 'hidden',
		clsx(class_),
	]}
	onpointerenter={() => alert_manager.pause()}
	onpointerleave={() => alert_manager.resume()}
	{...rest}>
	<Circle_alert_icon />
	<div class="font-medium">{alert_manager.title}</div>
	<Button_icon
		class="text-destructive! -mr-2 hover:bg-destructive/10"
		Icon={X_icon}
		on_click={() => alert_manager.close()} />
	<div class="col-start-2 col-span-2">{alert_manager.description}</div>
</div>
