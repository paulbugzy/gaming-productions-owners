import { RadioGroup } from '../../components'

const options = [
	{ value: 'email', label: 'Email' },
	{ value: 'sms', label: 'Phone (SMS)' },
	{ value: 'push', label: 'Push notification' }
]

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
	title: 'Forms/RadioGroup',
	component: RadioGroup,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		name: 'notification',
		label: 'Notification method',
		options
	}
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BasicRadioGroup = {
	args: {}
}

export const WithHelperText = {
	args: {
		helperText: 'How do you prefer to receive notifications?'
	}
}

export const InlineRadioGroup = {
	args: {
		helperText: 'How do you prefer to receive notifications?',
		inline: true
	}
}

export const DisabledRadioGroup = {
	args: {
		helperText: 'How do you prefer to receive notifications?',
		disabled: true
	}
}

export const InvalidRadioGroup = {
	args: {
		helperText: 'How do you prefer to receive notifications?',
		invalid: true,
		errorMessage: 'Required'
	}
}
