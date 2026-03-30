import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

const variants = cva(
	/* base style */
	'overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6',
	{
		variants: {},
		defaultVariants: {}
	}
)

const Card = ({ className, children }) => {
	return <div className={variants({ className })}>{children}</div>
}

Card.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node
}

Card.defaultProps = {}

export default Card
