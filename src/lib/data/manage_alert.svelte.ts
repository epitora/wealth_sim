class Alert_manager {
	open = $state(false)
	title = $state<string>()
	description = $state<string>()
	timer?: number
	delay = 5000
	dismiss_delay = 1000

	show(title: string, description: string) {
		this.title = title
		this.description = description
		this.open = true

		clearTimeout(this.timer)
		this.timer = setTimeout(() => {
			this.timer = undefined
			this.open = false
		}, this.delay)
	}

	interact() {
		clearTimeout(this.timer)
		this.timer = undefined
	}

	dismiss() {
		clearTimeout(this.timer)
		setTimeout(() => {
			this.timer = undefined
			this.open = false
		}, this.dismiss_delay)
	}
}

export const alert_manager = new Alert_manager()
