import type { Merge } from '$lib/utils'
import { createContext } from 'svelte'

export type Primitive = boolean | number | string | undefined

export type Root_props = Merge<{ value: Primitive; on_change?: (_: Primitive) => void }, HTMLDivElement>
export type Option_props = Merge<{ value: Primitive }, HTMLButtonElement>

type Context = {
	value: Primitive
	set_value: (_: Primitive) => void
	is_selected: (_: Primitive) => boolean
}

export const [get_context, set_context] = createContext<Context>()
