import { cx } from 'class-variance-authority'
import Client from 'clients/base/Client'
import { useCore } from 'contexts/core-context'
import useLocalStorage, { LOCAL_STORAGE_KEY } from 'hooks/useLocalStorage'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Select } from 'ui-toolkit-tailwind/src/components'

const LocationSwitcher = () => {
	const { isLoggedIn, updateLocation, updateLocations, user, location } = useCore()
	const [locationOptions, setLocationOptions] = useState([])
	const [selectedLocation, setSelectedLocation] = useState(null)
	const [storedLocationId, setStoredLocationId] = useLocalStorage(
		LOCAL_STORAGE_KEY.selectedLocationId,
		null
	)
	const storedLocationIdRef = useRef(storedLocationId)
	const selectedLocationIdRef = useRef(null)
	const selectionVersionRef = useRef(0)
	const locationListRequestRef = useRef(0)

	useEffect(() => {
		storedLocationIdRef.current = storedLocationId
	}, [storedLocationId])

	const hasOptions = locationOptions.length > 0

	const canViewAllLocations = useMemo(() => {
		return !!user?.canViewAllLocations
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

	const handleLocationChange = nextLocation => {
		const nextLocationId = nextLocation?.id ?? null
		selectionVersionRef.current += 1
		selectedLocationIdRef.current = nextLocationId
		storedLocationIdRef.current = nextLocationId
		setSelectedLocation(nextLocation)
		if (nextLocation) {
			setStoredLocationId(nextLocation.id)
			updateLocation(nextLocation)
		}
	}

	// get location list
	useEffect(() => {
		if (!isLoggedIn) return

		let isActive = true
		const requestId = locationListRequestRef.current + 1
		const selectionVersionAtRequest = selectionVersionRef.current
		locationListRequestRef.current = requestId

		Client.LocationApi.asOwner({
			status200: locations => {
				if (!isActive) return
				if (requestId !== locationListRequestRef.current) return

				updateLocations(locations || [])
				const options = (locations || []).map(l => {
					return {
						label: `${l.name} | Lic. #${l.licenseNumber}`,
						value: l
					}
				})
				const optionsWithAll = allLocationsOption ? [allLocationsOption, ...options] : options
				setLocationOptions(optionsWithAll)
				const preferredLocationId = selectedLocationIdRef.current ?? storedLocationIdRef.current
				const matchPreferred =
					preferredLocationId === null || preferredLocationId === undefined
						? null
						: optionsWithAll.find(opt => `${opt.value?.id}` === `${preferredLocationId}`)
				const firstRealLocation = options.find(opt => !opt.value?.isAllLocations)
				const nextLocation =
					matchPreferred?.value ?? firstRealLocation?.value ?? optionsWithAll[0]?.value ?? null

				if (selectionVersionRef.current !== selectionVersionAtRequest && matchPreferred) {
					setSelectedLocation(matchPreferred.value)
					return
				}

				setSelectedLocation(nextLocation)
			}
		})

		return () => {
			isActive = false
		}
	}, [allLocationsOption, isLoggedIn, updateLocations])

	// update location when selectedLocation is changed
	useEffect(() => {
		if (!selectedLocation) return
		selectedLocationIdRef.current = selectedLocation.id
		updateLocation(selectedLocation)
		setStoredLocationId(selectedLocation.id)
	}, [selectedLocation, setStoredLocationId, updateLocation])

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
						onChange={handleLocationChange}
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
