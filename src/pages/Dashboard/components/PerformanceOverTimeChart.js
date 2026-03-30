import {
	CategoryScale,
	Chart as ChartJS,
	Colors,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip
} from 'chart.js'
import autocolors from 'chartjs-plugin-autocolors'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { numberToUsd } from 'utilities/helpers'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Colors,
	autocolors
)

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'bottom',
			labels: {
				padding: 20
			}
		},
		tooltip: {
			callbacks: {
				label(tooltipItem) {
					return `$${tooltipItem.formattedValue}`
				}
			}
		},
		autocolors
	},
	redraw: true,
	scales: {
		y: {
			ticks: {
				// Include a dollar sign in the ticks
				callback(value) {
					return numberToUsd(value)
				}
			}
		}
	}
}

const PerformanceOverTimeChart = ({ performanceOverTime }) => {
	const data = useMemo(() => {
		if (!performanceOverTime) return null

		const { dateRange, graphMetrics } = performanceOverTime

		const labels = graphMetrics[0].graphItems?.map(item => {
			const isMonthly = dateRange === 'Monthly'
			const date = dayjs(item.date).format(isMonthly ? 'MMM YY' : 'MM/DD')
			return date
		})

		const datasets =
			graphMetrics
				.filter(({ label }) => label !== 'Amount Played') // hide Amount Played line
				.map(metric => {
					const { label, graphItems } = metric
					return {
						label,
						data: graphItems.map(item => item.amount)
					}
				})

		return { labels, datasets }
	}, [performanceOverTime])

	if (!performanceOverTime) return null

	return <Line options={options} data={data} />
}
PerformanceOverTimeChart.propTypes = {
	performanceOverTime: PropTypes.shape({
		dateRange: PropTypes.oneOf(['Daily', 'Weekly', 'Monthly']),
		graphMetrics: PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.string,
				graphItems: PropTypes.arrayOf(
					PropTypes.shape({
						date: PropTypes.object,
						amount: PropTypes.number
					})
				)
			})
		)
	})
}

export default PerformanceOverTimeChart
