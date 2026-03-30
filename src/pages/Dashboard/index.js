import { cx } from 'class-variance-authority'
import Client from 'clients/base/Client'
import { useCore } from 'contexts/core-context'
import { useGlobal } from 'contexts/global-context'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { displayDate } from 'utilities/helpers'

import Check from './components/Check'
import DateFilter from './components/DateFilter'
import MachinePerformanceTable from './components/MachinePerformanceTable'
import PerformanceMetricBlock from './components/PerformanceMetricBlock'
import PerformanceOverTimeChart from './components/PerformanceOverTimeChart'

const METRIC_FIELDS = [
	'fundsIn',
	'fundsOut',
	'netTerminalIncome',
	'amountPlayed',
	'amountWon',
	'locationRevenue',
	'metricCount'
]

const cloneMetric = metric => {
	if (!metric) return null
	const clone = {
		...metric
	}
	METRIC_FIELDS.forEach(field => {
		clone[field] = metric[field] ?? 0
	})
	return clone
}

const pickEarlierDate = (a, b) => {
	if (!a) return b
	if (!b) return a
	return dayjs(a).isBefore(dayjs(b)) ? a : b
}

const pickLaterDate = (a, b) => {
	if (!a) return b
	if (!b) return a
	return dayjs(a).isAfter(dayjs(b)) ? a : b
}

const combinePerformanceMetrics = metrics => {
	const validMetrics = metrics.map(cloneMetric).filter(Boolean)
	if (!validMetrics.length) return null

	const aggregated = { ...validMetrics[0] }
	for (let i = 1; i < validMetrics.length; i += 1) {
		const metric = validMetrics[i]
		METRIC_FIELDS.forEach(field => {
			aggregated[field] = (aggregated[field] ?? 0) + (metric[field] ?? 0)
		})
		aggregated.dateFrom = pickEarlierDate(aggregated.dateFrom, metric.dateFrom)
		aggregated.dateTo = pickLaterDate(aggregated.dateTo, metric.dateTo)
	}
	return aggregated
}

const mergeMachineAndPerformance = (machines = [], metrics = []) => {
	const metricMap = new Map()
	metrics.forEach(metric => {
		if (metric.machineId) metricMap.set(metric.machineId, metric)
	})
	return machines.map(machine => {
		const performanceMetric = metricMap.get(machine.id) || {}
		return {
			...machine,
			...performanceMetric
		}
	})
}

const aggregateMachinePerformance = responses => {
	const grouped = new Map()
	const machineRows = responses.flatMap(response =>
		mergeMachineAndPerformance(response.machines || [], response.machinePerformanceMetrics || [])
	)

	machineRows.forEach(machine => {
		const key = machine.name || machine.id
		if (!key) return
		if (!grouped.has(key)) {
			grouped.set(key, {
				name: machine.name,
				licenseNumbers: new Set(),
				fundsIn: 0,
				fundsOut: 0,
				netTerminalIncome: 0,
				locationRevenue: 0
			})
		}
		const entry = grouped.get(key)
		if (machine.licenseNumber) {
			machine.licenseNumber
				.toString()
				.split(',')
				.forEach(num => {
					const trimmed = num.trim()
					if (trimmed) entry.licenseNumbers.add(trimmed)
				})
		}
		entry.fundsIn += machine.fundsIn || 0
		entry.fundsOut += machine.fundsOut || 0
		entry.netTerminalIncome += machine.netTerminalIncome || 0
		entry.locationRevenue += machine.locationRevenue || 0
	})

	return Array.from(grouped.values())
		.sort((a, b) => a.name.localeCompare(b.name))
		.map(entry => ({
			name: entry.name,
			licenseNumber: Array.from(entry.licenseNumbers).join(', '),
			fundsIn: entry.fundsIn,
			fundsOut: entry.fundsOut,
			netTerminalIncome: entry.netTerminalIncome,
			locationRevenue: entry.locationRevenue
		}))
}

const aggregatePerformanceOverTime = responses => {
	const valid = responses.map(r => r.performanceOverTime).filter(Boolean)
	if (!valid.length) return null

	const labelMap = new Map()
	let dateRange = valid[0].dateRange

	valid.forEach(item => {
		dateRange = item.dateRange || dateRange
		item.graphMetrics?.forEach(metric => {
			if (!labelMap.has(metric.label)) {
				labelMap.set(metric.label, new Map())
			}
			const dateMap = labelMap.get(metric.label)
			metric.graphItems?.forEach(graphItem => {
				const dateKey = graphItem.date
				const currentAmount = dateMap.get(dateKey) || 0
				dateMap.set(dateKey, currentAmount + (graphItem.amount || 0))
			})
		})
	})

	const graphMetrics = Array.from(labelMap.entries()).map(([label, dateMap]) => {
		const sortedDates = Array.from(dateMap.keys()).sort((a, b) =>
			dayjs(a).isBefore(dayjs(b)) ? -1 : 1
		)
		return {
			label,
			graphItems: sortedDates.map(date => ({
				date,
				amount: dateMap.get(date)
			}))
		}
	})

	return { dateRange, graphMetrics }
}

const aggregateDashboardResponses = responses => ({
	locationPerformanceMetric: combinePerformanceMetrics(
		responses.map(response => response.locationPerformanceMetric)
	),
	locationYoyPerformanceMetric: combinePerformanceMetrics(
		responses.map(response => response.locationYoyPerformanceMetric)
	),
	payPeriodPerformanceMetric: combinePerformanceMetrics(
		responses.map(response => response.payPeriodPerformanceMetric)
	),
	payPeriodRecentlyClosedFlag: responses.some(response => response.payPeriodRecentlyClosedFlag),
	performanceOverTime: aggregatePerformanceOverTime(responses),
	machinePerformance: aggregateMachinePerformance(responses)
})

