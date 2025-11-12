import { clsx, type ClassValue } from 'clsx'
import type { Snippet } from 'svelte'
import { twMerge } from 'tailwind-merge'
import type { HTMLAttributes } from 'svelte/elements'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null }

export type Merge<P extends Record<string, any>, E extends HTMLElement> = P & {
	class?: string
	children?: Snippet
} & Omit<HTMLAttributes<E>, keyof P | 'class' | 'children'>
