<script lang="ts">
	import * as Field from '$lib/components/ui/field/index.js'
	import type { Snippet } from 'svelte'

	type Props = {
		label: string
		children: Snippet
	}
	const { label, children }: Props = $props()
</script>

<Field.Field class="flex items-center!" orientation="horizontal">
	<Field.Content>
		<Field.Label class="font-normal whitespace-nowrap">{label}</Field.Label>
	</Field.Content>
	{@render children()}
</Field.Field>
