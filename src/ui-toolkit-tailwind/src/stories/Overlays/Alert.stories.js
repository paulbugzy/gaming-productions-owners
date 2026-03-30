import { GiftIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

import { Alert, Button } from '../../components'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
	title: 'Overlays/Alert',
	component: Alert,
	tags: ['autodocs'],
	argTypes: {}
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Notification = args => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Click to open modal</Button>
			<Alert
				{...args}
				type="notification"
				visible={isOpen}
				onDismiss={() => setIsOpen(false)}
				title="Payment successful"
				dismissLabel="Deactivate"
			>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo
				pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere
				veritatis.
			</Alert>
		</>
	)
}

export const Confirmation = args => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Click to open modal</Button>
			<Alert
				{...args}
				type="confirmation"
				visible={isOpen}
				onDismiss={() => setIsOpen(false)}
				onConfirm={() => setIsOpen(false)}
				title="Deactivate account"
				confirmLabel="Deactivate"
			>
				Are you sure you want to deactivate your account? All of your data will be permanently
				removed from our servers forever. This action cannot be undone.
			</Alert>
		</>
	)
}

export const NotificationWithCustomIcon = args => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Click to open modal</Button>
			<Alert
				{...args}
				type="notification"
				visible={isOpen}
				onDismiss={() => setIsOpen(false)}
				title="Payment successful"
				dismissLabel="Deactivate"
				icon={GiftIcon}
			>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo
				pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere
				veritatis.
			</Alert>
		</>
	)
}
