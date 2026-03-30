import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

const variants = cva(
	/* base style */
	'',
	{
		variants: {},
		defaultVariants: {}
	}
)

const Component = ({ className, ...props }) => {
	return <div className={variants({ className })} {...props} />
}

Component.propTypes = {
	className: PropTypes.string
}

Component.defaultProps = {}

export default Component
