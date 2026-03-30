import { setLocale } from 'yup'

/**
 * Setup global yup validation error messages
 * @see https://github.com/jquense/yup#error-message-customization
 */

setLocale({
	mixed: {
		required: 'Required'
	}
})
