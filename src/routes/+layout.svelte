<script lang="ts">
	import '../app.css'
	import { VERSION } from '$lib/data/config'
	import { db } from '$lib/state/db.svelte'
	import { alert_manager } from '$lib/state/alert.svelte'

	let { children } = $props()

	db.init()
</script>

<div
	onpointerenter={() => alert_manager.interact()}
	onpointerleave={() => alert_manager.leave()}
	class={[
		'p-12 pl-16 gap-4 absolute text-error-fg max-w-380 z-20 bg-bg border shadow-md rounded-lg top-16 mx-auto inset-x-0',
		alert_manager.open ? '' : 'hidden',
	]}>
	<div class="font-bold mb-1">{alert_manager.title}</div>
	<div>{alert_manager.description}</div>
</div>
<div class="relative flex h-dvh flex-col gap-8 p-8">
	{@render children()}
	<footer class="absolute right-16 bottom-12 z-10 mt-auto text-right text-sm text-muted/50">
		Wealth Sim v{VERSION} by
		<a class="" href="https://epitora.com" target="_blank">Epitora</a>
		© 2025
	</footer>
</div>
