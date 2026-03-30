import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

const variants = cva(
	/* base style */
	'rounded-full p-1 shadow-sm',
	{
		variants: {
			intent: {
				primary:
					'bg-primary-600 text-white hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
				secondary:
					'bg-secondary-600 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
				warning:
					'bg-warning-600 text-white hover:bg-warning-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning-600',
				danger:
					'bg-danger-600 text-white hover:bg-danger-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger-600'
			},
			size: {
				sm: 'p-1',
				md: 'p-1.5',
				lg: 'p-2',
			}
		},
		defaultVariants: {
			intent: 'primary',
			size: 'md'
		}
	}
)

const CircularButton = ({
	className,
	intent,
	size,
	color,
	backgroundColor,
	icon: Icon,
	onClick,
	style,
	...props
}) => {
	return (
		<button
			type="button"
			className={variants({ className, intent, size, })}
			onClick={onClick}
			style={{ color, backgroundColor, ...style }}
			{...props}
		>
			<Icon className="w-5 h-5" aria-hidden="true" />
		</button>
	)
}

CircularButton.propTypes = {
	className: PropTypes.string,
	intent: PropTypes.oneOf(['primary', 'secondary', 'warning', 'danger']),
	color: PropTypes.string,
	backgroundColor: PropTypes.string,
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
	/**
	 *  Icon(React component), do not pass in <Icon />
	 */
	icon: PropTypes.object,
	onClick: PropTypes.func,
	style: PropTypes.object
}

CircularButton.defaultProps = {
	intent: 'primary',
	size: 'md',
}

export default CircularButton
