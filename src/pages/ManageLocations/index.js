import Client from 'clients/base/Client'
import { useCore } from 'contexts/core-context'
import { useGlobal } from 'contexts/global-context'
import { Field, Form, Formik, useField } from 'formik'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import {
	Button,
	FormActionButtons,
	FormCol,
	FormContainer,
	FormGrid,
	FormikText,
	FormSection,
	Table
} from 'ui-toolkit-tailwind/src/components'
import { displayDate } from 'utilities/helpers'
import { showToast } from 'utilities/showToast'
import * as yup from 'yup'

const ownerEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const vgtFields = [
	{ name: 'vgt1', label: 'VGT 01' },
	{ name: 'vgt2', label: 'VGT 02' },
	{ name: 'vgt3', label: 'VGT 03' },
	{ name: 'vgt4', label: 'VGT 04' },
	{ name: 'vgt5', label: 'VGT 05' },
	{ name: 'vgt6', label: 'VGT 06' }
]

const parseOwnerEmails = value => {
	const values = String(value || '')
		.split(/[\n,;]/)
		.map(email => email.trim().toLowerCase())
		.filter(Boolean)

	const emails = []
	const seen = new Set()
	const invalid = []

	values.forEach(email => {
		if (!ownerEmailPattern.test(email)) {
			invalid.push(email)
			return
		}

		if (!seen.has(email)) {
			seen.add(email)
			emails.push(email)
		}
	})

	return { emails, invalid }
}

const locationSchema = yup.object({
	name: yup.string().trim().required('Location name is required'),
	licenseNumber: yup.string().nullable(),
	vgt1: yup.string().nullable(),
	vgt2: yup.string().nullable(),
	vgt3: yup.string().nullable(),
	vgt4: yup.string().nullable(),
	vgt5: yup.string().nullable(),
	vgt6: yup.string().nullable(),
	ownerEmailsText: yup.string().test(
		'owner-emails',
		'Enter valid owner email addresses separated by commas or new lines.',
		value => parseOwnerEmails(value).invalid.length === 0
	)
})

const defaultFormValues = {
	name: '',
	licenseNumber: '',
	vgt1: '',
	vgt2: '',
	vgt3: '',
	vgt4: '',
	vgt5: '',
	vgt6: '',
	ownerEmailsText: ''
}

const mapValidationErrors = errors =>
	Object.fromEntries(
		Object.entries(errors || {}).map(([field, messages]) => [
			field.startsWith('ownerEmails') ? 'ownerEmailsText' : field,
			messages?.[0] || 'Invalid value'
		])
	)

const buildLocationRequest = values => ({
	name: values.name,
	licenseNumber: values.licenseNumber,
	vgt1: values.vgt1,
	vgt2: values.vgt2,
	vgt3: values.vgt3,
	vgt4: values.vgt4,
	vgt5: values.vgt5,
	vgt6: values.vgt6,
	ownerEmails: parseOwnerEmails(values.ownerEmailsText).emails
})

const locationToFormValues = location => ({
	name: location?.name || '',
	licenseNumber: location?.licenseNumber || '',
	vgt1: location?.vgt1 || '',
	vgt2: location?.vgt2 || '',
	vgt3: location?.vgt3 || '',
	vgt4: location?.vgt4 || '',
	vgt5: location?.vgt5 || '',
	vgt6: location?.vgt6 || '',
	ownerEmailsText: (location?.ownerEmails || []).join('\n')
})

const FormikTextarea = ({ name, label, helperText, disabled }) => {
	const [field, meta] = useField(name)
	const hasError = meta.touched && meta.error

	return (
		<div className="space-y-2">
			{label ? <label className="block text-sm font-medium text-gray-900">{label}</label> : null}
			<Field
				as="textarea"
				rows={4}
				{...field}
				disabled={disabled}
				className={[
					'block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2',
					hasError
						? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500'
						: 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
					disabled ? 'cursor-not-allowed bg-gray-100 text-gray-500' : 'bg-white text-gray-900'
				].join(' ')}
			/>
			{hasError ? (
				<p className="text-sm text-danger-600">{meta.error}</p>
			) : helperText ? (
				<p className="text-sm text-gray-500">{helperText}</p>
			) : null}
		</div>
	)
}

FormikTextarea.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	helperText: PropTypes.string,
	disabled: PropTypes.bool
}

FormikTextarea.defaultProps = {
	label: null,
	helperText: null,
	disabled: false
}