const Dashboard = () => {
	const { location, locations } = useCore()
	const { setShowSpinner } = useGlobal()

	const [dateFilter, setDateFilter] = useState({ from: '', to: '' })
	const [isHidePerformanceOverTime, setIsHidePerformanceOverTime] = useState(true)

	// dashboard data
	const [dateFirstPerformance, setDateFirstPerformance] = useState()
	const [locationYoyPerformanceMetric, setLocationYoyPerformanceMetric] = useState()
	const [machinePerformance, setMachinePerformance] = useState()
	const [performanceOverTime, setPerformanceOverTime] = useState()
	const [payPeriodData, setPayPeriodData] = useState({
		payPeriodPerformanceMetric: null,
		payPeriodRecentlyClosedFlag: false
	})

	const performanceOverTimeDateRangeLabel = useMemo(() => {
		if (!performanceOverTime) return ''
		const { graphItems } = performanceOverTime.graphMetrics[0] || {}
		const startDate = graphItems[0]?.date
		return `${displayDate(startDate)} to ${displayDate(dateFilter.to)}`
	}, [performanceOverTime, dateFilter])

	const applySingleLocationResponse = useCallback(response => {
		setDateFirstPerformance(response.locationPerformanceMetric)
		setLocationYoyPerformanceMetric(response.locationYoyPerformanceMetric)
		setPerformanceOverTime(response.performanceOverTime)
		setPayPeriodData({
			payPeriodPerformanceMetric: response.payPeriodPerformanceMetric,
			payPeriodRecentlyClosedFlag: response.payPeriodRecentlyClosedFlag
		})
		const mergedMachines = mergeMachineAndPerformance(
			response.machines || [],
			response.machinePerformanceMetrics || []
		)
		setMachinePerformance(mergedMachines)
	}, [])

	const applyAggregatedResponses = useCallback(responses => {
		const aggregated = aggregateDashboardResponses(responses)
		setDateFirstPerformance(aggregated.locationPerformanceMetric)
		setLocationYoyPerformanceMetric(aggregated.locationYoyPerformanceMetric)
		setPerformanceOverTime(aggregated.performanceOverTime)
		setPayPeriodData({
			payPeriodPerformanceMetric: aggregated.payPeriodPerformanceMetric,
			payPeriodRecentlyClosedFlag: aggregated.payPeriodRecentlyClosedFlag
		})
		setMachinePerformance(aggregated.machinePerformance)
	}, [])

	const { from, to } = dateFilter

	useEffect(() => {
		if (!location || !from || !to) return

		const isAllLocations = location?.isAllLocations
		const targetLocations = isAllLocations ? locations : [location]
		if (isAllLocations && (!targetLocations || !targetLocations.length)) return

		let isCancelled = false

		const fetchDashboard = loc =>
			new Promise((resolve, reject) => {
				Client.OwnerApi.getLocationDashboard(
					loc.id,
					from,
					to,
					{
						status200: resolve,
						error: reject
					},
					null
				)
			})

		setShowSpinner(true)

		Promise.all(targetLocations.map(fetchDashboard))
			.then(responses => {
				if (isCancelled) return
				if (isAllLocations) applyAggregatedResponses(responses)
				else applySingleLocationResponse(responses[0])

				const dayRange = dayjs(to).diff(dayjs(from), 'days')
				setIsHidePerformanceOverTime(dayRange < 3)
			})
			.catch(error => {
				// eslint-disable-next-line no-console
				console.error(error)
			})
			.finally(() => {
				if (!isCancelled) setShowSpinner(false)
			})

		return () => {
			isCancelled = true
		}
	}, [
		location,
		locations,
		from,
		to,
		setShowSpinner,
		applyAggregatedResponses,
		applySingleLocationResponse
	])

	return (
		<div className="space-y-16">
			<Check data={payPeriodData} performanceMetric={dateFirstPerformance} />

			<div className="px-4 !mt-6 sm:px-6 xl:px-8">
				<DateFilter
					onChange={setDateFilter}
					dateFirstPerformance={location?.dateFirstPerformance}
				/>
			</div>

			<div>
				<PerformanceMetricBlock title="Location Totals" performanceMetric={dateFirstPerformance} />

				<PerformanceMetricBlock
					title="Year-Over-Year-Comparison"
					performanceMetric={locationYoyPerformanceMetric}
				/>
			</div>

			<div className="px-4 sm:px-6 xl:px-8">
				<SectionTitle>Machine Performance</SectionTitle>
				<MachinePerformanceTable machinePerformanceMetrics={machinePerformance} />
			</div>

			{!isHidePerformanceOverTime && (
				<div className="px-4 sm:px-6 xl:px-8">
					<SectionTitle className="flex flex-col sm:items-baseline sm:flex-row">
						Performance Over time
						<div className="text-sm font-light text-gray-600 sm:ml-5">
							{performanceOverTimeDateRangeLabel}
						</div>
					</SectionTitle>
					<PerformanceOverTimeChart performanceOverTime={performanceOverTime} />
				</div>
			)}
		</div>
	)
}

const SectionTitle = ({ className, children }) => (
	<h3
		className={cx('my-3 text-lg font-semibold leading-6 text-gray-900 sm:my-6 lg:my-12', className)}
	>
		{children}
	</h3>
)
SectionTitle.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node
}

export default Dashboard
