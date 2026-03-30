import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import Client from 'clients/base/Client'
import { useGlobal } from 'contexts/global-context'
import { Form, Formik } from 'formik'
import LogoContainer from 'layout/LogoContainer'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { pages } from 'Routes'
import { Button, FormikText } from 'ui-toolkit-tailwind/src/components'
import * as yup from 'yup'

const ForgotPassword = () => {
	const navigate = useNavigate()
	const { setShowSpinner } = useGlobal()
	const [isResetSuccess, setIsResetSuccess] = useState(false)

	const handleSubmit = ({ email }) => {
		Client.OwnerApi.forgotPassword(
			{ email },
			{
				status200: () => setIsResetSuccess(true)
			},
			{
				onApiCall: () => setShowSpinner(true),
				onApiResponse: () => setShowSpinner(false)
			}
		)
	}

	return (
		<LogoContainer title="Forgot Password">
			{!isResetSuccess ? (
				<Formik
					initialValues={{ email: '' }}
					validationSchema={yup.object({
						email: yup.string().email('Invalid email').required()
					})}
					onSubmit={handleSubmit}
				>
					<Form className="space-y-6">
						<FormikText name="email" type="email" label="Email Address" />

						<Button type="submit" fullWidth>
							Reset My Password
						</Button>
					</Form>
				</Formik>
			) : (
				<p className="font-light text-gray-800">
					If there is a GMP account on file with the email you entered, an email will be sent to
					that address with instructions on how to proceed with the Password Reset.
				</p>
			)}

			{!isResetSuccess ? (
				<button
					onClick={() => navigate(pages.login.path)}
					className="!mt-3 text-sm cursor-pointer text-gray-500 hover:text-gray-700 focus:ring-0"
				>
					<div className="flex items-center">
						<ArrowRightOnRectangleIcon className="w-5 h-5 mr-1" />
						Back to Login
					</div>
				</button>
			) : (
				<Button className="!mt-3 float-right" onClick={() => navigate(pages.login.path)}>
					Back to Login
				</Button>
			)}
		</LogoContainer>
	)
}

export default ForgotPassword
