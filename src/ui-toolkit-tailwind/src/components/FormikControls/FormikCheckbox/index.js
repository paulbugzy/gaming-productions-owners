import { Field, useField } from 'formik'
import PropTypes from 'prop-types'

import Checkbox from '../../Forms/Checkbox'

const FormikCheckbox = props => {
	const [field, meta, helpers] = useField(props)
	const { error, touched } = meta
	const hasError = error && touched

	return <Field as={Checkbox} {...props} invalid={hasError} errorMessage={error} />
}

FormikCheckbox.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.node,
	helperText: PropTypes.string,
	disabled: PropTypes.bool
}

FormikCheckbox.defaultProps = {}

export default FormikCheckbox
