import { Field, useField } from 'formik'
import PropTypes from 'prop-types'

import RadioGroup from '../../Forms/RadioGroup'

const FormikRadioGroup = props => {
	const [field, meta, helpers] = useField(props)
	const { error, touched } = meta
	const hasError = error && touched

	return <Field as={RadioGroup} {...props} invalid={hasError} errorMessage={error} />
}

FormikRadioGroup.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.node,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.any,
			label: PropTypes.string
		})
	),
	helperText: PropTypes.string,
	inline: PropTypes.bool,
	disabled: PropTypes.bool
}

FormikRadioGroup.defaultProps = {}

export default FormikRadioGroup
