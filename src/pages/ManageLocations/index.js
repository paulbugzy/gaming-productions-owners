import Client from 'clients/base/Client'
import { useCore } from 'contexts/core-context'
import { useGlobal } from 'contexts/global-context'
import { Form, Formik } from 'formik'
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

const locationSchema = yup.object({
	name: yup.string().trim().required('Location name is required'),
	licenseNumber: yup.string().nullable()
})

const defaultFormValues = {
	name: '',
	licenseNumber: ''
}

const mapValidationErrors = errors =>
	Object.fromEntries(
		Object.entries(errors || {}).map(([field, messages]) => [field, messages?.[0] || 'Invalid value'])
	)

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
			values,
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
			values,
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
							description="Add a new owners portal location by name and license number."
						>
							<FormGrid>
								<FormCol span={3}>
									<FormikText name="name" label="Location Name" />
								</FormCol>
								<FormCol span={3}>
									<FormikText name="licenseNumber" label="License Number" />
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
				initialValues={{
					name: selectedLocation?.name || '',
					licenseNumber: selectedLocation?.licenseNumber || ''
				}}
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
									: 'Choose a location from the list below to edit it.'
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
						Select a location to update its name or license number.
					</p>
				</div>
				<Table columns={tableColumns} data={tableData} striped />
			</div>
		</div>
	)
}

export default ManageLocations
