import { EnvelopeIcon } from '@heroicons/react/20/solid'

import { TextInput } from '../../components'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
	title: 'Forms/TextInput',
	component: TextInput,
	tags: ['autodocs'],
	argTypes: {}
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BasicTextInput = {
	args: {
		name: 'email',
		type: 'email',
		label: 'Email',
		placeholder: 'you@example.com'
	}
}

export const WithNoLabel = {
	args: {
		name: 'text'
	}
}

export const WithHelperText = {
	args: {
		name: 'email',
		type: 'email',
		label: 'Email',
		placeholder: 'you@example.com',
		helperText: "We'll only use this for spam."
	}
}

export const WithCornerHint = {
	args: {
		name: 'email',
		type: 'email',
		label: 'Email',
		placeholder: 'you@example.com',
		cornerHint: 'Optional'
	}
}

export const Disabled = {
	args: {
		name: 'email',
		type: 'email',
		label: 'Email',
		placeholder: 'you@example.com',
		disabled: true
	}
}

export const Invalid = {
	args: {
		name: 'date',
		type: 'email',
		label: 'Email',
		placeholder: 'you@example.com',
		invalid: true,
		errorMessage: 'Invalid Email'
	}
}

export const withLeadingText = {
	args: {
		name: 'website',
		type: 'text',
		label: 'Website',
		placeholder: 'www.example.com',
		leadingAddon: 'http://'
	}
}

export const withLeadingIcon = {
	args: {
		name: 'email',
		type: 'email',
		label: 'Email',
		placeholder: 'you@example.com',
		leadingIcon: EnvelopeIcon
	}
}

export const pillShape = {
	args: {
		name: 'name',
		type: 'text',
		label: 'Name',
		placeholder: 'John Smith',
		pill: true
	}
}
