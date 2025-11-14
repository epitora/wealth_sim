import type { Merge } from '$lib/utils'
import { createContext, type Snippet } from 'svelte'

export type Primitive = boolean | number | string

export type Root_props = Merge<
	{ value: Primitive; on_change?: (_: Primitive) => void; children: Snippet },
	HTMLDivElement
>
export type Trigger_props = Merge<{ label: string }, HTMLButtonElement>
export type Menu_props = Merge<{ children: Snippet }, HTMLDivElement>
export type Option_props = Merge<{ value: Primitive; label: string }, HTMLButtonElement>

type Context = {
	menu_id: string
	value: Primitive
	select_option: (value: Primitive) => void
}

export const [get_context, set_context] = createContext<Context>()
