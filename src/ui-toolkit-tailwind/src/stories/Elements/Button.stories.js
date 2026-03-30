import { CheckCircleIcon } from '@heroicons/react/20/solid'

import { Button } from '../../components'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
	title: 'Element/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {}
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BasicButton = {
	args: {
		intent: 'primary',
		size: 'md',
		onClick: () => console.log('click'),
		children: 'Button'
	}
}

export const DisabledButton = {
	args: {
		intent: 'primary',
		size: 'md',
		onClick: () => console.log('click'),
		disabled: true,
		children: 'Button'
	}
}

export const WithLeadingIcon = {
	args: {
		intent: 'primary',
		size: 'md',
		children: 'Button',
		leadingIcon: CheckCircleIcon
	}
}

export const WithTrailingIcon = {
	args: {
		intent: 'primary',
		size: 'md',
		children: 'Button',
		trailingIcon: CheckCircleIcon
	}
}
