import LZString from 'lz-string'
import * as z from 'zod'
import { page } from '$app/state'
import { goto } from '$app/navigation'
import { alert_manager } from './alert.svelte'

export class Perm<T extends z.ZodDefault> {
	schema: T
	data: z.infer<T> = $state()!

	constructor(schema: T) {
		this.schema = schema
	}

	init() {
		if (page.params.path !== undefined) {
			try {
				const raw_data = decompress_url_safe_to_json(page.params.path)
				this.data = this.schema.parse(raw_data)
			} catch (e) {
				console.error(e)
				alert_manager.show(
					'URL is invalid',
					'Failed to parse configuration provided by the URL. Loaded default configuration instead.'
				)
			}
		}

		if (this.data === undefined) {
			this.data = this.schema.parse(undefined)
		}

		$effect(() => {
			goto(compress_json_to_url_safe(this.data))
		})
	}
}

export function compress_json_to_url_safe(data: any) {
	return LZString.compressToBase64(JSON.stringify(data)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decompress_url_safe_to_json(text: string) {
	return JSON.parse(LZString.decompressFromBase64(text.replace(/-/g, '+').replace(/_/g, '/')))
}
