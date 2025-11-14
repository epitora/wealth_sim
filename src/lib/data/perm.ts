import * as z from 'zod'
import { Perm } from './perm.svelte'

export type Color_id = (typeof color_options)[number]
// rose, orange, amber, green, teal, blue, purple, gray
export const color_options = ['r', 'o', 'a', 'g', 't', 'b', 'p', 'g'] as const
const color_schema = z.literal(color_options)

export type Page_id = (typeof page_id_options)[number]
// world, user, timeline, simulation
export const page_id_options = ['w', 'u', 't', 's'] as const
const page_id_schema = z.literal(page_id_options)

export type Strategy_id = (typeof strategy_id_options)[number]
export const strategy_id_options = ['a', 'b', 'c', 'd'] as const
const strategy_id_schema = z.literal(strategy_id_options)

export type Version = (typeof page_id_options)[number]
export const version_options = [1] as const
const version_schema = z.literal(version_options)

export type Year = (typeof year_options)[number]
export const year_options = [
	2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043,
	2044, 2045, 2046, 2047, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062,
	2063, 2064, 2065, 2066, 2067, 2068, 2069, 2070, 2071, 2072, 2073, 2074, 2075, 2076, 2077, 2078, 2079, 2080, 2081,
	2082, 2083, 2084, 2085, 2086, 2087, 2088, 2089, 2090, 2091, 2092, 2093, 2094, 2095, 2096, 2097, 2098, 2099,
] as const
const year_schema = z.literal(year_options)

export type Birth_year = (typeof birth_year_options)[number]
export const birth_year_options = [
	1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948,
	1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967,
	1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986,
	1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005,
	2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
	2025,
] as const
const birth_year_schema = z.literal(birth_year_options)

export type Month = (typeof month_options)[number]
export const month_options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const
const month_schema = z.literal(month_options)

export type Strategy = z.infer<typeof strategy_schema>
const strategy_schema = z.strictObject({
	i: strategy_id_schema,
	l: z.string().max(20),
})

export type Timeline_config = z.infer<typeof timeline_config_schema>
const timeline_config_schema = z
	.strictObject({
		l: z.array(strategy_schema).min(1).max(4),
		a: strategy_id_schema,
		b: strategy_id_schema,
		c: z.boolean(),
	})
	.refine((data) => {
		const ids = data.l.map((s) => s.i)
		const l_valid = ids.length === new Set(ids).size
		const a_valid = ids.includes(data.a)
		const b_valid = ids.includes(data.b) && data.b !== data.a
		return l_valid && a_valid && b_valid
	})

export type Simulation_config = z.infer<typeof simulation_config_schema>
const simulation_config_schema = z
	.strictObject({
		s: year_schema,
		e: year_schema,
		a: z.boolean(),
	})
	.refine((data) => {
		const se_valid = data.e > data.s
		return se_valid
	})

export type User_config = z.infer<typeof simulation_config_schema>
const user_config_schema = z.strictObject({
	y: birth_year_schema,
	m: month_schema,
})

export const schema = z
	.strictObject({
		v: version_schema,
		p: page_id_schema,
		t: timeline_config_schema,
		s: simulation_config_schema,
		u: user_config_schema,
	})
	.default({
		v: 1,
		p: 't',
		t: {
			l: [
				{ i: 'a', l: 'Strategy A' },
				{ i: 'b', l: 'Strategy B' },
				{ i: 'c', l: 'Strategy C' },
				{ i: 'd', l: 'Strategy D' },
			],
			a: 'a',
			b: 'b',
			c: false,
		},
		s: {
			s: 2025,
			e: 2099,
			a: false,
		},
		u: {
			y: 2000,
			m: 0,
		},
	})

export const perm = new Perm<typeof schema>(schema)
