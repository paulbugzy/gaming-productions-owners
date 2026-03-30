import { cva, cx } from 'class-variance-authority'
import PropTypes from 'prop-types'
import { useId } from 'react'

const variants = cva(
	/* base style */
	'h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600',
	{
		variants: {
			invalid: {
				true: '!text-danger-600 !border-danger-500 focus:!ring-danger-500'
			},
			disabled: {
				true: 'cursor-not-allowed opacity-60'
			}
		},
		defaultVariants: {}
	}
)

const Checkbox = ({
	className,
	name,
	label,
	helperText,
	disabled,
	invalid,
	errorMessage,
	value,
	...props
}) => {
	const randomId = useId()
	const hasError = invalid && errorMessage

	return (
		<div className={cx('w-full', className)}>
			<div className="relative flex items-start">
				<div className="flex items-center h-6">
					<input
						id={name}
						aria-describedby={randomId}
						name={name}
						type="checkbox"
						className={variants({ disabled, invalid })}
						disabled={disabled}
						checked={value}
						{...props}
					/>
				</div>
				<div className="ml-3 text-sm leading-6">
					<label htmlFor={name} className="font-medium text-gray-900">
						{label}
					</label>

					{helperText && !hasError && (
						<p id={randomId} className="text-gray-500">
							{helperText}
						</p>
					)}

					{hasError && <p className="mt-1 text-sm text-danger-600">{errorMessage}</p>}
				</div>
			</div>
		</div>
	)
}

Checkbox.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.node,
	helperText: PropTypes.string,
	value: PropTypes.bool,
	disabled: PropTypes.bool,
	invalid: PropTypes.bool,
	errorMessage: PropTypes.string
}

Checkbox.defaultProps = {}

export default Checkbox
