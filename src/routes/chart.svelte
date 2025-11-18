<script lang="ts">
	import { scenario_id_options, scenario_labels } from '$lib/data/schema'
	import { db } from '$lib/state/db.svelte'
	import { sim } from '$lib/state/simulate.svelte'
	import Refresh_cw_icon from '@lucide/svelte/icons/refresh-cw'

	import { Chart, Layer, Axis, Highlight, Tooltip, Area, Point, Text, Circle } from 'layerchart'

	const aggregate_data = $derived([
		...sim.data_a?.map((r) => ({ key: 'a', ...r })),
		...sim.data_b?.map((r) => ({ key: 'b', ...r })),
	])
	const scenarios = $derived({ a: db.s.t.s[db.s.t.a], b: db.s.t.s[db.s.t.b] })
	const force = 'bg-chart-o bg-chart-b bg-chart-g bg-chart-p'
</script>

<div class={['relative border rounded-lg grow']}>
	<div class={['absolute inset-0 m-auto flex items-center justify-center gap-8', sim.running ? '' : 'hidden']}>
		<Refresh_cw_icon class="animate-spin" />
		<div class="font-bold">Simulating</div>
	</div>
	<div class={['h-full w-full  pl-50 pr-30 py-40', sim.running ? 'blur-md' : '']}>
		{#if !sim.running}
			<Chart
				data={aggregate_data}
				x="index"
				y="value"
				c="key"
				yDomain={[0, null]}
				yNice
				cDomain={[0, 1, 2, 3]}
				cRange={Object.values(scenario_labels)}
				tooltip={{ mode: 'quadtree' }}>
				{#snippet children({ context })}
					<Layer type="svg">
						<Axis placement="left" grid rule />
						<Axis placement="bottom" rule />
						{#each Object.entries({ a: sim.data_a, b: sim.data_b }) as [key, data]}
							{@const color = `var(--color-chart-${scenarios[key].c})`}
							<Area
								data={data}
								fill={color}
								fillOpacity={0.3}
								line={{ class: 'stroke-2', stroke: color }} />
							<Point d={data?.[data.length - 1]}>
								{#snippet children({ x, y })}
									<Circle cx={x} cy={y} r={4} fill={color} />
									<Text
										x={x}
										y={y}
										verticalAnchor="middle"
										dx={6}
										dy={-2}
										class="text-xs"
										fill={color} />
								{/snippet}
							</Point>
						{/each}
						<Highlight points lines />
					</Layer>

					<Tooltip.Root>
						{#snippet children({ data })}
							<Tooltip.Header value={data?.index} />
							<Tooltip.List>
								<Tooltip.Item label={scenario_labels[db.s.t[data.key]]} />
							</Tooltip.List>
						{/snippet}
					</Tooltip.Root>
				{/snippet}
			</Chart>
		{/if}
	</div>
</div>
