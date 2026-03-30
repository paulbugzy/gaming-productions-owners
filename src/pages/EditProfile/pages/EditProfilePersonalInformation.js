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
	FormikCheckbox,
	FormikText
} from 'ui-toolkit-tailwind/src/components'
import { showToast } from 'utilities/showToast'
import * as yup from 'yup'

const EditProfilePersonalInformation = () => {
	const { user, refreshSession, executeLogout } = useCore()
	const { setShowSpinner } = useGlobal()

	const handleSubmit = (values, { setErrors }) => {
		const request = {
			id: user.id,
			...values
		}

		Client.OwnerApi.updateProfile(
			request,
			{
				status200: () => {
					showToast({
						intent: 'success',
						title: 'Update Personal Information',
						content: 'Success!'
					})
					refreshSession()
				},
				status403: () => {
					showToast({
						intent: 'error',
						title: 'Update Personal Information',
						content: 'Not Authorized'
					})
					executeLogout()
				},
				status409: () => {
					setErrors({ email: 'Email already exists' })
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
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				ownerReceivesEmailReportsFlag: user.ownerReceivesEmailReportsFlag
			}}
			validationSchema={yup.object({
				email: yup.string().email().required(),
				firstName: yup.string().required(),
				lastName: yup.string().required()
			})}
			enableReinitialize
			onSubmit={handleSubmit}
		>
			<Form>
				<FormContainer>
					<FormGrid>
						<FormCol span={3}>
							<FormikText name="email" label="Email Address" />
						</FormCol>
					</FormGrid>

					<FormGrid>
						<FormCol span={3}>
							<FormikText name="firstName" label="First Name" />
						</FormCol>
						<FormCol span={3}>
							<FormikText name="lastName" label="Last Name" />
						</FormCol>
					</FormGrid>

					<FormGrid>
						<FormCol>
							<FormikCheckbox
								name="ownerReceivesEmailReportsFlag"
								label="Receive Daily Email Report?"
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

export default EditProfilePersonalInformation
