<script lang="ts" generics="V extends Value">
	import clsx, { type ClassValue } from 'clsx'
	import type { Value } from '$lib/utils.js'
	import { onMount } from 'svelte'
	import type { Icon as Icon_ } from '@lucide/svelte'

	type Props = {
		value: V
		alphabet?: string
		pattern?: string
		parse?: (text: string) => V
		format?: (value: V) => string
		Icon?: typeof Icon_
		class?: ClassValue
	}

	let {
		value = $bindable(),
		alphabet = '.',
		pattern = '.*',
		parse = (text: string) => (typeof value === 'number' ? Number(text) : text) as V,
		format = (value: V) => (typeof value === 'number' ? value.toString() : value),
		Icon,
		class: class_,
	}: Props = $props()

	const replace_regex = new RegExp(`[^${alphabet}]`, 'g')
	const pattern_regex = new RegExp(`^${pattern}$`)

	let input: HTMLInputElement
	let text = $state<string>()!
	const is_empty = $derived(text === '')

	onMount(() => {
		text = format(value)
	})

	const enforce_valid = (event: InputEvent) => {
		const type = event.inputType
		const start = input.selectionStart ?? 0
		const end = input.selectionEnd ?? 0
		const current_value = text

		const incoming = event.data ?? ''
		const allowed_text = incoming.replace(replace_regex, '')

		let new_value: string

		switch (type) {
			case 'insertText':
			case 'insertFromPaste':
			case 'insertFromDrop':
			case 'insertCompositionText': {
				new_value = current_value.slice(0, start) + allowed_text + current_value.slice(end)
				break
			}

			case 'deleteContentBackward': {
				if (start === end) {
					const del_start = Math.max(start - 1, 0)
					new_value = current_value.slice(0, del_start) + current_value.slice(end)
				} else {
					new_value = current_value.slice(0, start) + current_value.slice(end)
				}
				break
			}

			case 'deleteContentForward': {
				if (start === end) {
					const del_end = Math.min(end + 1, current_value.length)
					new_value = current_value.slice(0, start) + current_value.slice(del_end)
				} else {
					new_value = current_value.slice(0, start) + current_value.slice(end)
				}
				break
			}

			default:
				return
		}

		const is_insertion = type.startsWith('insert')
		const filtered_differs = is_insertion && allowed_text !== incoming
		const violates_pattern = !pattern_regex.test(new_value)

		if (filtered_differs || violates_pattern) {
			event.preventDefault()

			if (is_insertion && allowed_text && pattern_regex.test(new_value)) {
				text = new_value
				const caret = start + allowed_text.length
				input.setSelectionRange(caret, caret)
			}
			return
		}
	}

	const update_value = () => {
		const new_value = parse(text)
		if (new_value !== value) {
			value = new_value
		}
	}

	const on_blur = () => {
		text = format(value)
	}
</script>

<div class={['relative rounded-md border overflow-hidden', clsx(class_)]}>
	<input
		bind:this={input}
		bind:value={text}
		onbeforeinput={enforce_valid}
		oninput={update_value}
		onblur={on_blur}
		class={[
			'pl-10 h-32 focus:bg-accent hover:bg-accent field-sizing-content min-w-80 max-w-full',
			Icon ? 'pr-26' : 'pr-10',
		]} />
	{#if Icon}
		<Icon class={['pointer-events-none absolute right-6 inset-y-0 my-auto', is_empty && 'text-muted']} />
	{/if}
</div>
