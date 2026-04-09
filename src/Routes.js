import { useCore } from 'contexts/core-context'
import { MainLayout, PatternBackgroundLayout } from 'layout'
import ProtectedSample from 'pages/_ProtectedSample'
import Sample from 'pages/_Sample'
import ChangePassword from 'pages/ChangePassword'
import Dashboard from 'pages/Dashboard'
import EditProfile from 'pages/EditProfile'
import EditProfileChangePassword from 'pages/EditProfile/pages/EditProfileChangePassword'
import EditProfilePersonalInformation from 'pages/EditProfile/pages/EditProfilePersonalInformation'
import ForgotPassword from 'pages/ForgotPassword'
import InvalidToken from 'pages/InvalidToken'
import Login from 'pages/Login'
import ManageLocations from 'pages/ManageLocations'
import PageNotFound from 'pages/PageNotFound'
import Registration from 'pages/Registration'
import RequestRegistration from 'pages/RequestRegistration'
import PropTypes from 'prop-types'
import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

export const pages = {
	invalidToken: {
		name: 'Invalid Token',
		path: '/invalid_token'
	},
	login: {
		name: 'Login',
		path: '/login'
	},
	dashboard: {
		name: 'Dashboard',
		path: '/dashboard'
	},
	manageLocations: {
		name: 'Manage Locations',
		path: '/manage_locations'
	},
	editProfile: {
		name: 'Edit Profile',
		path: '/edit_profile',
		children: {
			personalInformation: {
				name: 'Personal Information',
				path: 'personal_information'
			},
			changePassword: {
				name: 'Change Password',
				path: 'change_password'
			}
		}
	},
	requestRegistration: {
		name: 'Owner Registration',
		path: '/registration'
	},
	register: {
		name: 'New User Registration',
		path: '/registration/:id/:hash/:checksum'
	},
	forgotPassword: {
		name: 'Forgot Password',
		path: '/forgot_password'
	},
	changePassword: {
		name: 'Change Password',
		path: '/forgot_password/:id/:hash/:checksum'
	}
}

/**
 * react-router-dom v6.4
 * @see https://reactrouter.com/en/main
 */
const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to={pages.dashboard.path} replace />} />
			<Route element={<PatternBackgroundLayout />}>
				<Route path={pages.login.path} element={<Login />} />
				<Route path={pages.forgotPassword.path} element={<ForgotPassword />} />
				<Route path={pages.changePassword.path} element={<ChangePassword />} />
				<Route path={pages.requestRegistration.path} element={<RequestRegistration />} />
				<Route path={pages.register.path} element={<Registration />} />
				<Route path={pages.invalidToken.path} element={<InvalidToken />} />
				<Route path="*" element={<PageNotFound />} />
			</Route>

			<Route element={<MainLayout />}>
				<Route
					path={pages.dashboard.path}
					element={
						<AuthRoute>
							<Dashboard />
						</AuthRoute>
					}
				/>
				<Route
					path={pages.manageLocations.path}
					element={
						<AuthRoute requireLocationManager>
							<ManageLocations />
						</AuthRoute>
					}
				/>
				<Route
					path={pages.editProfile.path}
					element={
						<AuthRoute>
							<EditProfile />
						</AuthRoute>
					}
				>
					{/* set default route */}
					<Route
						index
						element={<Navigate to={pages.editProfile.children.personalInformation.path} replace />}
					/>
					<Route
						path={pages.editProfile.children.personalInformation.path}
						element={<EditProfilePersonalInformation />}
					/>
					<Route
						path={pages.editProfile.children.changePassword.path}
						element={<EditProfileChangePassword />}
					/>
				</Route>

				{/* <Route path="/sample/:id" element={<Sample />} /> */}

				{/* Sample Protected Route */}
				{/* <Route
					path="/protected"
					element={
						<AuthRoute>
							<ProtectedSample />
						</AuthRoute>
					}
				/> */}
			</Route>
		</Routes>
	)
}

// auth-required routes wrapper
const AuthRoute = ({ children, requireLocationManager }) => {
	const { isLoggedIn, user } = useCore()
	const location = useLocation()
	if (!isLoggedIn) {
		return <Navigate to={pages.login.path} state={{ from: location }} replace />
	}
	if (requireLocationManager && !user?.canManageLocations) {
		return <Navigate to={pages.dashboard.path} replace />
	}
	return children
}

AuthRoute.propTypes = {
	children: PropTypes.node,
	requireLocationManager: PropTypes.bool
}

export default AppRoutes
