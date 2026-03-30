/* eslint-disable no-return-assign */
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import { Select, TextInput } from 'ui-toolkit-tailwind/src/components'

const dateRangeEnum = Object.freeze({
	Yesterday: 'yesterday',
	'Past 7 Days': 'past7Days',
	'Past 30 Days': 'past30Days',
	'Month-to-Date': 'monthToDate',
	'Quarter-to-Date': 'quarterToDate',
	'Year-to-Date': 'yearToDate',
	'Last Month': 'lastMonth',
	'Last Quarter': 'lastQuarter',
	'Last Year': 'lastYear',
	'Since Location Launch': 'sinceLocationLaunch',
	Custom: 'custom'
})

const DateFilter = ({ dateFirstPerformance, onChange = () => {} }) => {
	const rangeOptions = useMemo(() => {
		const ranges = { ...dateRangeEnum }

		// remove Since Location Launch if there's no dateFirstPerformance
		if (!dateFirstPerformance) {
			delete ranges['Since Location Launch']
		}

		const options = Object.entries(ranges).map(([label, value]) => ({
			value,
			label
		}))

		return options
	}, [dateFirstPerformance])

	const [value, setValue] = useState(rangeOptions[0].value)
	const [fromDateStr, setFromDateStr] = useState('')
	const [toDateStr, setToDateStr] = useState('')

	const handleFromChange = e => {
		const date = e.target.value
		const newFromDate = new Date(date)
		const toDate = new Date(toDateStr)

		// if from date is after to date, rest to date
		if (newFromDate > toDate) setToDateStr('')

		setFromDateStr(date)
	}

	const handleToChange = e => {
		const date = e.target.value
		const newToDate = new Date(date)
		const fromDate = new Date(fromDateStr)

		// if to date is before from date, do nothing
		if (newToDate < fromDate) return

		setToDateStr(date)
	}

	useEffect(() => {
		const endDay = dayjs().subtract(1, 'days') // yesterday
		let from
		let to = endDay

		switch (value) {
			case dateRangeEnum.Yesterday:
				from = endDay
				break
			case 'past7Days':
				from = endDay.subtract(7, 'days')
				break
			case 'past30Days':
				from = endDay.subtract(30, 'days')
				break
			case 'monthToDate':
				from = endDay.startOf('month')
				break
			case 'quarterToDate':
				from = endDay.startOf('quarter')
				break
			case 'yearToDate':
				from = endDay.startOf('year')
				break
			case 'lastMonth':
				from = endDay.subtract(1, 'month').startOf('month')
				to = endDay.subtract(1, 'month').endOf('month')
				break
			case 'lastQuarter':
				from = endDay.subtract(1, 'quarter').startOf('quarter')
				to = endDay.subtract(1, 'quarter').endOf('quarter')
				break
			case 'lastYear':
				from = endDay.subtract(1, 'year').startOf('year')
				to = endDay.subtract(1, 'year').endOf('year')
				break
			case 'sinceLocationLaunch':
				from = dayjs(dateFirstPerformance)
				break
			case 'custom':
				from = dayjs(fromDateStr)
				to = dayjs(toDateStr)
				break
			default:
		}

		if (value === 'custom' && (!fromDateStr || !toDateStr)) return

		if (value !== 'custom') {
			setToDateStr('')
			setFromDateStr('')
		}

		onChange({ from: from.format('YYYY-MM-DD'), to: to.format('YYYY-MM-DD') })
	}, [onChange, value, fromDateStr, toDateStr, dateFirstPerformance])

	return (
		<div className="flex flex-col justify-start gap-3 sm:flex-row">
			<div className="flex items-center w-auto gap-3">
				<h3 className="flex-1 hidden text-sm font-medium leading-6 text-gray-500 md:block">
					Date Range
				</h3>
				<Select
					className="w-full sm:w-[250px]"
					options={rangeOptions}
					value={value}
					onChange={setValue}
				/>
			</div>

			{value === dateRangeEnum.Custom && (
				<div className="flex gap-3">
					<TextInput
						className="flex-1 sm:!w-[150px]"
						placeholder="From"
						type="text"
						value={fromDateStr}
						onChange={handleFromChange}
						onFocus={e => (e.target.type = 'date')}
						onBlur={e => (e.target.type = 'text')}
					/>
					<TextInput
						className="flex-1 sm:!w-[150px]"
						placeholder="To"
						type="text"
						value={toDateStr}
						onChange={handleToChange}
						onFocus={e => (e.target.type = 'date')}
						onBlur={e => (e.target.type = 'text')}
					/>
				</div>
			)}
		</div>
	)
}
DateFilter.propTypes = {
	dateFirstPerformance: PropTypes.any,
	onChange: PropTypes.func.isRequired
}

export default DateFilter
