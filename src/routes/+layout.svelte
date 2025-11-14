<script lang="ts">
	import '../app.css'
	import { perm } from '$lib/data/perm'
	import Alert from '$lib/ui/alert.svelte'

	let { children } = $props()

	perm.init()
</script>

<Alert />
<div class="relative flex h-dvh flex-col gap-2 p-2">
	{@render children()}
	<footer class="absolute right-4 bottom-3 z-10 mt-auto text-right text-sm text-muted/50">
		Wealth Sim 0.1 by
		<a class="" href="https://epitora.com" target="_blank">Epitora</a>
		© 2025
	</footer>
</div>
