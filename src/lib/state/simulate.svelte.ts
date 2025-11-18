import type { Db } from '$lib/data/schema'

export class Simulation {
	running = $state(true)
	data_a = $state<{ index: number; value: number }[]>([])
	data_b = $state<{ index: number; value: number }[]>([])
	last_snapshot = ''

	simulate(db: Db) {
		const snapshot = this.take_snapshot(db)
		if (this.last_snapshot === snapshot) return
		this.last_snapshot = snapshot

		this.running = true
		this.data_a = []
		this.data_b = []

		let value = db.c.w
		for (let index = 0; index <= db.s.h; index++) {
			for (let month = 0; month < 12; month++) {
				// const date = new Date(index, month, 1)
				value *= 1 - db.c.i / (100 * 12)
				this.data_a.push({ index, value: db.c.w })
				this.data_b.push({ index, value })
			}
		}
		this.running = false
	}

	take_snapshot(db: Db) {
		const { u, ...rest } = db
		return JSON.stringify(rest)
	}
}

export const sim = new Simulation()
