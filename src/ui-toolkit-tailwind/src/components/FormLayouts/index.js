import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

const colVariants = cva(
	/* base style */
	'',
	{
		variants: {
			span: {
				1: 'sm:col-span-1',
				2: 'sm:col-span-2',
				3: 'sm:col-span-3',
				4: 'sm:col-span-4',
				5: 'sm:col-span-5',
				6: 'col-span-full'
			}
		},
		defaultVariants: {
			span: 6
		}
	}
)

export const Container = ({ children }) => <div className="space-y-12">{children}</div>
Container.propTypes = {
	children: PropTypes.node
}

export const Section = ({ title, description, children }) => (
	<div className="pb-12">
		{title && <h2 className="text-base font-semibold leading-7 text-gray-900">{title}</h2>}
		{description && <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>}
		{children}
	</div>
)
Section.propTypes = {
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	children: PropTypes.node
}

export const Grid = ({ children }) => (
	<div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">{children}</div>
)
Grid.propTypes = {
	children: PropTypes.node
}

export const Col = ({ className, span, children }) => (
	<div className={colVariants({ className, span })}>{children}</div>
)
Col.propTypes = {
	className: PropTypes.string,
	/**
	 * span of the col - max = 6, default 6
	 */
	span: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
	children: PropTypes.node
}

export const ActionButtons = ({ children }) => (
	<div className="flex items-center justify-end pt-6 pb-12 border-t gap-x-6 border-gray-900/10">
		{children}
	</div>
)
ActionButtons.propTypes = {
	children: PropTypes.node
}
