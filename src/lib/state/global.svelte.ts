type Global = {
	hovered_timeline_index: number | undefined
}

export const global: Global = $state({
	hovered_timeline_index: undefined,
})
