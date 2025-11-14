class Tooltip_manager {
	timer_show?: number
	timer_hide?: number
	delay_show: number
	delay_hide: number

	constructor(delay_show: number, delay_hide: number) {
		this.delay_show = delay_show
		this.delay_hide = delay_hide
	}

	enter(show_tooltip: () => void) {
		if (this.timer_hide !== undefined) {
			show_tooltip()
			clearTimeout(this.timer_hide)
			this.timer_hide = undefined
		} else {
			this.timer_show = setTimeout(() => {
				this.timer_show = undefined
				show_tooltip()
			}, this.delay_show)
		}
	}

	leave(hide_tooltip: () => void) {
		if (this.timer_show !== undefined) {
			clearTimeout(this.timer_show)
			this.timer_show = undefined
		} else {
			this.timer_hide = setTimeout(() => {
				this.timer_hide = undefined
				hide_tooltip()
			}, this.delay_show)
		}
	}
}

export const field_tip_manager = new Tooltip_manager(500, 500)
export const button_tip_manager = new Tooltip_manager(500, 100)
