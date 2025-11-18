import LZString from 'lz-string'
import * as z from 'zod'
import { page } from '$app/state'
import { goto } from '$app/navigation'
import { alert_manager } from './alert.svelte'
import { db_schema } from '$lib/data/schema'
import { sim } from './simulate.svelte'

export class Db<Schema extends z.ZodDefault> {
	s: z.infer<Schema>
	saved_path: string | undefined
	timer: number | undefined

	constructor(public schema: Schema) {
		this.s = $state(this.schema.parse(undefined))
	}

	init() {
		const url = new URL(window.location.href)
		const c = url.searchParams.get('c')
		if (c) {
			try {
				const raw_data = this.decode(c)
				this.s = this.schema.parse(raw_data)
			} catch (error) {
				console.error(error)
				alert_manager.notify(
					'Invalid URL',
					'Failed to parse configuration provided by the URL. Loaded the default one instead.'
				)
			}
		}
		$effect(() => {
			try {
				const data = this.schema.parse(this.s)
				const path = this.encode(data)
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					if (path && path !== this.saved_path) {
						this.saved_path = path
						goto(`/?c=${path}`, { replaceState: true, keepFocus: true })
						sim.simulate(data)
					}
				}, 1000)
			} catch (error) {
				console.log('db.s', this.s)
				console.error(error)
			}
		})
	}

	encode(data: any) {
		return LZString.compressToBase64(JSON.stringify(data))
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '')
	}

	decode(text: string) {
		return JSON.parse(LZString.decompressFromBase64(text.replace(/-/g, '+').replace(/_/g, '/')))
	}
}

export const db = new Db<typeof db_schema>(db_schema)
