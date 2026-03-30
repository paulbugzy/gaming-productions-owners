import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

import { ReactComponent as AvatarPlaceHolderSvg } from './avatar.svg'

const imgVariants = cva(
	/* base style */
	'inline-block rounded-full',
	{
		variants: {
			size: {
				xs: 'h-6 w-6',
				sm: 'h-8 w-8',
				md: 'h-10 w-10',
				lg: 'h-12 w-12',
				xl: 'h-14 w-14'
			}
		},
		defaultVariants: {
			size: 'md'
		}
	}
)

const nameContainerVariants = cva(
	/* base style */
	'inline-flex items-center justify-center rounded-full bg-gray-500',
	{
		variants: {
			size: {
				xs: 'h-6 w-6',
				sm: 'h-8 w-8',
				md: 'h-10 w-10',
				lg: 'h-12 w-12',
				xl: 'h-14 w-14'
			}
		},
		defaultVariants: {
			size: 'md'
		}
	}
)

const nameLabelVariants = cva(
	/* base style */
	'font-medium leading-none text-white',
	{
		variants: {
			size: {
				xs: 'text-xs',
				sm: 'text-sm',
				md: '',
				lg: 'text-lg',
				xl: 'text-xl'
			}
		},
		defaultVariants: {
			size: 'md'
		}
	}
)

const placeHolderVariants = cva(
	/* base style */
	'inline-block overflow-hidden rounded-full bg-gray-100',
	{
		variants: {
			size: {
				xs: 'h-6 w-6',
				sm: 'h-8 w-8',
				md: 'h-10 w-10',
				lg: 'h-12 w-12',
				xl: 'h-14 w-14'
			}
		},
		defaultVariants: {
			size: 'md'
		}
	}
)

const Avatar = ({ className, size = 'md', src, name }) => {
	if (src) {
		return <img className={imgVariants({ size })} src={src} alt="avatar" />
	}

	if (name) {
		const placeHolderInitial = name
			.split(' ')
			.reduce((acc, cur) => acc + cur.charAt(0), '')
			.slice(0, 2)

		return (
			<span className={nameContainerVariants({ size, className })}>
				<span className={nameLabelVariants({ size })}>{placeHolderInitial}</span>
			</span>
		)
	}

	return (
		<span className={placeHolderVariants({ size })}>
			<AvatarPlaceHolderSvg />
		</span>
	)
}

Avatar.propTypes = {
	className: PropTypes.string,
	size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
	src: PropTypes.string,
	name: PropTypes.string
}

Avatar.defaultProps = {
	size: 'md'
}

export default Avatar
