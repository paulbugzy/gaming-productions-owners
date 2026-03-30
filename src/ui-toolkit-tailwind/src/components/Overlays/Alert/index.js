import { Dialog } from '@headlessui/react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

import Button from '../../Elements/Button'
import Modal from '../Modal'

const iconVariants = cva(
	/* base style */
	'flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto rounded-full sm:mx-0 sm:h-10 sm:w-10',
	{
		variants: {
			intent: {
				success: 'text-success-600 bg-success-100',
				warning: 'text-warning-600 bg-warning-100',
				danger: 'text-danger-600 bg-danger-100'
			}
		},
		defaultVariants: {
			intent: 'success'
		}
	}
)

const Alert = ({
	visible,
	type = 'notification',
	title,
	icon,
	intent = 'success',
	onDismiss = () => {},
	onConfirm = () => {},
	dismissLabel,
	confirmLabel,
	children
}) => {
	const isNotification = type === 'notification'
	const Icon = icon || (intent === 'success' ? CheckIcon : ExclamationTriangleIcon)

	return (
		<Modal visible={visible} onClose={onDismiss} hideCloseButton>
			<div className="px-4 pt-5 pb-4 sm:p-6">
				<div className="sm:flex sm:items-start">
					<div className={iconVariants({ intent })}>
						<Icon className="w-6 h-6" aria-hidden="true" />
					</div>
					<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
						<Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
							{title}
						</Dialog.Title>
						<div className="mt-2">
							<p className="text-sm text-gray-500">{children}</p>
						</div>
					</div>
				</div>

				{isNotification && (
					<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
						<Button
							className="w-full sm:w-auto"
							intent={intent === 'danger' ? 'danger' : 'primary'}
							onClick={onDismiss}
						>
							{dismissLabel || 'Ok'}
						</Button>
					</div>
				)}

				{!isNotification && (
					<div className="flex gap-3 mt-5 sm:mt-4 sm:flex-row-reverse">
						<Button
							className="w-full sm:w-auto"
							intent={intent === 'danger' ? 'danger' : 'primary'}
							onClick={onConfirm}
						>
							{confirmLabel || 'Ok'}
						</Button>
						<Button className="w-full sm:w-auto" intent="secondary" onClick={onDismiss}>
							{dismissLabel || 'Cancel'}
						</Button>
					</div>
				)}
			</div>
		</Modal>
	)
}

Alert.propTypes = {
	visible: PropTypes.bool,
	type: PropTypes.oneOf(['confirmation', 'notification']),
	title: PropTypes.string,
	icon: PropTypes.func,
	intent: PropTypes.oneOf(['success', 'danger', 'warning']),
	onDismiss: PropTypes.func.isRequired,
	onConfirm: PropTypes.func,
	dismissLabel: PropTypes.string,
	confirmLabel: PropTypes.string,
	children: PropTypes.node
}

Alert.defaultProps = {
	type: 'notification'
}

export default Alert
