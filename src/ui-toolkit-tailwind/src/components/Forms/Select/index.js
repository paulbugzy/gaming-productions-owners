import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { cva, cx } from 'class-variance-authority'
import PropTypes from 'prop-types'
import { Fragment, useEffect, useState } from 'react'

const variants = cva(
	/* base style */
	'relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6',
	{
		variants: {
			invalid: {
				true: '!text-danger-900 !ring-danger-300 focus:!ring-danger-500'
			},
			disabled: {
				true: 'cursor-not-allowed'
			}
		},
		defaultVariants: {}
	}
)

const labelVariants = cva('block truncate', {
	variants: {
		invalid: {
			true: 'text-danger-900'
		},
		placeholder: {
			true: 'text-gray-400'
		}
	},
	compoundVariants: [
		{
			invalid: true,
			placeholder: true,
			className: '!text-danger-300'
		}
	]
})

const Select = ({
	className,
	label,
	options = [],
	disabled,
	invalid,
	errorMessage,
	placeholder = 'Please Select',
	value,
	onChange = () => {},
	...props
}) => {
	const [selectedValue, setSelectedValue] = useState(value)

	useEffect(() => {
		onChange(selectedValue)
	}, [selectedValue, onChange])

	const currentLabel = options?.find(o => o.value === selectedValue)?.label || placeholder
	const hasLabel = !!label
	const hasError = invalid && errorMessage

	return (
		<div className={cx('w-full', className)}>
			<Listbox value={selectedValue} onChange={setSelectedValue} disabled={disabled} {...props}>
				{({ open }) => (
					<>
						{hasLabel && (
							<Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
								{label}
							</Listbox.Label>
						)}
						<div className={cx('relative', hasLabel && 'mt-2')}>
							<Listbox.Button className={variants({ disabled, invalid })}>
								<span
									className={labelVariants({
										invalid,
										placeholder: !selectedValue
									})}
								>
									{currentLabel}
								</span>
								<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
									<ChevronUpDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
								</span>
							</Listbox.Button>

							<Transition
								show={open}
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
									{options?.map((option, index) => {
									const { value: optionValue, label: optionLabel, className: optionClassName } = option
										return (
											<Listbox.Option
												key={index}
												className={({ active }) =>
													cx(
														active ? 'bg-primary-600 text-white' : 'text-gray-900',
														'relative cursor-default select-none py-2 pl-3 pr-9'
													)
												}
												value={optionValue}
											>
												{({ selected, active }) => (
													<>
														<span
															className={cx(
																selected ? 'font-semibold' : 'font-normal',
																optionClassName,
																'block truncate'
															)}
														>
															{optionLabel}
														</span>

														{selected ? (
															<span
																className={cx(
																	active ? 'text-white' : 'text-primary-600',
																	'absolute inset-y-0 right-0 flex items-center pr-4'
																)}
															>
																<CheckIcon className="w-5 h-5" aria-hidden="true" />
															</span>
														) : null}
													</>
												)}
											</Listbox.Option>
										)
									})}
								</Listbox.Options>
							</Transition>
						</div>
					</>
				)}
			</Listbox>

			{hasError && <p className="mt-2 text-sm text-danger-600">{errorMessage}</p>}
		</div>
	)
}

Select.propTypes = {
	className: PropTypes.string,
	label: PropTypes.node,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.any,
			label: PropTypes.string
		})
	),
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	invalid: PropTypes.bool,
	errorMessage: PropTypes.string,
	value: PropTypes.any,
	onChange: PropTypes.func.isRequired
}

Select.defaultProps = {
	options: [],
	placeholder: 'Please select'
}

export default Select
