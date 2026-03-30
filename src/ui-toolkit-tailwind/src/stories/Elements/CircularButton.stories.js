import { PlusIcon } from '@heroicons/react/20/solid'

import { CircularButton } from '../../components'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
	title: 'Element/CircularButton',
	component: CircularButton,
	tags: ['autodocs'],
	argTypes: {}
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BasicCircularButton = {
	args: {
		intent: 'primary',
		size: 'md',
		icon: PlusIcon
	}
}
