import Client from 'clients/base/Client'
import { useCore } from 'contexts/core-context'
import { useGlobal } from 'contexts/global-context'
import { FieldArray, Form, Formik, setIn, useFormikContext } from 'formik'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Button, FormikText, Modal, Table } from 'ui-toolkit-tailwind/src/components'
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

let ownerContactDraftKey = 0

const createOwnerContactDraftKey = () => {
	ownerContactDraftKey += 1
	return `owner-contact-${ownerContactDraftKey}`
}

const createEmptyOwnerContact = () => ({
	__draftKey: createOwnerContactDraftKey(),
	name: '',
	email: ''
})

const createDefaultFormValues = () => ({
	name: '',
	licenseNumber: '',
	vgt1: '',
	vgt2: '',
	vgt3: '',
	vgt4: '',
	vgt5: '',
	vgt6: '',
	ownerContacts: [createEmptyOwnerContact()]
})

const normalizeOwnerContactRows = ownerContacts => {
	const contacts = Array.isArray(ownerContacts)
		? ownerContacts.map(ownerContact => ({
			__draftKey: ownerContact?.__draftKey || createOwnerContactDraftKey(),
			name: String(ownerContact?.name || '').trim(),
			email: String(ownerContact?.email || '').trim().toLowerCase()
		}))
		: []

	const hasRealContact = contacts.some(ownerContact => ownerContact.name || ownerContact.email)

	return hasRealContact ? contacts : [createEmptyOwnerContact()]
}

const normalizeOwnerContactsForRequest = ownerContacts => {
	const seen = new Set()

	return normalizeOwnerContactRows(ownerContacts).reduce((contacts, ownerContact) => {
		if (!ownerContact.email || seen.has(ownerContact.email)) {
			return contacts
		}

		seen.add(ownerContact.email)
		contacts.push({
			name: ownerContact.name || null,
			email: ownerContact.email
		})

		return contacts
	}, [])
}

const ownerContactSchema = yup.object({
	name: yup.string().trim().nullable(),
	email: yup.string().test(
		'owner-email',
		'Enter a valid owner email address.',
		function validateOwnerEmail(value) {
			const email = String(value || '').trim()
			const name = String(this.parent?.name || '').trim()

			if (!email) {
				return name === ''
			}

			return ownerEmailPattern.test(email)
		}
	)
})

const locationSchema = yup.object({
	name: yup.string().trim().required('Location name is required'),
	licenseNumber: yup.string().nullable(),
	vgt1: yup.string().nullable(),
	vgt2: yup.string().nullable(),
	vgt3: yup.string().nullable(),
	vgt4: yup.string().nullable(),
	vgt5: yup.string().nullable(),
	vgt6: yup.string().nullable(),
	ownerContacts: yup.array().of(ownerContactSchema)
})

const normalizeErrorPath = field => {
	if (field.startsWith('ownerEmails.')) {
		const [, index] = field.split('.')
		return `ownerContacts.${index}.email`
	}

	return field
}

const mapValidationErrors = errors =>
	Object.entries(errors || {}).reduce((formattedErrors, [field, messages]) => {
		return setIn(
			formattedErrors,
			normalizeErrorPath(field),
			messages?.[0] || 'Invalid value'
		)
	}, {})

const buildLocationRequest = values => {
	const ownerContacts = normalizeOwnerContactsForRequest(values.ownerContacts)

	return {
		name: values.name,
		licenseNumber: values.licenseNumber,
		vgt1: values.vgt1,
		vgt2: values.vgt2,
		vgt3: values.vgt3,
		vgt4: values.vgt4,
		vgt5: values.vgt5,
		vgt6: values.vgt6,
		ownerContacts,
		ownerEmails: ownerContacts.map(ownerContact => ownerContact.email)
	}
}

const locationToFormValues = location => ({
	name: location?.name || '',
	licenseNumber: location?.licenseNumber || '',
	vgt1: location?.vgt1 || '',
	vgt2: location?.vgt2 || '',
	vgt3: location?.vgt3 || '',
	vgt4: location?.vgt4 || '',
	vgt5: location?.vgt5 || '',
	vgt6: location?.vgt6 || '',
	ownerContacts: normalizeOwnerContactRows(
		location?.ownerContacts?.length
			? location.ownerContacts
			: (location?.ownerEmails || []).map(email => ({ name: '', email }))
	)
})

