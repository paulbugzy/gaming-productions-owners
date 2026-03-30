import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'
import { Fragment } from 'react'

const variants = cva(
	/* base style */
	'relative w-full overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full',
	{
		variants: {
			size: {
				md: 'sm:max-w-md',
				lg: 'sm:max-w-lg',
				xl: 'sm:max-w-2xl',
				'2xl': 'sm:max-w-4xl'
			}
		},
		defaultVariants: {
			size: 'lg'
		}
	}
)

const Modal = ({
	visible,
	onClose,
	size,
	clickOutsideToClose = false,
	hideCloseButton,
	children
}) => {
	return (
		<Transition.Root show={visible} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				static={!clickOutsideToClose}
				onClose={clickOutsideToClose ? onClose : () => {}}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className={variants({ size })}>
								{/* close button */}
								{!hideCloseButton && (
									<div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
										<button
											type="button"
											className="text-gray-400 bg-white rounded-md hover:text-gray-500"
											onClick={onClose}
										>
											<span className="sr-only">Close</span>
											<XMarkIcon className="w-6 h-6" aria-hidden="true" />
										</button>
									</div>
								)}

								{children}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

const Header = ({ children }) => (
	<div className="px-4 py-5 border-b border-gray-200 sm:px-6">
		<h3 className="text-lg font-semibold leading-6 text-gray-900">{children}</h3>
	</div>
)
const Body = ({ children }) => <div className="px-4 py-5 sm:p-6">{children}</div>

const Footer = ({ children }) => (
	<div className="px-4 py-4 border-t border-gray-200 sm:px-6">{children}</div>
)

const ActionButtons = ({ children }) => (
	<div className="flex justify-end gap-1 px-4 py-5 sm:gap-3">{children}</div>
)

Modal.Header = Header
Modal.Body = Body
Modal.Footer = Footer
Modal.ActionButtons = ActionButtons

Modal.propTypes = {
	visible: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	size: PropTypes.oneOf(['md', 'lg', 'xl', '2xl']),
	clickOutsideToClose: PropTypes.bool,
	hideCloseButton: PropTypes.bool,
	children: PropTypes.node
}
Header.propTypes = {
	children: PropTypes.node
}
Body.propTypes = {
	children: PropTypes.node
}
Footer.propTypes = {
	children: PropTypes.node
}
ActionButtons.propTypes = {
	children: PropTypes.node
}

Modal.defaultProps = {
	size: 'lg',
	clickOutsideToClose: false
}

export default Modal
