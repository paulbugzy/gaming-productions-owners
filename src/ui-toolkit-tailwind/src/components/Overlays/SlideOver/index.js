import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

const variants = cva(
	/* base style */
	'',
	{
		variants: {},
		defaultVariants: {}
	}
)

const SlideOver = ({ visible, onClose = () => {}, title, children }) => {
	const body = React.Children.toArray(children).filter(child => child.type === SlideOver.Body)
	const footer = React.Children.toArray(children).filter(child => child.type === SlideOver.Footer)

	return (
		<Transition.Root show={visible} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-in-out duration-500"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in-out duration-500"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="w-screen max-w-md pointer-events-auto">
									<div className="flex flex-col h-full bg-white divide-y divide-gray-200 shadow-xl">
										<div className="flex flex-col flex-1 min-h-0 py-6 overflow-y-auto">
											<div className="px-4 sm:px-6">
												<div className="flex items-start justify-between">
													<Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
														{title}
													</Dialog.Title>
													<div className="flex items-center ml-3 h-7">
														<button
															type="button"
															className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none"
															onClick={onClose}
														>
															<span className="sr-only">Close panel</span>
															<XMarkIcon className="w-6 h-6" aria-hidden="true" />
														</button>
													</div>
												</div>
											</div>

											{body}
										</div>

										{footer}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

const Body = ({ children }) => (
	<div className="relative flex-1 px-4 mt-6 overflow-y-scroll sm:px-6">{children}</div>
)
Body.propTypes = {
	children: PropTypes.node
}

const Footer = ({ children }) => (
	<div className="flex justify-end flex-shrink-0 gap-4 px-4 py-4">{children}</div>
)
Footer.propTypes = {
	children: PropTypes.node
}

SlideOver.Body = Body
SlideOver.Footer = Footer

SlideOver.propTypes = {
	visible: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string,
	children: PropTypes.node
}

SlideOver.defaultProps = {}

export default SlideOver
