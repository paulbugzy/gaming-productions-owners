import Client from 'clients/base/Client'
import { useCore } from 'contexts/core-context'
import { useGlobal } from 'contexts/global-context'
import { Form, Formik } from 'formik'
import {
	Button,
	FormActionButtons,
	FormCol,
	FormContainer,
	FormGrid,
	FormikText
} from 'ui-toolkit-tailwind/src/components'
import { showToast } from 'utilities/showToast'
import * as yup from 'yup'

const EditProfileChangePassword = () => {
	const { user } = useCore()
	const { setShowSpinner } = useGlobal()

	const handleSubmit = ({ currentPassword, newPassword }, { setErrors, resetForm }) => {
		const request = {
			id: user.id,
			currentPassword,
			newPassword
		}

		Client.OwnerApi.updatePassword(
			request,
			{
				status200: () => {
					showToast({
						intent: 'success',
						title: 'Change Password',
						content: 'Success!'
					})
					resetForm()
				},
				status409: () => {
					setErrors({ currentPassword: 'Incorrect Password' })
				}
			},
			{
				onApiCall: () => setShowSpinner(true),
				onApiResponse: () => setShowSpinner(false)
			}
		)
	}

	return (
		<Formik
			initialValues={{
				currentPassword: '',
				newPassword: '',
				confirmPassword: ''
			}}
			validationSchema={yup.object({
				currentPassword: yup.string().required(),
				newPassword: yup.string().required(),
				confirmPassword: yup
					.string()
					.oneOf([yup.ref('newPassword'), null], 'Passwords must match')
					.required()
			})}
			enableReinitialize
			onSubmit={handleSubmit}
		>
			<Form>
				<FormContainer>
					<FormGrid>
						<FormCol span={3}>
							<FormikText
								name="currentPassword"
								type="password"
								autoComplete="current-password"
								label="Current Password"
							/>
						</FormCol>
					</FormGrid>
					<FormGrid>
						<FormCol span={3}>
							<FormikText
								name="newPassword"
								type="password"
								autoComplete="new-password"
								label="New Password"
							/>
						</FormCol>
						<FormCol span={3}>
							<FormikText
								name="confirmPassword"
								type="password"
								autoComplete="new-password"
								label="Confirm Password"
							/>
						</FormCol>
					</FormGrid>

					<FormActionButtons>
						<Button type="submit" intent="primary">
							Update
						</Button>
					</FormActionButtons>
				</FormContainer>
			</Form>
		</Formik>
	)
}

export default EditProfileChangePassword
