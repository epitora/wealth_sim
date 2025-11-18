class Alert_manager {
	s = $state<{ title: string; description: string }>()
	timer: number | undefined

	constructor(
		public duration: number,
		public dismiss_delay: number
	) {}

	notify(title: string, description: string) {
		this.s = { title, description }

		clearTimeout(this.timer)
		this.timer = setTimeout(() => {
			this.s = undefined
			this.timer = undefined
		}, this.duration)
	}

	interact() {
		clearTimeout(this.timer)
		this.timer = undefined
	}

	leave() {
		clearTimeout(this.timer)
		this.timer = setTimeout(() => {
			this.s = undefined
			this.timer = undefined
		}, this.dismiss_delay)
	}
}

export const alert_manager = new Alert_manager(5000, 1000)
