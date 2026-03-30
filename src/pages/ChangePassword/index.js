import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import Client from 'clients/base/Client'
import { useCore } from 'contexts/core-context'
import { useGlobal } from 'contexts/global-context'
import { Form, Formik } from 'formik'
import useEffectOnce from 'hooks/useEffectOnce'
import LogoContainer from 'layout/LogoContainer'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { pages } from 'Routes'
import { Button, FormikText } from 'ui-toolkit-tailwind/src/components'
import { showToast } from 'utilities/showToast'
import * as yup from 'yup'

const ChangePassword = () => {
	const navigate = useNavigate()
	const { setShowSpinner } = useGlobal()
	const { updateSession } = useCore()
	// route params
	const { id, hash, checksum } = useParams()

	const validationSchema = yup.object({
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

	const handleSubmit = ({ password }) => {
		Client.OwnerApi.updatePassword(
			{
				newPassword: password
			},
			{
				status200: () => {
					showToast({ intent: 'success', title: 'Change Password', content: 'Success!' })
					navigate(pages.login.path, { replace: true })
				}
			},
			{
				onApiCall: () => setShowSpinner(true),
				onApiResponse: () => setShowSpinner(false)
			}
		)
	}

	return (
		<LogoContainer title="Change Password">
			<Formik
				initialValues={{
					password: '',
					confirmPassword: ''
				}}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				<Form className="space-y-6">
					<FormikText label="New Password" name="password" type="password" id="password" />
					<FormikText
						label="Confirm Password"
						name="confirmPassword"
						type="password"
						id="confirmPassword"
					/>
					<Button type="submit" fullWidth>
						Update Password
					</Button>
				</Form>
			</Formik>

			<button
				onClick={() => navigate(pages.login.path)}
				className="!mt-3 text-sm cursor-pointer text-gray-500 hover:text-gray-700 focus:ring-0"
			>
				<div className="flex items-center">
					<ArrowRightOnRectangleIcon className="w-5 h-5 mr-1" />
					Back to Login
				</div>
			</button>
		</LogoContainer>
	)
}

export default ChangePassword
