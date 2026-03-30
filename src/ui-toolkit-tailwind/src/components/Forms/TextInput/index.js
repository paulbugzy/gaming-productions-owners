import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { cva, cx } from 'class-variance-authority'
import PropTypes from 'prop-types'
import { useId } from 'react'

const variants = cva(
	/* base style */
	'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6',
	{
		variants: {
			invalid: {
				true: 'pr-9 !text-danger-900 !ring-danger-300 placeholder:!text-danger-300 focus:!ring-danger-500'
			},
			pill: {
				true: '!rounded-full px-4'
			}
		},
		compoundVariants: [
			{
				invalid: true,
				type: 'date',
				className: '!pr-1.5'
			}
		],
		defaultVariants: {}
	}
)

const leadingAddonContainerVariants = cva(
	'flex relative rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600 sm:max-w-md',
	{
		variants: {
			invalid: {
				true: 'pr-9 !text-danger-900 !ring-danger-300 placeholder:!text-danger-300 focus:!ring-danger-500 focus-within:!ring-danger-500'
			},
			disabled: {
				true: 'cursor-not-allowed bg-gray-50 text-gray-500 ring-gray-200'
			},
			pill: 'rounded-full'
		},
		compoundVariants: [
			{
				invalid: true,
				type: 'date',
				className: '!pr-1.5'
			}
		],
		defaultVariants: {}
	}
)

const leadingAddonVariants = cva('', {
	variants: {
		isString: {
			true: 'flex items-center pl-3 text-gray-500 select-none sm:text-sm'
		},
		isIcon: {
			true: 'flex items-center pl-3 pr-1 text-gray-400 select-none sm:text-sm'
		}
	},
	compoundVariants: [
		{
			isIcon: true,
			invalid: true,
			className: '!text-danger-300'
		},
		{
			isString: true,
			invalid: true,
			className: '!text-danger-300'
		}
	]
})

const leadingAddonInputVariants = cva(
	'block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6',
	{
		variants: {
			invalid: {
				true: '!text-danger-900 placeholder:!text-danger-300'
			}
		}
	}
)

const TextInput = ({
	className,
	name,
	label,
	type,
	helperText,
	cornerHint,
	disabled,
	invalid,
	errorMessage,
	leadingAddon,
	leadingIcon: LeadingIcon,
	pill,
	...props
}) => {
	const randomId = useId()
	const descriptionId = `${name || randomId}-description`

	const hasLabel = !!label
	const hasError = invalid && errorMessage
	const showShadowContainer = invalid

	return (
		<div className="w-full">
			{hasLabel && (
				<div className={cx('flex justify-between', pill && 'px-4')}>
					<label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
						{label}
					</label>
					{cornerHint && (
						<span className="text-sm leading-6 text-gray-500" id={descriptionId}>
							{cornerHint}
						</span>
					)}
				</div>
			)}

			{leadingAddon || LeadingIcon ? (
				// Input with Addon
				<div className={cx(hasLabel && 'mt-2')}>
					<div
						className={leadingAddonContainerVariants({ className, type, invalid, disabled, pill })}
					>
						<span
							className={leadingAddonVariants({
								invalid,
								isString: !!leadingAddon,
								isIcon: !!LeadingIcon
							})}
						>
							{leadingAddon}
							{LeadingIcon && <LeadingIcon className="w-5 h-5" aria-hidden="true" />}
						</span>
						<input
							type={type}
							name={name}
							id={name}
							className={leadingAddonInputVariants({ invalid })}
							disabled={disabled}
							{...props}
							aria-invalid={invalid}
							aria-describedby={descriptionId}
						/>

						{invalid && type !== 'date' && (
							<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
								<ExclamationCircleIcon className="w-5 h-5 text-danger-500" aria-hidden="true" />
							</div>
						)}
					</div>
				</div>
			) : (
				// basic input
				<div
					className={cx(
						'relative rounded-md',
						hasLabel && 'mt-2',
						showShadowContainer && 'shadow-sm'
					)}
				>
					<input
						type={type}
						name={name}
						id={name}
						className={variants({ className, type, invalid, pill })}
						disabled={disabled}
						{...props}
						aria-invalid={invalid}
						aria-describedby={descriptionId}
					/>

					{invalid && type !== 'date' && (
						<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
							<ExclamationCircleIcon className="w-5 h-5 text-danger-500" aria-hidden="true" />
						</div>
					)}
				</div>
			)}

			{/* hide helper text when there's error message */}
			{helperText && !hasError && (
				<p className={cx('mt-2 text-sm text-gray-500', pill && 'px-4')} id={descriptionId}>
					{helperText}
				</p>
			)}

			{hasError && (
				<p className={cx('mt-2 text-sm text-danger-600', pill && 'px-4')} id={descriptionId}>
					{errorMessage}
				</p>
			)}
		</div>
	)
}

TextInput.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.node,
	type: PropTypes.string,
	helperText: PropTypes.string,
	cornerHint: PropTypes.string,
	disabled: PropTypes.bool,
	invalid: PropTypes.bool,
	errorMessage: PropTypes.string,
	leadingAddon: PropTypes.string,
	leadingIcon: PropTypes.object,
	pill: PropTypes.bool
}

TextInput.defaultProps = {
	type: 'text'
}

export default TextInput
