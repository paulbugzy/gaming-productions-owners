import { cva, cx } from 'class-variance-authority'
import PropTypes from 'prop-types'

const variants = cva(
	/* base style */
	'',
	{
		variants: {},
		defaultVariants: {}
	}
)

const Spinner = ({ visible }) => {
	return (
		<div
			className={cx('fixed inset-0 z-50 flex items-center justify-center', {
				hidden: !visible
			})}
		>
			<div className="absolute inset-0 bg-gray-200 opacity-75" />
			<svg
				className="w-8 h-8 text-primary-600 animate-spin"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle
					className="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					strokeWidth="4"
				/>
				<path
					className="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
		</div>
	)
}

Spinner.propTypes = {
	visible: PropTypes.bool
}

Spinner.defaultProps = {}

export default Spinner
