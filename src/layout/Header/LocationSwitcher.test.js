/* eslint-env jest */
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Client from 'clients/base/Client'

import LocationSwitcher from './LocationSwitcher'

const mockUpdateLocation = jest.fn()
const mockUpdateLocations = jest.fn()
let mockCore

jest.mock('clients/base/Client', () => ({
	LocationApi: {
		asOwner: jest.fn()
	}
}))

jest.mock('contexts/core-context', () => ({
	useCore: () => mockCore
}))

jest.mock('ui-toolkit-tailwind/src/components', () => ({
	Select: ({ options = [], value, onChange }) => (
		<select
			aria-label="Switch Location"
			value={value?.id || ''}
			onChange={event => {
				const nextOption = options.find(option => `${option.value?.id}` === event.target.value)
				onChange(nextOption?.value || null)
			}}
		>
			{options.map(option => (
				<option key={option.value?.id} value={option.value?.id}>
					{option.label}
				</option>
			))}
		</select>
	)
}))

const locations = [
	{ id: 1, name: 'Alpha Lounge', licenseNumber: '100' },
	{ id: 2, name: 'Beta Lounge', licenseNumber: '200' },
	{ id: 3, name: 'Gamma Lounge', licenseNumber: '300' }
]

describe('LocationSwitcher', () => {
	beforeEach(() => {
		window.localStorage.clear()
		jest.clearAllMocks()
		mockCore = {
			isLoggedIn: true,
			updateLocation: mockUpdateLocation,
			updateLocations: mockUpdateLocations,
			user: { canViewAllLocations: false },
			location: null
		}
	})

	it('does not reload locations after the user changes the selected location', async () => {
		Client.LocationApi.asOwner.mockImplementation(responseHandler => {
			responseHandler.status200(locations)
		})

		render(<LocationSwitcher />)

		await waitFor(() => expect(mockUpdateLocation).toHaveBeenCalledWith(locations[0]))
		expect(Client.LocationApi.asOwner).toHaveBeenCalledTimes(1)

		await act(async () => {
			userEvent.selectOptions(screen.getByLabelText('Switch Location'), '2')
		})

		await waitFor(() => expect(mockUpdateLocation).toHaveBeenLastCalledWith(locations[1]))
		expect(Client.LocationApi.asOwner).toHaveBeenCalledTimes(1)
		expect(window.localStorage.getItem('selectedLocationId')).toBe('2')
	})
})
