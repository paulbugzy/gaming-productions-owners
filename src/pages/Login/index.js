import Client from 'clients/base/Client'
import { useCore } from 'contexts/core-context'
import { useGlobal } from 'contexts/global-context'
import { Form, Formik } from 'formik'
import useLocalStorage, { LOCAL_STORAGE_KEY } from 'hooks/useLocalStorage'
import LogoContainer from 'layout/LogoContainer'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { pages } from 'Routes'
import { Button, Checkbox, FormikText } from 'ui-toolkit-tailwind/src/components'
import * as yup from 'yup'

const Login = () => {
	const navigate = useNavigate()
	const { state } = useLocation()
	const { updateSession } = useCore()
	const { setShowSpinner } = useGlobal()
	const [storedEmail, setStoredEmail, resetStoredEmail] = useLocalStorage(
		LOCAL_STORAGE_KEY.storedEmail
	)

	// redirected to login page from which path
	const from = state?.from?.pathname

	const [rememberMe, setRememberMe] = useState(!!storedEmail)

	const handleLoginSubmit = ({ email, password }, { setErrors }) => {
		const request = { email, password }
		Client.AuthenticationApi.ownerLogin(
			request,
			{
				status200: session => {
					// TODO: test
					// update stored email
					if (rememberMe) setStoredEmail(email)
					else resetStoredEmail()

					updateSession(session)
					navigate(from || pages.dashboard.path, { replace: true })
				},
				status404: () => {
					setErrors({
						email: ' ',
						password: 'You have entered an invalid username or password'
					})
				}
			},
			{
				onApiCall: () => setShowSpinner(true),
				onApiResponse: () => setShowSpinner(false)
			}
		)
	}

	return (
		<LogoContainer title="Owner Login">
			<Formik
				initialValues={{
					email: '',
					password: ''
				}}
				validationSchema={yup.object({
					email: yup.string().email('Invalid email').required(),
					password: yup.string().required()
				})}
				onSubmit={handleLoginSubmit}
			>
				<Form className="space-y-6">
					<FormikText
						name="email"
						id="email"
						type="email"
						autoComplete="username"
						label="Email Address"
					/>
					<FormikText
						name="password"
						id="password"
						type="password"
						autoComplete="current-password"
						label="Password"
						cornerHint={
							<button
								type="button"
								onClick={() => navigate(pages.forgotPassword.path)}
								className="font-semibold cursor-pointer text-primary-600 hover:text-primary-500 focus:ring-0"
							>
								Forgot password?
							</button>
						}
					/>

					<Checkbox
						name="rememberMe"
						className="!mt-3"
						label="Remember Me"
						checked={rememberMe}
						onChange={e => setRememberMe(e.target.checked)}
					/>

					<Button type="submit" fullWidth>
						Sign in
					</Button>
				</Form>
			</Formik>

			<p className="mt-10 text-sm text-center text-gray-500">
				First time?{' '}
				<Link
					to={pages.requestRegistration.path}
					className="font-semibold leading-6 text-primary-600 hover:text-primary-500"
				>
					Click here to register
				</Link>
			</p>
		</LogoContainer>
	)
}

export default Login
