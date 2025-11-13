import type { Merge } from '$lib/utils'
import { createContext } from 'svelte'

export type Primitive = boolean | number | string

export type Root_props = Merge<{ value: Primitive; on_change?: (_: Primitive) => void }, HTMLDivElement>
export type Option_props = Merge<{ value: Primitive }, HTMLButtonElement>

type Context = {
	value: Primitive
	select_option: (value: Primitive) => void
}

export const [get_context, set_context] = createContext<Context>()
