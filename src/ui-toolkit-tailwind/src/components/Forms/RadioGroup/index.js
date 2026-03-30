import { cva, cx } from 'class-variance-authority'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const variants = cva(
	/* base style */
	'w-4 h-4 border-gray-300 text-primary-600 focus:ring-primary-600',
	{
		variants: {
			invalid: {
				true: '!text-danger-900 !border-danger-300 checked:!bg-danger-500 hover:checked:!bg-danger-400 checked:focus:!bg-danger-500 focus:!ring-danger-500'
			},
			disabled: {
				true: 'cursor-not-allowed'
			}
		},
		defaultVariants: {}
	}
)

const labelVariants = cva('block ml-3 text-sm font-medium leading-6 text-gray-900', {
	variants: {
		disabled: {
			true: 'text-gray-400'
		}
	}
})

const RadioGroup = ({
	className,
	label,
	name,
	options = [],
	helperText,
	inline,
	disabled,
	invalid,
	errorMessage,
	value,
	onChange = () => {},
	...props
}) => {
	const [selected, setSelected] = useState(value)

	const hasLabel = !!label
	const hasError = invalid && errorMessage

	useEffect(() => {
		onChange(selected)
	}, [selected, onChange])

	return (
		<div className={cx('w-full', className)}>
			{hasLabel && <label className="text-base font-semibold text-gray-900">{label}</label>}

			{helperText && <p className="text-sm text-gray-500">{helperText}</p>}

			<fieldset className={cx(hasLabel && 'mt-4')}>
				<legend className="sr-only">{label}</legend>
				<div
					className={cx(
						'space-y-4',
						inline && 'sm:flex sm:items-center sm:space-x-10 sm:space-y-0'
					)}
				>
					{options?.map(option => (
						<div key={option.value} className="flex items-center">
							<input
								id={option.value}
								name={name}
								type="radio"
								checked={option.value === selected}
								onChange={() => setSelected(option.value)}
								className={variants({ invalid, disabled })}
								disabled={disabled}
								{...props}
							/>
							<label htmlFor={option.value} className={labelVariants({ disabled })}>
								{option.label}
							</label>
						</div>
					))}
				</div>
			</fieldset>

			{hasError && <p className="mt-4 text-sm text-danger-600">{errorMessage}</p>}
		</div>
	)
}

RadioGroup.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.node,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.any,
			label: PropTypes.string
		})
	),
	helperText: PropTypes.string,
	inline: PropTypes.bool,
	disabled: PropTypes.bool,
	invalid: PropTypes.bool,
	errorMessage: PropTypes.string,
	value: PropTypes.any,
	onChange: PropTypes.func.isRequired
}

RadioGroup.defaultProps = {
	options: []
}

export default RadioGroup
