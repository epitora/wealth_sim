<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js'
	import { persistent } from '$lib/data/persistent'

	const p = persistent.data.simulation
	const start_year = $derived(Number(p.this_year))
	const end_year = $derived(Number(p.end_year))
</script>

<ScrollArea class="h-full w-full whitespace-nowrap" orientation="horizontal">
	<div class="flex h-full">
		{#each Array.from({ length: end_year - start_year + 1 }) as _, index}
			{@const year = start_year + index}
			{@const show_year =
				end_year - start_year < 20 || year % 5 === 0 || year === start_year || year === end_year}
			<div class="group relative flex h-full min-w-4 grow flex-col items-center hover:bg-accent">
				<div
					class="absolute top-0 w-10 origin-top-right -translate-x-[calc(50%+0.5rem)] -rotate-90 text-center font-mono text-xs text-muted-foreground group-hover:text-foreground">
					<span class={{ 'group-hover:block': true, 'hidden': !show_year }}>{year}</span>
					<span class={{ 'group-hover:hidden': true, 'hidden': show_year }}>•</span>
				</div>
				<div class="grow basis-0"></div>
				<div class="grow basis-0 border-t"></div>
				<div class={{ 'grow basis-0 border-t': true, 'hidden': !persistent.data.strategy.compare }}></div>
			</div>
		{/each}
	</div>
</ScrollArea>
