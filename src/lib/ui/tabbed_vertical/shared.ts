import type { Merge } from '$lib/utils'
import { createContext, type Snippet } from 'svelte'
import type { Icon as Icon_ } from '@lucide/svelte'

export type Primitive = boolean | number | string

export type Root_props = Merge<
	{ value: Primitive; on_change?: (_: Primitive) => void; children: Snippet },
	HTMLDivElement
>
export type Menu_props = Merge<{ children: Snippet }, HTMLDivElement>
export type Option_props = Merge<{ value: Primitive; label: string; Icon: typeof Icon_ }, HTMLButtonElement>
export type Content_props = Merge<{ children: Snippet }, HTMLDivElement>

type Context = {
	value: Primitive
	set_value: (value: Primitive) => void
}

export const [get_context, set_context] = createContext<Context>()
