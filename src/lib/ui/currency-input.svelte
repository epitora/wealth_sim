<script lang="ts">
	import clsx, { type ClassValue } from 'clsx'
	import { onMount } from 'svelte'
	import Dollar_sign_icon from '@lucide/svelte/icons/dollar-sign'

	type Props = {
		value: number
		class?: ClassValue
	}

	let { value = $bindable(), class: class_ }: Props = $props()

	const parse = (text: string) => (text === '+' || text === '-' ? 0 : Number(text))

	const alphabet = /[^-+0-9]/g
	const pattern = /^[-+]?[0-9]{0,10}$/

	let input: HTMLInputElement
	let text = $state<string>()!

	onMount(() => {
		text = value.toString()
	})

	const enforce_valid = (event: InputEvent) => {
		const type = event.inputType
		const start = input.selectionStart ?? 0
		const end = input.selectionEnd ?? 0
		const current_value = text

		const incoming = event.data ?? ''
		const allowed_text = incoming.replace(alphabet, '')

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
		const violates_pattern = !pattern.test(new_value)

		if (filtered_differs || violates_pattern) {
			event.preventDefault()

			if (is_insertion && allowed_text && pattern.test(new_value)) {
				text = new_value
				const caret = start + allowed_text.length
				input.setSelectionRange(caret, caret)
			}
			return
		}
	}

	const update_value = () => {
		const new_value = parse(text)
		if (new_value !== value) value = new_value
	}

	const on_blur = () => {
		text = value.toString()
	}
</script>

<div class={['relative rounded-md border overflow-hidden', clsx(class_)]}>
	<input
		bind:this={input}
		bind:value={text}
		onbeforeinput={enforce_valid}
		oninput={update_value}
		onblur={on_blur}
		class={['pl-10 h-32 focus:bg-accent hover:bg-accent field-sizing-content min-w-80 max-w-full pr-26']} />
	<Dollar_sign_icon class={['pointer-events-none absolute right-6 inset-y-0 my-auto text-muted']} />
</div>
