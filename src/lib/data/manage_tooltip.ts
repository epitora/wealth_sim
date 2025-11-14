class Tooltip_manager {
	show_timer?: number
	cooldown_timer?: number
	delay = 400

	enter(show_tooltip: () => void) {
		if (this.cooldown_timer !== undefined) {
			show_tooltip()
			clearTimeout(this.cooldown_timer)
			this.cooldown_timer = undefined
		} else {
			this.show_timer = setTimeout(() => {
				this.show_timer = undefined
				show_tooltip()
			}, this.delay)
		}
	}

	leave(hide_tooltip: () => void) {
		if (this.show_timer !== undefined) {
			clearTimeout(this.show_timer)
			this.show_timer = undefined
		} else {
			this.cooldown_timer = setTimeout(() => {
				this.cooldown_timer = undefined
				hide_tooltip()
			}, this.delay)
		}
	}
}

export const tooltip_manager = new Tooltip_manager()
