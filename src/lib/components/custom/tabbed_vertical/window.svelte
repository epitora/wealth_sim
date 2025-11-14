<script lang="ts">
	import clsx from 'clsx'
	import { type Content_props } from './shared.js'

	let { children, class: class_, ...rest }: Content_props = $props()
</script>

<div class={['w-full overflow-hidden rounded-md border', clsx(class_)]} {...rest}>
	{@render children()}
</div>
