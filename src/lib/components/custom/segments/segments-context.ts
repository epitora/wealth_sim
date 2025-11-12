import type { Primitive } from './segments-types'

export const Segments_Context_Key = Symbol('segments')

export interface Segments_context {
	value: Primitive
	set_value: (value: Primitive) => void
	is_active: (value: Primitive) => boolean
}
