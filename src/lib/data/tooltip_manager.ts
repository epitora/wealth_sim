class Tooltip_manager {
	show_timer?: number = undefined
	cooldown_timer?: number = undefined
	delay = 500

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
			hide_tooltip()
			this.cooldown_timer = setTimeout(() => (this.cooldown_timer = undefined), this.delay)
		}
	}
}

export const tooltip_manager = new Tooltip_manager()
