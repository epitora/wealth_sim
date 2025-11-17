import * as z from 'zod'
import { VERSION } from '$lib/data/config'

// use instead of boolean because boolean is not a valid Record key
export type Bit = z.infer<typeof bit_schema>
export const bit_options = [0, 1] as const
const bit_schema = z.literal(bit_options)

export type Version = z.infer<typeof version_schema>
export const version_options = ['0.1'] as const
const version_schema = z.literal(version_options)

export type Page_id = z.infer<typeof page_id_schema>
export const page_id_options = ['w', 'p', 't', 's'] as const
const page_id_schema = z.literal(page_id_options)

export type Scroll_id = z.infer<typeof scroll_id_schema>
export const scroll_id_options = [0, 1, 2] as const
const scroll_id_schema = z.literal(scroll_id_options)

export type Time_reference = z.infer<typeof time_reference_schema>
export const time_reference_options = ['y', 'a', 'i'] as const
const time_reference_schema = z.literal(time_reference_options)

// state that the simulation does not depend on
// simulation never re-runs when changes are made here
// all state that has this property must be moved here
export type Ui_schema = z.infer<typeof simulation_schema>
const ui_schema = z.strictObject({
	p: page_id_schema,
	r: time_reference_schema,
	s: z.array(z.number()),
})

export type Current_year = z.infer<typeof birth_year_schema>
export const current_year_options = [2025, 2026] as const
const current_year_schema = z.literal(current_year_options)
export type World = z.infer<typeof world_schema>
const world_schema = z.strictObject({
	y: current_year_schema,
})

export type Birth_year = z.infer<typeof birth_year_schema>
export const birth_year_options = [
	1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968,
	1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987,
	1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006,
	2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
] as const
const birth_year_schema = z.literal(birth_year_options)

export type Person = z.infer<typeof person_schema>
const person_schema = z.strictObject({
	b: birth_year_schema,
})

export type Color = z.infer<typeof color_schema>
// orange, yellow, green, blue, pink
export const color_options = ['o', 'y', 'g', 'b', 'p'] as const
const color_schema = z.literal(color_options)

export type Strategy_id = z.infer<typeof strategy_id_schema>
export const strategy_id_options = ['a', 'b', 'c', 'd'] as const
const strategy_id_schema = z.literal(strategy_id_options)

export type Strategy = z.infer<typeof strategy_schema>
const strategy_schema = z.strictObject({
	i: strategy_id_schema,
	l: z.string().max(20),
	c: color_schema,
})

export type Timeline = z.infer<typeof timeline_schema>
const timeline_schema = z
	.strictObject({
		s: z.array(strategy_schema),
		a: strategy_id_schema,
		b: strategy_id_schema,
		c: bit_schema,
	})
	.refine((data) => {
		const ids = data.s.map((x) => x.i)
		const s_valid = ids.length === new Set(ids).size
		const a_valid = ids.includes(data.a)
		const b_valid = ids.includes(data.b) && data.b !== data.a
		return s_valid && a_valid && b_valid
	})

export type Horizon = z.infer<typeof horizon_schema>
export const horizon_options = [5, 10, 25, 50] as const
const horizon_schema = z.literal(horizon_options)

export type Resolution = z.infer<typeof resolution_schema>
export const resolution_options = [1, 3, 6, 12] as const
const resolution_schema = z.literal(resolution_options)

export type Simulation = z.infer<typeof simulation_schema>
const simulation_schema = z.strictObject({
	h: horizon_schema,
	r: resolution_schema,
})

export const schema = z
	.strictObject({
		v: version_schema,
		u: ui_schema,
		w: world_schema,
		p: person_schema,
		t: timeline_schema,
		s: simulation_schema,
	})
	.default({
		v: VERSION,
		u: {
			p: 'w',
			r: 'y',
			s: new Array(scroll_id_options.length).fill(0),
		},
		w: {
			y: 2025,
		},
		p: {
			b: 2000,
		},
		t: {
			s: [
				{ i: 'a', l: 'Strategy A', c: 'o' },
				{ i: 'b', l: 'Strategy B', c: 'g' },
				{ i: 'c', l: 'Strategy C', c: 'b' },
				{ i: 'd', l: 'Strategy D', c: 'p' },
			],
			a: 'a',
			b: 'b',
			c: 0,
		},
		s: {
			h: 25,
			r: 1,
		},
	})
