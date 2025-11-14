import * as z from 'zod'
import { Persistent } from './persistent.svelte'

export type Color = (typeof color_options)[number]
export const color_options = ['rose', 'orange', 'amber', 'green', 'teal', 'blue', 'purple', 'gray'] as const
const color_schema = z.literal(color_options)

export type Tab_id = (typeof tab_id_options)[number]
export const tab_id_options = ['world', 'client', 'timeline', 'simulation'] as const
const tab_id_schema = z.literal(tab_id_options)

export type Strategy_id = (typeof strategy_id_options)[number]
export const strategy_id_options = ['a', 'b', 'c', 'd'] as const
const strategy_id_schema = z.literal(strategy_id_options)

export type Version = (typeof tab_id_options)[number]
export const version_options = [1] as const
const version_schema = z.literal(version_options)

export type Strategy = z.infer<typeof strategy_schema>
const strategy_schema = z.strictObject({
	id: strategy_id_schema,
	label: z.string().max(20),
})

export type Strategy_config = z.infer<typeof strategy_config_schema>
const strategy_config_schema = z
	.strictObject({
		list: z.array(strategy_schema).min(1).max(4),
		first_id: strategy_id_schema,
		second_id: strategy_id_schema,
		compare: z.boolean(),
	})
	.refine((d) => {
		const ids = d.list.map((s) => s.id)
		const strategies_valid = ids.length === new Set(ids).size
		const strategy_1_valid = ids.includes(d.first_id)
		const strategy_2_valid = ids.includes(d.second_id) && d.second_id !== d.first_id
		return strategies_valid && strategy_1_valid && strategy_2_valid
	})

export type Year = (typeof year_options)[number]
// prettier-ignore
export const year_options = [
	2025, 2026, 2027, 2028, 2029,
	2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039,
	2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049,
	2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059,
	2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069,
	2070, 2071, 2072, 2073, 2074, 2075, 2076, 2077, 2078, 2079,
	2080, 2081, 2082, 2083, 2084, 2085, 2086, 2087, 2088, 2089,
	2090, 2091, 2092, 2093, 2094, 2095, 2096, 2097, 2098, 2099
] as const
const year_schema = z.literal(year_options)

export type Birth_year = (typeof birth_year_options)[number]
// prettier-ignore
export const birth_year_options = [
	1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939,
	1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949,
	1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959,
	1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969,
	1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979,
	1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989,
	1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
	2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
	2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
	2020, 2021, 2022, 2023, 2024, 2025
] as const
const birth_year_schema = z.literal(birth_year_options)

export type Month = (typeof month_options)[number]
export const month_options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const
const month_schema = z.literal(month_options)

export type Simulation_config = z.infer<typeof simulation_config_schema>
const simulation_config_schema = z
	.strictObject({
		start_year: year_schema,
		end_year: year_schema,
		age_metric: z.boolean(),
	})
	.refine((d) => {
		const years_valid = d.end_year > d.start_year
		return years_valid
	})

export type Client_config = z.infer<typeof simulation_config_schema>
const client_config_schema = z.strictObject({
	birth_year: birth_year_schema,
	birth_month: month_schema,
})

export const schema = z
	.strictObject({
		version: version_schema,
		tab_id: tab_id_schema,
		strategy: strategy_config_schema,
		simulation: simulation_config_schema,
		client: client_config_schema,
	})
	.default({
		version: 1,
		tab_id: 'timeline',
		strategy: {
			list: [
				{ id: 'a', label: 'Strategy A' },
				{ id: 'b', label: 'Strategy B' },
				{ id: 'c', label: 'Strategy C' },
				{ id: 'd', label: 'Strategy D' },
			],
			first_id: 'a',
			second_id: 'b',
			compare: false,
		},
		simulation: {
			start_year: 2025,
			end_year: 2099,
			age_metric: false,
		},
		client: {
			birth_year: 2000,
			birth_month: 0,
		},
	})

export const persistent = new Persistent<typeof schema>(schema)
