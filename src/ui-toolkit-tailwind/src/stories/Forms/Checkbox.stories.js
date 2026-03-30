import { Checkbox } from '../../components'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
	title: 'Forms/Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	argTypes: {}
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BasicCheckbox = {
	args: {
		name: 'notification',
		label: 'Comments'
	}
}

export const WithHelperText = {
	args: {
		name: 'notification',
		label: 'Comments',
		helperText: 'Get notified when someones posts a comment on a posting.'
	}
}

export const DisabledCheckbox = {
	args: {
		name: 'notification',
		label: 'Comments',
		disabled: true,
		checked: true
	}
}

export const InvalidCheckbox = {
	args: {
		name: 'notification',
		label: 'Comments',
		helperText: 'Get notified when someones posts a comment on a posting.',
		invalid: true,
		errorMessage: 'Required'
	}
}
