/* eslint-env jest */
import '@testing-library/jest-dom'
import { act, render, screen, waitFor } from '@testing-library/react'

import Client from 'clients/base/Client'

import Dashboard from './index'

let mockCore
const mockSetShowSpinner = jest.fn()

jest.mock('clients/base/Client', () => ({
	OwnerApi: {
		getLocationDashboard: jest.fn()
	}
}))

jest.mock('contexts/core-context', () => ({
	useCore: () => mockCore
}))

jest.mock('contexts/global-context', () => ({
	useGlobal: () => ({
		setShowSpinner: mockSetShowSpinner
	})
}))

jest.mock('./components/DateFilter', () => ({
	__esModule: true,
	default: ({ onChange }) => {
		const React = require('react')

		React.useEffect(() => {
			onChange({ from: '2026-06-20', to: '2026-06-20' })
		}, [onChange])

		return <div data-testid="date-filter" />
	}
}))

jest.mock('./components/PerformanceMetricBlock', () => ({
	__esModule: true,
	default: ({ title, performanceMetric }) => (
		<div>
			{title}: {performanceMetric?.fundsIn ?? 'empty'}
		</div>
	)
}))

jest.mock('./components/Check', () => ({
	__esModule: true,
	default: () => <div data-testid="check" />
}))

jest.mock('./components/MachinePerformanceTable', () => ({
	__esModule: true,
	default: () => <div data-testid="machines" />
}))

jest.mock('./components/PerformanceOverTimeChart', () => ({
	__esModule: true,
	default: () => <div data-testid="chart" />
}))

const dashboardResponse = fundsIn => ({
	locationPerformanceMetric: { fundsIn },
	locationYoyPerformanceMetric: { fundsIn: fundsIn + 1 },
	payPeriodPerformanceMetric: { fundsIn: fundsIn + 2 },
	payPeriodRecentlyClosedFlag: false,
	performanceOverTime: null,
	machines: [],
	machinePerformanceMetrics: []
})

describe('Dashboard', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		mockCore = {
			location: { id: 1, name: 'Alpha Lounge', dateLastPerformance: '2026-06-20' },
			locations: []
		}
	})

	it('ignores a late dashboard response from a previously selected location', async () => {
		const handlers = {}
		Client.OwnerApi.getLocationDashboard.mockImplementation((locationId, from, to, callbacks) => {
			handlers[locationId] = callbacks
		})

		const { rerender } = render(<Dashboard />)

		await waitFor(() => expect(Client.OwnerApi.getLocationDashboard).toHaveBeenCalledWith(
			1,
			'2026-06-20',
			'2026-06-20',
			expect.any(Object),
			null
		))

		mockCore = {
			location: { id: 2, name: 'Beta Lounge', dateLastPerformance: '2026-06-20' },
			locations: []
		}
		rerender(<Dashboard />)

		await waitFor(() => expect(Client.OwnerApi.getLocationDashboard).toHaveBeenCalledWith(
			2,
			'2026-06-20',
			'2026-06-20',
			expect.any(Object),
			null
		))

		await act(async () => {
			handlers[2].status200(dashboardResponse(200))
			handlers[1].status200(dashboardResponse(100))
		})

		expect(screen.getByText('Location Totals: 200')).toBeInTheDocument()
		expect(screen.queryByText('Location Totals: 100')).not.toBeInTheDocument()
	})
})
