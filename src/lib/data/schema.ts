import * as z from 'zod'
import { VERSION } from '$lib/data/config'
import Person_standing_icon from '@lucide/svelte/icons/person-standing'
import Trending_up_icon from '@lucide/svelte/icons/trending-up'
import Bolt_icon from '@lucide/svelte/icons/bolt'
import Calendar_icon from '@lucide/svelte/icons/calendar'
import Hash_icon from '@lucide/svelte/icons/hash'
import Cake_icon from '@lucide/svelte/icons/cake'
import Shield_plus_icon from '@lucide/svelte/icons/shield-plus'
import Banknote_arrow_down from '@lucide/svelte/icons/banknote-arrow-down'
import Banknote_arrow_up from '@lucide/svelte/icons/banknote-arrow-up'
import Chart_candlestick_icon from '@lucide/svelte/icons/chart-candlestick'
import type { Icon as Icon_ } from '@lucide/svelte'

// use instead of boolean because boolean is not a valid Record key
export const bit_options = [0, 1] as const
const bit_schema = z.literal(bit_options)
export type Bit = z.infer<typeof bit_schema>

export const version_options = ['0.1'] as const
const version_schema = z.literal(version_options)
export type Version = z.infer<typeof version_schema>

export const tab_id_options = ['c', 't', 's'] as const
const tab_id_schema = z.literal(tab_id_options)
export type Tab_id = z.infer<typeof tab_id_schema>
export const tab_labcons: Record<Tab_id, { label: string; Icon: typeof Icon_ }> = {
	c: { label: 'Context', Icon: Person_standing_icon },
	t: { label: 'Timeline', Icon: Trending_up_icon },
	s: { label: 'Simulation', Icon: Bolt_icon },
}

export const scroll_id_options = [0, 1, 2] as const
const scroll_id_schema = z.literal(scroll_id_options)
export type Scroll_id = z.infer<typeof scroll_id_schema>

export const time_reference_id_options = ['y', 'a', 'i'] as const
const time_reference_id_schema = z.literal(time_reference_id_options)
export type Time_reference_id = z.infer<typeof time_reference_id_schema>
export const time_reference_icons: Record<Time_reference_id, typeof Icon_> = {
	a: Cake_icon,
	y: Calendar_icon,
	i: Hash_icon,
}
const scroll_value_schema = z.number().min(0)

// state that the simulation does not depend on
// simulation never re-runs when changes are made here
// all state that has this property must be moved here
export type Ui_schema = z.infer<typeof simulation_schema>
const ui_schema = z.strictObject({
	t: tab_id_schema,
	r: time_reference_id_schema,
	s: z.array(scroll_value_schema),
})

export const birth_year_options = [
	1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968,
	1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987,
	1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006,
	2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
] as const
const birth_year_schema = z.literal(birth_year_options)
export type Birth_year = z.infer<typeof birth_year_schema>

const net_worth_schema = z.number().int()
const inflation_rate_schema = z.number().min(0).max(10)

export const current_year_options = [2025, 2026] as const
const current_year_schema = z.literal(current_year_options)
export type Current_year = z.infer<typeof birth_year_schema>
export type Context = z.infer<typeof context_schema>
const context_schema = z.strictObject({
	y: current_year_schema,
	b: birth_year_schema,
	w: net_worth_schema,
	i: inflation_rate_schema,
})

export const color_id_options = ['o', 'y', 'g', 'b', 'p'] as const
const color_id_schema = z.literal(color_id_options)
export type Color_id = z.infer<typeof color_id_schema>
export const color_labels: Record<Color_id, string> = { o: 'Orange', y: 'Yellow', g: 'Green', b: 'Blue', p: 'Pink' }

export const frequency_options = [Infinity, 1, 3, 12] as const
const frequency_schema = z.literal(frequency_options)
export type Frequency = z.infer<typeof frequency_schema>
export const frequency_labels: Record<Frequency, string> = {
	[Infinity]: 'Once',
	1: 'Monthly',
	3: 'Quarterly',
	12: 'Annual',
}

export const growth_type_options = ['f', 'm'] as const
const growth_type_schema = z.literal(growth_type_options)
export type Growth_type = z.infer<typeof growth_type_schema>
export const growth_type_labels: Record<Growth_type, string> = {
	f: 'Fixed',
	m: 'Market',
}

