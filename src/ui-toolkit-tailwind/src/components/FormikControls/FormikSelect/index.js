import { Field, useField } from 'formik'
import PropTypes from 'prop-types'

import Select from '../../Forms/Select'

const FormikSelect = props => {
	const [field, meta, helpers] = useField(props)
	const { error, touched } = meta
	const hasError = error && touched

	return <Field as={Select} {...props} invalid={hasError} errorMessage={error} />
}

FormikSelect.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.node,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.any,
			label: PropTypes.string
		})
	),
	placeholder: PropTypes.string,
	disabled: PropTypes.bool
}

FormikSelect.defaultProps = {}

export default FormikSelect
