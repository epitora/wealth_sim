import { type ClassValue } from 'clsx'
import type { HTMLAttributes } from 'svelte/elements'
import type { Icon as Icon_ } from '@lucide/svelte'
import type { Component } from 'svelte'

export type Merge<P extends Record<string, any>, E extends HTMLElement> = P & {
	class?: ClassValue
} & Omit<HTMLAttributes<E>, keyof P | 'children' | 'class'>

export type Value = number | string

export type Page = {
	name: string
	Icon: typeof Icon_
	Content: Component
}
