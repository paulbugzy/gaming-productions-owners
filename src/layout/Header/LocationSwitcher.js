import { cx } from 'class-variance-authority'
import Client from 'clients/base/Client'
import { useCore } from 'contexts/core-context'
import { useEffect, useMemo, useState } from 'react'
import { Select } from 'ui-toolkit-tailwind/src/components'

const LocationSwitcher = () => {
	const { isLoggedIn, updateLocation, location, updateLocations, user } = useCore()
	const [locationOptions, setLocationOptions] = useState([])
	const [selectedLocation, setSelectedLocation] = useState(null)

	const hasOptions = locationOptions.length > 0

	const canViewAllLocations = useMemo(() => {
		if (!user?.email) return false
		const email = user.email.toLowerCase()
		return (
			email === 'pierreyouhanna@gmail.com' ||
			email.endsWith('@gamingproductions.com')
		)
	}, [user])

	const allLocationsOption = useMemo(() => {
		if (!canViewAllLocations) return null
		return {
			label: 'VIEW ALL LOCATIONS',
			isAllLocations: true,
			value: {
				id: 'all',
				name: 'All Gaming Productions Locations',
				licenseNumber: 'ALL',
				isAllLocations: true
			}
		}
	}, [canViewAllLocations])

	// get location list
	useEffect(() => {
		if (!isLoggedIn) return

		Client.LocationApi.asOwner({
			status200: locations => {
				updateLocations(locations || [])
				const options = (locations || []).map(l => {
					return {
						label: `${l.name} | Lic. #${l.licenseNumber}`,
						value: l
					}
				})
				const optionsWithAll = allLocationsOption ? [allLocationsOption, ...options] : options
				setLocationOptions(optionsWithAll)
				const matchCurrent = optionsWithAll.find(opt => opt.value?.id === location?.id)
				setSelectedLocation(matchCurrent?.value ?? optionsWithAll[0]?.value ?? null)
			}
		})
	}, [allLocationsOption, isLoggedIn, location?.id, updateLocations])

	// update location when selectedLocation is changed
	useEffect(() => {
		updateLocation(selectedLocation)
	}, [selectedLocation, updateLocation])

	return (
		<div
			className={cx(
				'flex items-end justify-start flex-1 gap-2 sm:justify-end',
				hasOptions && 'items-baseline mt-3 sm:mt-0'
			)}
		>
			{hasOptions && (
				<>
					<h3 className="hidden text-lg font-bold tracking-tight text-white lg:block">
						Switch Location
					</h3>
					<Select
						className="flex-1 w-full sm:max-w-md md:max-w-lg"
						value={selectedLocation}
						options={locationOptions}
						onChange={setSelectedLocation}
					/>
				</>
			)}
			{!hasOptions && location && (
				<h3 className="text-sm tracking-tight text-white sm:text-lg">
					{location.name} | Lic. #{location.licenseNumber}
				</h3>
			)}
		</div>
	)
}

export default LocationSwitcher
