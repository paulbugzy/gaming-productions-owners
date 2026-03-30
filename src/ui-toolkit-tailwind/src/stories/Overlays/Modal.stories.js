import { useState } from 'react'

import { Button, Modal } from '../../components'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
	title: 'Overlays/Modal',
	component: Modal,
	tags: ['autodocs']
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BasicModal = args => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Click to open modal</Button>
			<Modal {...args} visible={isOpen} onClose={() => setIsOpen(false)}>
				<Modal.Header>Title</Modal.Header>
				<Modal.Body>Body</Modal.Body>
				<Modal.ActionButtons>
					<Button intent="secondary" onClick={() => setIsOpen(false)}>
						Cancel
					</Button>
					<Button onClick={() => setIsOpen(false)}>Confirm</Button>
				</Modal.ActionButtons>
			</Modal>
		</>
	)
}

export const HideCloseButton = args => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Click to open modal</Button>
			<Modal {...args} hideCloseButton visible={isOpen} onClose={() => setIsOpen(false)}>
				<Modal.Header>Title</Modal.Header>
				<Modal.Body>Body</Modal.Body>
				<Modal.ActionButtons>
					<Button intent="secondary" onClick={() => setIsOpen(false)}>
						Cancel
					</Button>
					<Button onClick={() => setIsOpen(false)}>Confirm</Button>
				</Modal.ActionButtons>
			</Modal>
		</>
	)
}