export const expected_return_bounds = [1, 25, 1] as const
const expected_return_schema = z.number().min(expected_return_bounds[0]).max(expected_return_bounds[1])

export const volatility_bounds = [10, 50, 2] as const
const volatility_schema = z.number().min(volatility_bounds[0]).max(volatility_bounds[1])

export const inflation_bounds = [0, 10, 0.5] as const
const inflation_schema = z.number().min(inflation_bounds[0]).max(inflation_bounds[1])

export const block_id_options = ['i', 'e', 'm', 'u'] as const
const block_id_schema = z.literal(block_id_options)
export type Block_id = z.infer<typeof block_id_schema>
export const block_labels: Record<Block_id, string> = {
	i: 'Income',
	e: 'Expense',
	m: 'Investment',
	u: 'UL insurance',
}
export const block_icons: Record<Block_id, typeof Icon_> = {
	i: Banknote_arrow_up,
	e: Banknote_arrow_down,
	m: Chart_candlestick_icon,
	u: Shield_plus_icon,
}

export type Income_block = z.infer<typeof income_block_schema>
const income_block_schema = z.strictObject({
	t: block_id_schema,
	f: frequency_schema,
	a: z.number(),
})

export type Expense_block = z.infer<typeof expense_block_schema>
const expense_block_schema = z.strictObject({
	t: block_id_schema,
	f: frequency_schema,
	a: z.number(),
})

export type Investment_block = z.infer<typeof investment_block_schema>
const investment_block_schema = z.strictObject({
	t: block_id_schema,
	f: frequency_schema,
	a: z.number(),
	r: expected_return_schema,
	v: volatility_schema,
})

export type UL_block = z.infer<typeof ul_block_schema>
const ul_block_schema = z.strictObject({
	t: block_id_schema,
	b: z.number(),
	p: z.number(),
	f: z.number(),
	c: z.number(),
	g: growth_type_schema,
	r: expected_return_schema,
	v: volatility_schema.optional(),
})

export const scenario_id_options = [0, 1, 2, 3] as const
const scenario_id_schema = z.number()
export type Scenario_id = z.infer<typeof scenario_id_schema>
export const scenario_labels: Record<Scenario_id, string> = {
	0: 'Scenario A',
	1: 'Scenario B',
	2: 'Scenario C',
	3: 'Scenario D',
}

export type Block = z.infer<typeof block_schema>
const block_schema = z.union([income_block_schema, expense_block_schema, investment_block_schema, ul_block_schema])

export type Year_blocks = z.infer<typeof year_blocks_schema>
const year_blocks_schema = z.record(
	z.string(), // year
	z.array(z.union([income_block_schema, expense_block_schema, investment_block_schema, ul_block_schema]))
)

export type Scenario = z.infer<typeof scenario_schema>
const scenario_schema = z.strictObject({
	c: color_id_schema,
	b: year_blocks_schema,
})

export type Timeline = z.infer<typeof timeline_schema>
const timeline_schema = z
	.strictObject({
		s: z.array(scenario_schema),
		a: scenario_id_schema,
		b: scenario_id_schema,
	})
	.refine((data) => {
		return data.a !== data.b
	})

export const horizon_options = [5, 10, 25, 50] as const
const horizon_schema = z.literal(horizon_options)
export type Horizon = z.infer<typeof horizon_schema>

export const resolution_options = [1, 3, 6, 12] as const
const resolution_schema = z.literal(resolution_options)
export type Resolution = z.infer<typeof resolution_schema>

export type Simulation = z.infer<typeof simulation_schema>
const simulation_schema = z.strictObject({
	h: horizon_schema,
	r: resolution_schema,
})

export type Db = z.infer<typeof db_schema>
export const db_schema = z
	.strictObject({
		v: version_schema,
		u: ui_schema,
		c: context_schema,
		t: timeline_schema,
		s: simulation_schema,
	})
	.default({
		v: VERSION,
		u: {
			t: 'c',
			r: 'y',
			s: new Array(scroll_id_options.length).fill(0),
		},
		c: {
			y: 2025,
			b: 2000,
			w: 10000,
			i: 2,
		},
		t: {
			s: [
				{ c: 'o', b: {} },
				{ c: 'g', b: {} },
				{ c: 'b', b: {} },
				{ c: 'p', b: {} },
			],
			a: 0,
			b: 1,
		},
		s: {
			h: 25,
			r: 1,
		},
	})
