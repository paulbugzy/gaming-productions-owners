import Spinner from '../../components/Overlays/Spinner.js'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
	title: 'Overlays/Spinner',
	component: Spinner,
	tags: ['autodocs'],
	argTypes: {}
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BasicSpinner = {
	args: {
		visible: true
	}
}
