<script lang="ts">
	import { type Menu_props } from './shared.js'

	let { children, class: styles = {}, ...rest }: Menu_props = $props()
</script>

<div
	class={{
		'absolute flex w-100 origin-top-right -translate-x-full -rotate-90 flex-row-reverse gap-0.5': true,
		...styles
	}}
	{...rest}
>
	{@render children?.()}
</div>
