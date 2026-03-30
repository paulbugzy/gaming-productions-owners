import PerformanceMetric from 'models/PerformanceMetric'
import PropTypes from 'prop-types'
import { displayDate, numberToUsd } from 'utilities/helpers'

const PerformanceMetricBlock = ({ title, performanceMetric }) => {
	const {
		dateLogged,
		dateFrom,
		dateTo,
		fundsIn,
		fundsOut,
		netTerminalIncome,
		amountPlayed,
		locationRevenue
	} = performanceMetric ?? {}

	if (!performanceMetric) return null

	return (
		<div>
			<h3 className="flex flex-col px-4 my-3 text-lg font-semibold leading-6 text-gray-900 sm:items-baseline sm:flex-row sm:px-6 xl:px-8">
				{title}
				<div className="text-sm font-light text-gray-600 sm:ml-5">
					{displayDate(dateFrom)} to {displayDate(dateTo)}
				</div>
			</h3>
			<dl className="grid grid-cols-1 gap-px mx-auto bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4">
				<StatBlock name="Funds In" value={numberToUsd(fundsIn)} />
				<StatBlock name="Funds Out" value={numberToUsd(fundsOut)} />
				<StatBlock name="Net Terminal Income" value={numberToUsd(netTerminalIncome)} />
				<StatBlock name="Location Revenue" value={numberToUsd(locationRevenue)} />
			</dl>
		</div>
	)
}

const StatBlock = ({ name, value }) => {
	return (
		<div className="flex flex-wrap items-baseline justify-between px-4 py-10 bg-white gap-x-4 gap-y-2 sm:px-6 xl:px-8">
			<dt className="text-sm font-medium leading-6 text-gray-500">{name}</dt>
			<dd className="flex-none w-full text-3xl font-medium leading-10 tracking-tight text-gray-900">
				{value}
			</dd>
		</div>
	)
}
StatBlock.propTypes = {
	name: PropTypes.string,
	value: PropTypes.string
}

PerformanceMetricBlock.propTypes = {
	title: PropTypes.string,
	performanceMetric: PropTypes.instanceOf(PerformanceMetric)
}

export default PerformanceMetricBlock
