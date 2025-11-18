<script lang="ts">
	import { db } from '$lib/state/db.svelte'
	import { global } from '$lib/state/global.svelte'
	import Field_set from '$lib/ui/field-set.svelte'
	import Field from '$lib/ui/field.svelte'
	import Segments from '$lib/ui/segments.svelte'
	import Currency_input from '$lib/ui/currency-input.svelte'
	import Slider from '$lib/ui/slider.svelte'
	import Button from '$lib/ui/button.svelte'
	import Value from '$lib/ui/value.svelte'
	import {
		block_labels,
		expected_return_bounds,
		frequency_labels,
		frequency_options,
		scenario_labels,
		volatility_bounds,
		growth_type_options,
		growth_type_labels,
		type Growth_type,
		type Block_id,
	} from '$lib/data/schema'

	const config = $derived(global.new_block_dialog)

	let frequency = $state(1)
	let amount = $state(1000)

	let volatility = $state(40)
	let expected_return = $state(20)

	let death_benefit = $state(100000)
	let policy_fee = $state(10)
	let coi_rate = $state(2)
	let growth_type = $state('m' as Growth_type)

	const close_dialog = () => {
		global.new_block_dialog = undefined
	}

	const create_block = () => {
		const { year, scenario_id, block_id } = config!
		const scenario = db.s.t.s[scenario_id]

		let block

		switch (block_id) {
			case 'i':
				block = { t: 'i' as Block_id, a: amount, f: frequency }
				break
			case 'e':
				block = { t: 'e' as Block_id, a: amount, f: frequency }
				break
			case 'm':
				block = { t: 'm' as Block_id, r: expected_return, v: volatility, a: amount, f: frequency }
				break
			case 'u':
				block = {
					t: 'u' as Block_id,
					b: death_benefit,
					p: amount,
					f: policy_fee,
					c: coi_rate,
					g: growth_type,
					r: expected_return,
					v: volatility,
				}
				break
			default:
				return
		}

		if (!(year in scenario.b)) scenario.b[year] = []
		scenario.b[year].push(block)

		global.new_block_dialog = undefined
	}
</script>

{#if config}
	<div class="fixed backdrop-blur-md inset-0">
		<Field_set
			class="absolute border rounded-lg shadow-md inset-x-0 mx-auto top-100 w-400! bg-bg"
			heading={`Create new block`}>
			<Field label="Scenario">
				<Value value={config.scenario_id} labels={scenario_labels} />
			</Field>
			<Field label="Year">
				<Value value={config.year} />
			</Field>
			<Field label="Block type">
				<Value value={config.block_id} labels={block_labels} />
			</Field>
			{#if config.block_id === 'i' || config.block_id === 'e'}
				<Field label="Frequency">
					<Segments bind:value={frequency} options={frequency_options} labels={frequency_labels} />
				</Field>
				<Field label="Amount">
					<Currency_input bind:value={amount} />
				</Field>
			{/if}
			{#if config.block_id === 'm'}
				<Field label="Expected return" description="Average annual gain">
					<Slider bind:value={expected_return} bounds={expected_return_bounds} suffix="%" />
				</Field>
				<Field label="Volatility" description="Average annual fluctuations">
					<Slider bind:value={volatility} bounds={volatility_bounds} suffix="%" />
				</Field>
				<Field label="Frequency">
					<Segments bind:value={frequency} options={frequency_options} labels={frequency_labels} />
				</Field>
				<Field label="Amount">
					<Currency_input bind:value={amount} />
				</Field>
			{/if}
			{#if config.block_id === 'u'}
				<Field label="Death benefit" description="Amount paid to beneficiaries upon death">
					<Currency_input bind:value={death_benefit} />
				</Field>
				<Field label="Premium" description="Monthly payment amount to keep the policy active">
					<Currency_input bind:value={amount} />
				</Field>
				<Field label="Policy fee" description="Monthly administrative charges">
					<Currency_input bind:value={policy_fee} />
				</Field>
				<Field
					label="COI rate"
					description="Cost of insurance - the cost to insure $1000 of death benefit each year">
					<Currency_input bind:value={coi_rate} />
				</Field>
				<Field label="Growth type">
					<Segments bind:value={growth_type} options={growth_type_options} labels={growth_type_labels} />
				</Field>
				{#if growth_type === 'm'}
					<Field label="Growth expected return" description="Average annual gain">
						<Slider bind:value={expected_return} bounds={expected_return_bounds} suffix="%" />
					</Field>
					<Field label="Growth volatility" description="Average annual fluctuations">
						<Slider bind:value={volatility} bounds={volatility_bounds} suffix="%" />
					</Field>
				{:else}
					<Field label="Growth rate" description="Fixed annual percentage gain">
						<Slider bind:value={expected_return} bounds={expected_return_bounds} suffix="%" />
					</Field>
				{/if}
			{/if}
			<div class="flex gap-8 pt-20">
				<Button class="grow" variant="ghost" label="Cancel" on_click={close_dialog} />
				<Button class="grow" label="Create" on_click={create_block} />
			</div>
		</Field_set>
	</div>
{/if}
