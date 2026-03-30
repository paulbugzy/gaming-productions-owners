import { Field, useField } from 'formik'
import PropTypes from 'prop-types'

import TextInput from '../../Forms/TextInput'

const FormikText = props => {
	const [field, meta, helpers] = useField(props)
	const { error, touched } = meta
	const hasError = error && touched

	return <Field as={TextInput} {...props} invalid={hasError} errorMessage={error} />
}

FormikText.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.node,
	type: PropTypes.string,
	helperText: PropTypes.string,
	cornerHint: PropTypes.string,
	disabled: PropTypes.bool,
	leadingAddon: PropTypes.string,
	leadingIcon: PropTypes.object,
	pill: PropTypes.bool
}

FormikText.defaultProps = {}

export default FormikText
