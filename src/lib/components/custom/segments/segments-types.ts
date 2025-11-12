import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'
import type { Snippet } from 'svelte'

export type Primitive = boolean | number | string | undefined

type Merge<P extends Record<string, any>, H extends Record<string, any>> = P & { class?: string } & Omit<H, keyof P>

type Segments_root_params = {
	value?: Primitive
	on_value_change?: (value: Primitive) => void
	children?: Snippet
}

type Segments_item_params = {
	value: Primitive
	children?: Snippet
}

export type Segments_item_props = Merge<Segments_item_params, HTMLButtonAttributes>
export type Segments_root_props = Merge<Segments_root_params, HTMLAttributes<HTMLDivElement>>
