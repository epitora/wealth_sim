<script lang="ts">
	import clsx from 'clsx'
	import { type Root_props } from './shared.js'

	let { heading, children, class: class_, ...rest }: Root_props = $props()
</script>

<div class={['flex w-64 flex-col gap-2', clsx(class_)]} {...rest}>
	<div class="mb-1 font-bold text-lg">{heading}</div>
	{@render children()}
</div>