const ManageLocations = () => {
	const { executeLogout } = useCore()
	const { setShowSpinner } = useGlobal()
	const [locations, setLocations] = useState([])
	const [selectedLocation, setSelectedLocation] = useState(null)

	const loadLocations = () => {
		Client.OwnerAdminApi.listLocations(
			{
				status200: responseLocations => {
					setLocations(responseLocations || [])
					setSelectedLocation(currentSelection => {
						if (!currentSelection) return null
						return responseLocations.find(location => location.id === currentSelection.id) || null
					})
				},
				status403: () => {
					showToast({
						intent: 'error',
						title: 'Manage Locations',
						content: 'Not authorized to manage locations.'
					})
					executeLogout()
				},
				error: error => {
					// eslint-disable-next-line no-console
					console.error(error)
					showToast({
						intent: 'error',
						title: 'Manage Locations',
						content: 'Unable to load locations.'
					})
				}
			},
			{
				onApiCall: () => setShowSpinner(true),
				onApiResponse: () => setShowSpinner(false)
			}
		)
	}

	useEffect(() => {
		loadLocations()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleCreate = (values, { resetForm, setErrors }) => {
		Client.OwnerAdminApi.createLocation(
			buildLocationRequest(values),
			{
				status201: () => {
					showToast({
						intent: 'success',
						title: 'Create Location',
						content: 'Location created successfully.'
					})
					resetForm()
					loadLocations()
				},
				status403: () => {
					showToast({
						intent: 'error',
						title: 'Create Location',
						content: 'Not authorized to manage locations.'
					})
					executeLogout()
				},
				status422: responseJson => {
					setErrors(mapValidationErrors(responseJson?.errors))
				},
				error: error => {
					// eslint-disable-next-line no-console
					console.error(error)
					showToast({
						intent: 'error',
						title: 'Create Location',
						content: 'Unable to create location.'
					})
				}
			},
			{
				onApiCall: () => setShowSpinner(true),
				onApiResponse: () => setShowSpinner(false)
			}
		)
	}

	const handleUpdate = (values, { setErrors }) => {
		if (!selectedLocation) return

		Client.OwnerAdminApi.updateLocation(
			selectedLocation.id,
			buildLocationRequest(values),
			{
				status200: () => {
					showToast({
						intent: 'success',
						title: 'Update Location',
						content: 'Location updated successfully.'
					})
					loadLocations()
				},
				status403: () => {
					showToast({
						intent: 'error',
						title: 'Update Location',
						content: 'Not authorized to manage locations.'
					})
					executeLogout()
				},
				status422: responseJson => {
					setErrors(mapValidationErrors(responseJson?.errors))
				},
				error: error => {
					// eslint-disable-next-line no-console
					console.error(error)
					showToast({
						intent: 'error',
						title: 'Update Location',
						content: 'Unable to update location.'
					})
				}
			},
			{
				onApiCall: () => setShowSpinner(true),
				onApiResponse: () => setShowSpinner(false)
			}
		)
	}

	const tableColumns = [
		{ label: 'Name', name: 'name' },
		{
			label: 'License Number',
			name: 'licenseNumber',
			formatter: value => value || '-'
		},
		{
			label: 'First Performance',
			name: 'dateFirstPerformance',
			formatter: value => (value ? displayDate(value) : '-')
		},
		{
			label: '',
			name: 'action',
			formatter: value => value
		}
	]

	const tableData = locations.map(location => ({
		...location,
		action: (
			<Button size="sm" intent="secondary" onClick={() => setSelectedLocation(location)}>
				Edit
			</Button>
		)
	}))

	return (
		<div className="space-y-12">
			<Formik
				initialValues={defaultFormValues}
				validationSchema={locationSchema}
				onSubmit={handleCreate}
			>
				<Form>
					<FormContainer>
						<FormSection
							title="Create Location"
							description="Add a new owners portal location, its VGT identifiers, and its location-specific owners."
						>
							<FormGrid>
								<FormCol span={3}>
									<FormikText name="name" label="Location Name" />
								</FormCol>
								<FormCol span={3}>
									<FormikText name="licenseNumber" label="License Number" />
								</FormCol>
								{vgtFields.map(field => (
									<FormCol span={2} key={field.name}>
										<FormikText name={field.name} label={field.label} />
									</FormCol>
								))}
								<FormCol span={6}>
									<FormikTextarea
										name="ownerEmailsText"
										label="Owner Emails"
										helperText="Enter one email per line or separate multiple emails with commas. Duplicates are removed automatically."
									/>
								</FormCol>
							</FormGrid>

							<FormActionButtons>
								<Button type="submit">Create Location</Button>
							</FormActionButtons>
						</FormSection>
					</FormContainer>
				</Form>
			</Formik>

			<Formik
				initialValues={locationToFormValues(selectedLocation)}
				validationSchema={locationSchema}
				enableReinitialize
				onSubmit={handleUpdate}
			>
				<Form>
					<FormContainer>
						<FormSection
							title="Edit Location"
							description={
								selectedLocation
									? `Updating ${selectedLocation.name}.`
									: 'Choose a location from the list below to edit its license, VGT values, and owner emails.'
							}
						>
							<FormGrid>
								<FormCol span={3}>
									<FormikText name="name" label="Location Name" disabled={!selectedLocation} />
								</FormCol>
								<FormCol span={3}>
									<FormikText
										name="licenseNumber"
										label="License Number"
										disabled={!selectedLocation}
									/>
								</FormCol>
								{vgtFields.map(field => (
									<FormCol span={2} key={field.name}>
										<FormikText
											name={field.name}
											label={field.label}
											disabled={!selectedLocation}
										/>
									</FormCol>
								))}
								<FormCol span={6}>
									<FormikTextarea
										name="ownerEmailsText"
										label="Owner Emails"
										helperText="Enter one normalized owner email per line or separated by commas."
										disabled={!selectedLocation}
									/>
								</FormCol>
							</FormGrid>

							<FormActionButtons>
								<Button
									type="button"
									intent="secondary"
									onClick={() => setSelectedLocation(null)}
									disabled={!selectedLocation}
								>
									Clear Selection
								</Button>
								<Button type="submit" disabled={!selectedLocation}>
									Save Changes
								</Button>
							</FormActionButtons>
						</FormSection>
					</FormContainer>
				</Form>
			</Formik>

			<div className="space-y-4">
				<div>
					<h2 className="text-base font-semibold leading-7 text-gray-900">Locations</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						Select a location to update its core details, VGT values, and location-specific owner emails.
					</p>
				</div>
				<Table columns={tableColumns} data={tableData} striped />
			</div>
		</div>
	)
}

export default ManageLocations
