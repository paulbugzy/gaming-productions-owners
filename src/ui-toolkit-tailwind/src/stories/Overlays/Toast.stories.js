import { Toast } from '../../components'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
	title: 'Overlays/Toast',
	component: Toast,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		visible: true,
		onDismiss: () => {}
	}
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Success = {
	args: {
		intent: 'success',
		title: 'Successfully saved!',
		content: 'Anyone with a link can now view this file.'
	}
}

export const Warning = {
	args: {
		intent: 'warning',
		title: 'Server Error',
		content: 'Anyone with a link can now view this file.'
	}
}

export const Error = {
	args: {
		intent: 'danger',
		title: 'Server Error',
		content: 'Anyone with a link can now view this file.'
	}
}
