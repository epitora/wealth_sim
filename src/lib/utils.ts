import type { HTMLAttributes } from 'svelte/elements'
import type { Icon as Icon_ } from '@lucide/svelte'
import type { Component } from 'svelte'

export type Value = number | string

export type Page = {
	name: string
	Icon: typeof Icon_
	Content: Component
}

export const clip = (value: number, min_value: number, max_value: number) => {
	return Math.min(Math.max(value, min_value), max_value)
}
