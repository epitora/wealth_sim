import { type ClassValue } from 'clsx'
import type { HTMLAttributes } from 'svelte/elements'

export type Merge<T extends Record<string, any>, H extends HTMLElement> = T & { class?: ClassValue } & Omit<
		HTMLAttributes<H>,
		keyof T | 'class' | 'children'
	>
