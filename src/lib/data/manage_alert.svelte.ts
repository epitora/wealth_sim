class Alert_manager {
	open = $state(false)
	title = $state<string>()
	description = $state<string>()
	timer?: number
	delay = 5000

	show(title: string, description: string) {
		this.title = title
		this.description = description
		this.open = true
		if (this.timer !== undefined) {
			this.cancel_close()
		}
		this.schedule_close()
	}

	pause() {
		console.log('pause', this.timer, this.cancel_close)
		this.cancel_close()
	}

	resume() {
		console.log('resume')
		this.timer = setTimeout(() => {
			this.timer = undefined
			this.open = false
		}, this.delay)
	}

	close() {
		this.open = false
		this.cancel_close()
	}

	cancel_close() {
		clearTimeout(this.timer)
		this.timer = undefined
	}

	schedule_close() {
		this.timer = setTimeout(() => {
			this.timer = undefined
			this.open = false
		}, this.delay)
	}
}

export const alert_manager = new Alert_manager()
