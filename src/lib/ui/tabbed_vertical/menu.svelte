<script lang="ts">
	import clsx from 'clsx'
	import { type Menu_props } from './shared.js'

	let { children, class: class_, ...rest }: Menu_props = $props()
</script>

<div class={['flex flex-row-reverse gap-0.5 orient-vertical', clsx(class_)]} {...rest}>
	{@render children()}
</div>
