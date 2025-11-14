type Primitive = string | number | boolean | undefined

export class Temp<T extends Record<string, Primitive>> {
	data: T = $state()!

	constructor(data: T) {
		this.data = data
	}
}

type Data = {
	hovered_year?: number
}

export const temp = new Temp<Data>({
	hovered_year: undefined,
})
