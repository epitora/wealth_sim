import LZString from 'lz-string'
import * as z from 'zod'
import { page } from '$app/state'
import { goto } from '$app/navigation'
import { alert_manager } from './alert.svelte'
import { schema } from '$lib/data/schema'
import type { Snapshot } from '../../routes/[path]/$types'
// import type { Snapshot } from '../../routes/$types'
// import type { Snapshot } from '@sveltejs/kit'

export class Db<Schema extends z.ZodDefault> {
	s: z.infer<Schema>
	saved_path: string | undefined
	timer: number | undefined

	constructor(public schema: Schema) {
		this.s = $state(this.schema.parse(undefined))
	}

	init() {
		if (page.params.path !== undefined) {
			try {
				const raw_data = this.decode(page.params.path)
				this.s = this.schema.parse(raw_data)
			} catch (e) {
				alert_manager.notify(
					'URL is invalid',
					'Failed to parse configuration provided by the URL. Loaded default configuration instead.'
				)
			}
		}
		$effect(() => {
			const path = this.encode(this.s)
			clearTimeout(this.timer)
			this.timer = setTimeout(() => {
				if (path !== this.saved_path) {
					this.saved_path = path
					goto(path, { replaceState: true })
				}
			}, 1000)
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

export const db = new Db<typeof schema>(schema)
