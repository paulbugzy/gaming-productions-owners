import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

const variants = cva(
	/* base style */
	'rounded font-semibold shadow-sm disabled:cursor-not-allowed disabled:bg-opacity-60',
	{
		variants: {
			intent: {
				primary:
					'bg-primary-600 text-white hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
				secondary:
					'bg-secondary-600 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200',
				warning:
					'bg-warning-600 text-white hover:bg-warning-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning-600',
				danger:
					'bg-danger-600 text-white hover:bg-danger-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger-600'
			},
			size: {
				xs: 'px-2 py-1 text-xs',
				sm: 'px-2 py-1 text-sm',
				md: 'px-2.5 py-1.5 text-sm',
				lg: 'px-3 py-2 text-sm',
				xl: 'px-3.5 py-2.5 text-sm'
			},
			fullWidth: {
				true: 'w-full'
			},
			rounded: {
				true: 'rounded-full'
			},
			hasLeadingIcon: {
				true: 'inline-flex items-center gap-x-1.5'
			},
			hasTrailingIcon: {
				true: 'inline-flex items-center gap-x-1.5'
			}
		},
		defaultVariants: {
			intent: 'primary',
			size: 'md'
		}
	}
)

const Button = ({
	className,
	intent,
	size,
	fullWidth,
	rounded,
	onClick,
	leadingIcon: LeadingIcon,
	trailingIcon: TrailingIcon,
	children,
	...props
}) => {
	return (
		<button
			type="button"
			className={variants({
				className,
				intent,
				size,
				fullWidth,
				rounded,
				hasLeadingIcon: !!LeadingIcon,
				hasTrailingIcon: !!TrailingIcon
			})}
			onClick={onClick}
			{...props}
		>
			{LeadingIcon && <LeadingIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />}
			{children}
			{TrailingIcon && <TrailingIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />}
		</button>
	)
}

Button.propTypes = {
	className: PropTypes.string,
	intent: PropTypes.oneOf(['primary', 'secondary', 'warning', 'danger']),
	size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
	fullWidth: PropTypes.bool,
	rounded: PropTypes.bool,
	/**
	 * Icon on the left side of children, must be a React component
	 * @example Icon(React component), do not pass in <Icon />
	 */
	leadingIcon: PropTypes.object,
	/**
	 * Icon on the right side of children, must be a React component
	 * @example Icon(React component), do not pass in <Icon />
	 */
	trailingIcon: PropTypes.object,
	onClick: PropTypes.func,
	children: PropTypes.node
}

Button.defaultProps = {
	intent: 'primary',
	size: 'md'
}

export default Button
