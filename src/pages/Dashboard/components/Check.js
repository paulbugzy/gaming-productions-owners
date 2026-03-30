import { useCore } from 'contexts/core-context'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import React from 'react'
import { numberToUsd } from 'utilities/helpers'

const displayDate = date => {
	return dayjs(date).format('M/D/YYYY')
}

const Check = ({ data, performanceMetric }) => {
	const { location } = useCore()

	const { payPeriodPerformanceMetric, payPeriodRecentlyClosedFlag } = data ?? {}
	const { dateFrom: payPeriodFrom, dateTo: payPeriodTo } = payPeriodPerformanceMetric ?? {}
	const amountMetric = performanceMetric ?? payPeriodPerformanceMetric
	const { locationRevenue = 0, dateFrom: rangeFrom, dateTo: rangeTo } = amountMetric ?? {}

	if (!amountMetric) return null

	const payeeName = location?.isAllLocations ? 'All Gaming Productions Locations' : location?.name || ''
	const headerDate = rangeTo ? displayDate(rangeTo) : payPeriodTo ? displayDate(payPeriodTo) : ''

	const getPayPeriodString = () => {
		if (rangeFrom && rangeTo) return `${displayDate(rangeFrom)} to ${displayDate(rangeTo)}`
		if (!payPeriodPerformanceMetric) return ''
		if (payPeriodRecentlyClosedFlag) return `${displayDate(payPeriodFrom)} to ${displayDate(payPeriodTo)}`
		return `since ${displayDate(payPeriodFrom)}`
	}

	return (
		<div className="w-full mx-auto lg:w-3/4 xl:w-2/3">
			<div className="p-4 border border-gray-300 rounded-lg bg-primary-100">
				<div className="flex justify-between">
					<div>
						<div className="font-poppins">Gaming Productions</div>
						{/* <div className="text-xs">1234 Address Str</div>
						<div className="text-xs">Townville, CA 92831</div> */}
					</div>

					<div>{headerDate}</div>
				</div>

				<div className="flex items-center justify-between mt-3 md:mt-5">
					<div className="flex items-end flex-1 border-b-2 border-b-primary-300">
						<div className="mr-3 text-xs">
							<div>PAY OF THE</div>
							<div>ORDER OF</div>
						</div>

						<div className="flex-1 text-lg text-center md:text-xl lg:text-2xl font-kalam">
							{payeeName}
						</div>
					</div>
					<div className="flex ml-2">
						<div className="p-2 text-lg tracking-wide border-2 rounded-sm font-kalam border-primary-300 bg-primary-200">
							{numberToUsd(locationRevenue, 2)}
						</div>
					</div>
				</div>

				<div className="flex items-end justify-between mt-3 md:mt-5">
					<div>
						<div className="text-xs">
							{payPeriodRecentlyClosedFlag
								? 'Pay Period Amount Earneds,'
								: 'Pay Period Amount Earned-to-Date'}
						</div>
						<div className="pr-10 text-xs border-b-2 md:text-base mp-3 border-b-primary-300 font-kalam">
							{getPayPeriodString()}
						</div>
					</div>

					<div className="px-8 text-2xl tracking-wider border-b-2 md:text-3xl border-b-primary-300 font-MrDafoe">
						Gaming Productions
					</div>
				</div>
			</div>
		</div>
	)
}

Check.propTypes = {
	data: PropTypes.object,
	performanceMetric: PropTypes.object
}

export default Check