const VisuallyHiddenLabel = ({ children }) => <span className="sr-only">{children}</span>

VisuallyHiddenLabel.propTypes = {
	children: PropTypes.node.isRequired
}

const LocationFormDraftSync = ({ mode, locationId, onChange }) => {
	const { values } = useFormikContext()

	useEffect(() => {
		onChange(mode, locationId, values)
	}, [locationId, mode, onChange, values])

	return null
}

LocationFormDraftSync.propTypes = {
	mode: PropTypes.oneOf(['create', 'edit']).isRequired,
	locationId: PropTypes.number,
	onChange: PropTypes.func.isRequired
}

LocationFormDraftSync.defaultProps = {
	locationId: null
}

const OwnerContactFields = ({ disabled }) => {
	const { values } = useFormikContext()

	return (
		<FieldArray name="ownerContacts">
			{({ push, remove }) => (
				<div className="space-y-4">
					<div>
						<h3 className="text-sm font-medium text-gray-900">Owners</h3>
						<p className="mt-1 text-sm text-gray-500">
							Add one or more owners for this location. Names and emails will be reused when the
							owner already exists.
						</p>
					</div>

					{values.ownerContacts.map((ownerContact, index) => {
						const isLastRow = index === values.ownerContacts.length - 1
						const canRemove = values.ownerContacts.length > 1

						return (
							<div
								className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto]"
								key={ownerContact.__draftKey || `owner-contact-${index}`}
							>
								<FormikText
									name={`ownerContacts.${index}.name`}
									label={index === 0 ? 'Owner Name' : <VisuallyHiddenLabel>Owner Name</VisuallyHiddenLabel>}
									disabled={disabled}
								/>
								<FormikText
									name={`ownerContacts.${index}.email`}
									label={index === 0 ? 'Owner Email' : <VisuallyHiddenLabel>Owner Email</VisuallyHiddenLabel>}
									type="email"
									disabled={disabled}
								/>
								<div className="flex items-end">
									{canRemove ? (
										<Button
											type="button"
											intent="secondary"
											className="min-w-10"
											onClick={() => remove(index)}
											disabled={disabled}
											aria-label="Remove this owner"
										>
											-
										</Button>
									) : (
										<div aria-hidden="true" className="min-w-10" />
									)}
								</div>
								<div className="flex items-end">
									{isLastRow ? (
										<Button
											type="button"
											intent="secondary"
											className="min-w-10"
											onClick={() => push(createEmptyOwnerContact())}
											disabled={disabled}
											aria-label="Add another owner"
										>
											+
										</Button>
									) : (
										<div aria-hidden="true" className="min-w-10" />
									)}
								</div>
							</div>
						)
					})}
				</div>
			)}
		</FieldArray>
	)
}

OwnerContactFields.propTypes = {
	disabled: PropTypes.bool
}

OwnerContactFields.defaultProps = {
	disabled: false
}

const LocationModal = ({
	visible,
	mode,
	location,
	values,
	onClose,
	onSubmit,
	onDraftChange
}) => {
	const title = mode === 'create' ? 'Create Location' : 'Edit Location'
	const description =
		mode === 'create'
			? 'Add a location, its VGT labels, and the owners tied to it.'
			: `Update ${location?.name || 'this location'} and its owner assignments.`

	return (
		<Modal visible={visible} onClose={onClose} size="2xl" clickOutsideToClose>
			<Formik initialValues={values} validationSchema={locationSchema} onSubmit={onSubmit}>
				<Form>
					<LocationFormDraftSync
						mode={mode}
						locationId={location?.id || null}
						onChange={onDraftChange}
					/>
					<Modal.Header>{title}</Modal.Header>
					<Modal.Body>
						<div className="space-y-6">
							<p className="text-sm text-gray-600">{description}</p>

							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<FormikText name="name" label="Location Name" autoFocus />
								<FormikText name="licenseNumber" label="License Number" />
							</div>

							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								{vgtFields.map(field => (
									<FormikText key={field.name} name={field.name} label={field.label} />
								))}
							</div>

							<OwnerContactFields />
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Modal.ActionButtons>
							<Button type="button" intent="secondary" onClick={onClose}>
								Cancel
							</Button>
							<Button type="submit">{mode === 'create' ? 'Create Location' : 'Save Changes'}</Button>
						</Modal.ActionButtons>
					</Modal.Footer>
				</Form>
			</Formik>
		</Modal>
	)
}

LocationModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	mode: PropTypes.oneOf(['create', 'edit']).isRequired,
	location: PropTypes.object,
	values: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onDraftChange: PropTypes.func.isRequired
}

LocationModal.defaultProps = {
	location: null
}

const ManageLocations = () => {
	const { executeLogout } = useCore()
	const { setShowSpinner } = useGlobal()
	const [locations, setLocations] = useState([])
	const [createDraft, setCreateDraft] = useState(createDefaultFormValues())
	const [editDrafts, setEditDrafts] = useState({})
	const [locationModal, setLocationModal] = useState({
		visible: false,
		mode: 'create',
		locationId: null
	})

	const loadLocations = () => {
		Client.OwnerAdminApi.listLocations(
			{
				status200: responseLocations => {
					setLocations(responseLocations || [])
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

	const activeLocation =
		locationModal.locationId === null
			? null
			: locations.find(location => location.id === locationModal.locationId) || null

	const activeModalValues =
		locationModal.mode === 'create'
			? createDraft
			: editDrafts[locationModal.locationId] || locationToFormValues(activeLocation)

	const updateDraft = (mode, locationId, values) => {
		if (mode === 'create') {
			setCreateDraft(values)
			return
		}

		if (!locationId) {
			return
		}

		setEditDrafts(currentDrafts => ({
			...currentDrafts,
			[locationId]: values
		}))
	}

	const openCreateModal = () => {
		setLocationModal({
			visible: true,
			mode: 'create',
			locationId: null
		})
	}

	const openEditModal = location => {
		setEditDrafts(currentDrafts => ({
			...currentDrafts,
			[location.id]: currentDrafts[location.id] || locationToFormValues(location)
		}))
		setLocationModal({
			visible: true,
			mode: 'edit',
			locationId: location.id
		})
	}

	const closeLocationModal = () => {
		setLocationModal(currentModal => ({
			...currentModal,
			visible: false
		}))
	}

	const handleCreate = (values, { setErrors }) => {
		Client.OwnerAdminApi.createLocation(
			buildLocationRequest(values),
			{
				status201: () => {
					showToast({
						intent: 'success',
						title: 'Create Location',
						content: 'Location created successfully.'
					})
					setCreateDraft(createDefaultFormValues())
					setLocationModal({
						visible: false,
						mode: 'create',
						locationId: null
					})
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
		if (!activeLocation) return

		Client.OwnerAdminApi.updateLocation(
			activeLocation.id,
			buildLocationRequest(values),
			{
				status200: () => {
					showToast({
						intent: 'success',
						title: 'Update Location',
						content: 'Location updated successfully.'
					})
					setEditDrafts(currentDrafts => {
						const nextDrafts = { ...currentDrafts }
						delete nextDrafts[activeLocation.id]
						return nextDrafts
					})
					setLocationModal(currentModal => ({
						...currentModal,
						visible: false
					}))
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
			<Button size="sm" intent="secondary" onClick={() => openEditModal(location)}>
				Edit
			</Button>
		)
	}))

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div>
					<h2 className="text-base font-semibold leading-7 text-gray-900">Locations</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						Select a location to update its name or license number.
					</p>
				</div>
				<Button onClick={openCreateModal}>Add Location</Button>
			</div>

			<Table columns={tableColumns} data={tableData} striped />

			<LocationModal
				visible={locationModal.visible}
				mode={locationModal.mode}
				location={activeLocation}
				values={activeModalValues}
				onClose={closeLocationModal}
				onSubmit={locationModal.mode === 'create' ? handleCreate : handleUpdate}
				onDraftChange={updateDraft}
			/>
		</div>
	)
}

export default ManageLocations
