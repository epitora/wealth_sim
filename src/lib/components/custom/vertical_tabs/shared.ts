import type { Merge } from '$lib/utils'
import { createContext, type Component } from 'svelte'

export type Primitive = boolean | number | string

export type Root_props = Merge<{ value: Primitive; on_change?: (_: Primitive) => void }, HTMLDivElement>
export type Menu_props = Merge<{}, HTMLDivElement>
export type Option_props = Merge<{ value: Primitive; page: Component }, HTMLButtonElement>
export type Content_props = Merge<{}, HTMLDivElement>

type Context = {
	value: Primitive
	page: Component
	set_tab: (value: Primitive, page: Component) => void
}

export const [get_context, set_context] = createContext<Context>()
