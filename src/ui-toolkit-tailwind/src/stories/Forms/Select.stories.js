import { Select } from '../../components'

const options = [
	{ value: 1, label: 'Wade Cooper' },
	{ value: 2, label: 'Arlene Mccoy' },
	{ value: 3, label: 'Devon Webb' },
	{ value: 4, label: 'Tom Cook' },
	{ value: 5, label: 'Tanya Fox' },
	{ value: 6, label: 'Hellen Schmidt' },
	{ value: 7, label: 'Caroline Schultz' },
	{ value: 8, label: 'Mason Heaney' },
	{ value: 9, label: 'Claudie Smitham' },
	{ value: 10, label: 'Emil Schaefer' }
]

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
	title: 'Forms/Select',
	component: Select,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		label: 'Assigned to',
		options
	}
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BasicSelect = {
	args: {}
}

export const DisabledSelect = {
	args: {
		disabled: true
	}
}

export const InvalidSelect = {
	args: {
		invalid: true,
		errorMessage: 'Required'
	}
}
