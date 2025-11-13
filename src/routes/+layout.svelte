<script lang="ts">
	import '../app.css'
	import { persistent } from '$lib/data/persistent'
	import { Toaster } from '$lib/components/ui/sonner/index.js'
	import LoaderCircleIcon from '@lucide/svelte/icons/loader-circle'
	import InfoIcon from '@lucide/svelte/icons/info'
	import CircleCheckIcon from '@lucide/svelte/icons/circle-check'
	import TriangleAlertIcon from '@lucide/svelte/icons/triangle-alert'
	import CircleAlertIcon from '@lucide/svelte/icons/circle-alert'
	import Button from '$lib/components/ui/button/button.svelte'

	let { children } = $props()

	persistent.init()
</script>

<Toaster
	theme="light"
	position="top-center"
	toastOptions={{
		unstyled: true,
		classes: {
			toast: 'bg-card relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm grid-cols-[calc(var(--spacing)*4)_1fr] gap-x-3 shadow-lg',
			icon: 'translate-y-0.5 text-current',
			title: 'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
			description:
				'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
			info: 'text-card-foreground',
			success: 'text-card-foreground',
			warning: 'text-card-foreground',
			error: 'text-destructive [&_[data-description]]:text-destructive/90 [&>svg]:text-current'
		}
	}}
>
	{#snippet loadingIcon()}
		<LoaderCircleIcon class="size-4 animate-spin" />
	{/snippet}
	{#snippet infoIcon()}
		<InfoIcon class="size-4" />
	{/snippet}
	{#snippet successIcon()}
		<CircleCheckIcon class="size-4" />
	{/snippet}
	{#snippet warningIcon()}
		<TriangleAlertIcon class="size-4" />
	{/snippet}
	{#snippet errorIcon()}
		<CircleAlertIcon class="size-4" />
	{/snippet}
</Toaster>

<div class="relative m-auto flex h-screen max-w-7xl flex-col gap-2 overflow-hidden p-2">
	{@render children()}
	<footer class="absolute right-4 bottom-3 z-10 mt-auto text-right text-xs text-muted-foreground/50">
		Wealth Sim 0.1 by
		<a class="" href="https://epitora.com" target="_blank">Epitora</a>
		© 2025
	</footer>
</div>
