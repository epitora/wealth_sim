<script lang="ts">
	import '../app.css'
	import { persistent } from '$lib/data/persistent'
	import Alert from '$lib/ui/alert.svelte'

	let { children } = $props()

	persistent.init()
</script>

<Alert />
<div class="relative m-auto flex h-screen max-w-7xl flex-col gap-2 overflow-hidden p-2">
	{@render children()}
	<footer class="absolute right-4 bottom-3 z-10 mt-auto text-right text-xs text-muted-foreground/50">
		Wealth Sim 0.1 by
		<a class="" href="https://epitora.com" target="_blank">Epitora</a>
		© 2025
	</footer>
</div>
