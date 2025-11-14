import type { Merge } from '$lib/utils'
import type { Snippet } from 'svelte'

export type Root_props = Merge<{ heading: string; children: Snippet }, HTMLDivElement>
export type Field_props = Merge<{ label: string; description?: string; children: Snippet }, HTMLDivElement>
