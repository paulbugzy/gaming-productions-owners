import { CheckCircleIcon } from '@heroicons/react/20/solid'

import { Button } from '../components'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
	title: 'Example/Template',
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
