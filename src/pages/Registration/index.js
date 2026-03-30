import Client from 'clients/base/Client'
import { useCore } from 'contexts/core-context'
import { useGlobal } from 'contexts/global-context'
import { Form, Formik } from 'formik'
import useEffectOnce from 'hooks/useEffectOnce'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { pages } from 'Routes'
import {
	Button,
	FormCol,
	FormContainer,
	FormGrid,
	FormikCheckbox,
	FormikText,
	FormSection
} from 'ui-toolkit-tailwind/src/components'
import { showToast } from 'utilities/showToast'
import * as yup from 'yup'

const defaultValues = {
	email: '',
	firstName: '',
	lastName: '',
	ownerReceivesEmailReportsFlag: true,
	password: '',
	confirmPassword: ''
}

const Registration = () => {
	const navigate = useNavigate()
	const { setShowSpinner } = useGlobal()
	const { updateSession, user } = useCore()
	// route params
	const { id, hash, checksum } = useParams()

	const [isUpdateProfileApiFetching, setIsUpdateProfileApiFetching] = useState(false)
	const [updateProfileSuccess, setUpdateProfileSuccess] = useState(false)
	const [isUpdatePasswordApiFetching, setIsUpdatePasswordApiFetching] = useState(false)
	const [updatePasswordSuccess, setUpdatePasswordSuccess] = useState(false)

	const validationSchema = yup.object({
		firstName: yup.string().required(),
		lastName: yup.string().required(),
		password: yup.string().required(),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Passwords must match')
			.required()
	})

	useEffectOnce(() => {
		if (id && hash && checksum) {
			Client.OwnerApi.createSessionForAlternativeLoginWorkflow(
				id,
				hash,
				checksum,
				{
					status200: session => updateSession(session),
					status404: () => navigate(pages.invalidToken.path, { replace: true })
				},
				{
					onApiCall: () => setShowSpinner(true),
					onApiResponse: () => setShowSpinner(false)
				}
			)
		}
	}, [id, hash, checksum, updateSession, navigate, setShowSpinner])

	// show spinner
	useEffect(() => {
		if (isUpdatePasswordApiFetching || isUpdateProfileApiFetching) setShowSpinner(true)
		else setShowSpinner(false)
	}, [isUpdatePasswordApiFetching, isUpdateProfileApiFetching, setShowSpinner])

	useEffect(() => {
		if (updatePasswordSuccess && updateProfileSuccess) {
			showToast({ intent: 'success', title: 'Registration', content: 'Success!' })
			navigate(pages.login.path, { replace: true })
		}
	}, [updateProfileSuccess, updatePasswordSuccess, navigate])

	const handleSubmit = (values, { setErrors }) => {
		const { email, firstName, lastName, ownerReceivesEmailReportsFlag, password } = values
		const profileRequest = {
			id: user.id,
			firstName,
			lastName,
			ownerReceivesEmailReportsFlag,
			email
		}

		const passwordRequest = {
			newPassword: password
		}

		Client.OwnerApi.updateProfile(
			profileRequest,
			{
				status200: () => setUpdateProfileSuccess(true),
				status403: () => {
					showToast({ intent: 'error', title: 'Registration', content: 'Not authorized' })
					navigate(pages.login.path, { replace: true })
				},
				status409: () => setErrors({ email: 'Email is already used' })
			},
			{
				onApiCall: () => setIsUpdateProfileApiFetching(true),
				onApiResponse: () => setIsUpdateProfileApiFetching(false)
			}
		)

		Client.OwnerApi.updatePassword(
			passwordRequest,
			{
				status200: () => setUpdatePasswordSuccess(true)
			},
			{
				onApiCall: () => setIsUpdatePasswordApiFetching(true),
				onApiResponse: () => setIsUpdatePasswordApiFetching(false)
			}
		)
	}

	return (
		<div className="px-6 py-24 isolate sm:py-32 lg:px-8">
			<div className="max-w-2xl mx-auto text-center">
				<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					New User Registration
				</h2>
			</div>

			<Formik
				initialValues={{
					...defaultValues,
					email: user?.email,
					firstName: user?.firstName,
					lastName: user?.lastName
				}}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
				enableReinitialize
			>
				<Form className="max-w-xl mx-auto mt-16 sm:mt-20">
					<FormContainer>
						<FormGrid>
							<FormCol span={3}>
								<FormikText name="email" label="Email Address" disabled />
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

						<FormSection description="Set the password for your GMP Gaming Account">
							<FormGrid>
								<FormCol>
									<FormikText name="password" type="password" label="Password" />
								</FormCol>
							</FormGrid>
							<FormGrid>
								<FormCol>
									<FormikText name="confirmPassword" type="password" label="Confirm Password" />
								</FormCol>
							</FormGrid>
						</FormSection>

						<Button type="submit" fullWidth className="!mt-3">
							Register
						</Button>
					</FormContainer>
				</Form>
			</Formik>
		</div>
	)
}

export default Registration
