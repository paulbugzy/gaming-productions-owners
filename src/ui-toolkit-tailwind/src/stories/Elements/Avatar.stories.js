import { Avatar } from 'ui-toolkit-tailwind/src/components'

const imagePlaceHolder =
	'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
	title: 'Elements/Avatar',
	component: Avatar,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		size: 'md'
	}
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Placeholder = {
	args: {}
}

export const withNamePlaceholder = {
	args: {
		name: 'John Doe'
	}
}

export const withImage = {
	args: {
		src: imagePlaceHolder
	}
}
