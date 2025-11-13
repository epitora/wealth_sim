<script lang="ts">
	import * as Select from '$lib/components/custom/strategy_select/index.js'
	import { Button as ButtonShadcn } from '$lib/components/ui/button/index.js'
	import Button_icon from '$lib/components/custom/button_icon.svelte'
	import type { Strategy_config, Strategy_id } from '$lib/data/persistent'
	import { persistent, strategy_id_options } from '$lib/data/persistent'
	import Chevron_left_icon from '@lucide/svelte/icons/chevron-left'
	import Chevron_right_icon from '@lucide/svelte/icons/chevron-right'
	import Plus_icon from '@lucide/svelte/icons/plus'
	import X_icon from '@lucide/svelte/icons/x'
	import Timeline_area from './timeline_area.svelte'

	const p = persistent.data.strategy
	const compare = $derived(p.compare)

	type Assert_subset<T extends keyof Strategy_config> = T
	type Select_key = Assert_subset<'first_id' | 'second_id'>

	function create_strategy(key: Select_key) {
		if (key === 'first_id' && p.second_id === undefined) {
			p.second_id = p.first_id
		}

		let create_id = undefined
		for (let id of strategy_id_options) {
			if (p.list.find((s) => s.id === id) === undefined) {
				create_id = id
				break
			}
		}
		if (create_id === undefined) throw new Error()

		p.list.push({
			id: create_id,
			label: `Strategy ${create_id.toUpperCase()}`
		})
		p[key] = create_id
	}

	function delete_strategy(key: Select_key) {
		const delete_id = p[key]
		const unselected_id = p.list.find((s) => s.id !== p.first_id && s.id !== p.second_id)?.id
		if (key === 'second_id' || unselected_id !== undefined) {
			// @ts-ignore implicit logic
			p[key] = unselected_id
		} else {
			p.first_id = p.second_id!
			p.second_id = undefined
		}
		if (compare && p.list.length === 2) {
			p.compare = false
		}
		p.list = p.list.filter((s) => s.id !== delete_id)
	}

	function change_selection(key: Select_key, id: Strategy_id) {
		if (key === 'first_id' && p.second_id === id) {
			p.second_id = p.first_id
		} else if (key === 'second_id' && p.first_id === id) {
			p.first_id = p.second_id!
		}
		p[key] = id
	}
</script>

{#snippet Strategy_select(key: Select_key)}
	{@const at_max = p.list.length === strategy_id_options.length}
	<Select.Root type="single" value={p[key]} onValueChange={(id) => change_selection(key, id as Strategy_id)}>
		<Select.Trigger
			class="group relative grow basis-0 rounded-none border-0 border-r px-0 shadow-none hover:bg-accent"
			size="sm"
		>
			{p.list.find((s) => s.id === p[key])!.label}
			<Button_icon
				onpointerdown={(e) => e.stopPropagation()}
				onclick={() => delete_strategy(key)}
				Icon={X_icon}
				class={{
					'absolute right-1 hidden size-5 place-content-center rounded-full border-0 p-0! text-muted-foreground hover:bg-destructive/15 hover:text-destructive': true,
					'group-hover:grid': p.list.length > 1
				}}
			/>
		</Select.Trigger>
		<Select.Content>
			{#each p.list as strategy (strategy.id)}
				<Select.Item value={strategy.id} label={strategy.label}>
					{strategy.label}
				</Select.Item>
			{/each}
			<div class={{ '-mx-1 my-1 border-t': true, 'hidden': at_max }}></div>
			<ButtonShadcn
				size="sm"
				variant="ghost"
				class={{ 'w-full rounded-sm font-normal': true, 'hidden': at_max }}
				onpointerdown={() => create_strategy(key)}
			>
				<Plus_icon class="-ml-1 text-muted-foreground" />
				New Strategy
			</ButtonShadcn>
		</Select.Content>
	</Select.Root>
{/snippet}

<div class="relative flex h-full">
	<div
		class={{
			'absolute z-10 -mt-px flex origin-top-right -translate-x-full -rotate-90 flex-row-reverse border-b transition-[width]': true,
			'w-100': compare,
			'w-150': !compare
		}}
	>
		<div class="inline-flex flex-1 items-center justify-center text-sm whitespace-nowrap">Life Events</div>
		{@render Strategy_select('first_id')}
		{@render Strategy_select('second_id')}
		<Button_icon
			onpointerdown={() => (p.compare = !compare)}
			Icon={Chevron_right_icon}
			class={{
				'group absolute flex items-stretch rounded-none border-0 bg-transparent! p-0.5 pr-0': true,
				'left-0': compare,
				'left-50': !compare,
				'hidden': p.list.length === 1
			}}
		/>
		<!-- <div class="grid w-5 place-content-center rounded-sm transition group-hover:bg-accent">
			<Chevron_right_icon class={{ 'text-muted-foreground': true, '-scale-x-100': compare }} />
		</div> -->
	</div>
	<div class="flex h-full w-full flex-col pl-8">
		<Timeline_area />
	</div>
</div>
