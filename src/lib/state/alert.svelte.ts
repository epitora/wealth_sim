class Alert_manager {
	open = $state(false)
	title = $state<string>()
	description = $state<string>()
	timer: number | undefined

	constructor(
		public duration: number,
		public dismiss_delay: number
	) {}

	notify(title: string, description: string) {
		this.open = true
		this.title = title
		this.description = description

		clearTimeout(this.timer)
		this.timer = setTimeout(() => {
			this.open = false
			this.timer = undefined
		}, this.duration)
	}

	interact() {
		clearTimeout(this.timer)
		this.timer = undefined
	}

	leave() {
		clearTimeout(this.timer)
		setTimeout(() => {
			this.open = false
			this.timer = undefined
		}, this.dismiss_delay)
	}
}

export const alert_manager = new Alert_manager(5000, 1000)
