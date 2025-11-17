class Tooltip_manager {
	timer: number | undefined

	constructor(
		public show_delay: number,
		public hide_delay: number
	) {}

	interact(show_tooltip: () => void) {
		if (!this.timer) {
			this.timer = setTimeout(() => {
				show_tooltip()
				this.timer = undefined
			}, this.show_delay)
		} else {
			show_tooltip()
			clearTimeout(this.timer)
			this.timer = undefined
		}
	}

	leave(hide_tooltip: () => void) {
		if (!this.timer) {
			this.timer = setTimeout(() => {
				hide_tooltip()
				this.timer = undefined
			}, this.hide_delay)
		} else {
			clearTimeout(this.timer)
			this.timer = undefined
		}
	}
}

export const tooltip_manager = new Tooltip_manager(500, 200)
