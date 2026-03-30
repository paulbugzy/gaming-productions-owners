import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'
import { Fragment } from 'react'

const variants = cva(
	/* base style */
	'',
	{
		variants: {},
		defaultVariants: {}
	}
)

const Toast = ({ visible, intent = 'success', onDismiss, title, content }) => {
	return (
		<>
			{/* Global notification live region, render this permanently at the end of the document */}
			<div
				aria-live="assertive"
				className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:items-start sm:p-6"
			>
				<div className="flex flex-col items-center w-full space-y-4 sm:items-end">
					{/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
					<Transition
						show={visible}
						as={Fragment}
						enter="transform ease-out duration-300 transition"
						enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
						enterTo="translate-y-0 opacity-100 sm:translate-x-0"
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
							<div className="p-4">
								<div className="flex items-start">
									<div className="flex-shrink-0">
										{intent === 'success' && (
											<CheckCircleIcon className="w-6 h-6 text-success-600" aria-hidden="true" />
										)}
										{intent === 'warning' && (
											<ExclamationTriangleIcon
												className="w-6 h-6 text-warning-600"
												aria-hidden="true"
											/>
										)}
										{intent === 'danger' && (
											<ExclamationTriangleIcon
												className="w-6 h-6 text-danger-600"
												aria-hidden="true"
											/>
										)}
									</div>
									<div className="ml-3 w-0 flex-1 pt-0.5">
										<p className="text-sm font-medium text-gray-900">{title}</p>
										<p className="mt-1 text-sm text-gray-500">{content}</p>
									</div>
									<div className="flex flex-shrink-0 ml-4">
										<button
											type="button"
											className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
											onClick={onDismiss}
										>
											<span className="sr-only">Close</span>
											<XMarkIcon className="w-5 h-5" aria-hidden="true" />
										</button>
									</div>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</>
	)
}

Toast.propTypes = {
	visible: PropTypes.bool,
	intent: PropTypes.oneOf(['danger', 'success', 'warning']),
	onDismiss: PropTypes.func.isRequired,
	title: PropTypes.string,
	content: PropTypes.string
}

Toast.defaultProps = {
	intent: 'success'
}

export default Toast
