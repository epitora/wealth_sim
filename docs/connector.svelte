<script lang="ts">
	type Connection = {
		left: number
		right: number
	}

	type Props = {
		height: number
		width: number
		left_count: number
		right_count: number
		connections: Connection[]
		class: string
	}

	const { height: h, width: w, left_count, right_count, connections, class: class_ }: Props = $props()

	const r = 2
	const lh = h / left_count
	const rh = h / right_count

	function angle(w: number, h: number, r: number) {
		if (r === 0) {
			return Math.atan(Math.abs(h / w))
		}
		const W = Math.abs(w / (2 * r))
		const H = Math.abs(h / (2 * r))
		const m = (Math.sqrt(W ** 2 + H ** 2 - 2 * H) - W) / (H - 2)
		return 2 * Math.atan(m)
	}

	function connector(connection: Connection) {
		const lt = lh * connection.left
		const rt = rh * connection.right

		const tdy = rt - lt
		const ta = angle(w, tdy, r)
		const taa = (180 * ta) / Math.PI
		const tadx = r * Math.sin(ta)
		const tady = r * (1 - Math.cos(ta)) * Math.sign(tdy)

		const bdy = rt - lt + rh - lh
		const ba = angle(w, bdy, r)
		const baa = (180 * ba) / Math.PI
		const badx = r * Math.sin(ba)
		const bady = r * (1 - Math.cos(ba)) * Math.sign(bdy)

		return `m 0 ${lt}
a ${r} ${r} ${taa} 0 ${tdy < 0 ? 0 : 1} ${tadx} ${tady}
l ${w - 2 * tadx} ${tdy - 2 * tady}
a ${r} ${r} ${taa} 0 ${tdy < 0 ? 1 : 0} ${tadx} ${tady}
l 0 ${rh}
a ${r} ${r} ${baa} 0 ${bdy < 0 ? 0 : 1} ${-badx} ${-bady}
l ${-(w - 2 * badx)} ${-(bdy - 2 * bady)}
a ${r} ${r} ${baa} 0 ${bdy < 0 ? 1 : 0} ${-badx} ${-bady}
z`
	}
</script>

<div class={class_}>
	<svg class="h-full w-{w}" viewBox="0 0 {w} {h}">
		{#each connections as connection}
			<path class="fill-accent" d={connector(connection)}></path>
		{/each}
	</svg>
</div>
