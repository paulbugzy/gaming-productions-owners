import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'
import { Table } from 'ui-toolkit-tailwind/src/components'
import { numberToUsd } from 'utilities/helpers'

const MachinePerformanceTable = ({ machinePerformanceMetrics }) => {
	const formatAmount = value => {
		if (value < 0) {
			return <span className="text-danger-600">({numberToUsd(value * -1)})</span>
		}
		return <span>{numberToUsd(value)}</span>
	}

	const [licenseModal, setLicenseModal] = useState(null)

	const tableData = useMemo(() => {
		return machinePerformanceMetrics?.map(machine => {
			const licenseNumbers = machine.licenseNumber
				?.toString()
				.split(',')
				.map(num => num.trim())
				.filter(Boolean) || []
			const showModalLink = licenseNumbers.length > 3
			const licenseNumberDisplay = showModalLink ? (
				<button
					type="button"
					className="text-primary-600 underline"
					onClick={() =>
						setLicenseModal({
							name: machine.name,
							licenseNumbers
						})
					}
				>
					{`${licenseNumbers.length} License Numbers`}
				</button>
			) : (
				licenseNumbers.join(', ') || '—'
			)

			return {
				...machine,
				licenseNumberDisplay
			}
		})
	}, [machinePerformanceMetrics])

	return (
		<>
			<div>
				<Table
					columns={[
						{ name: 'name', label: 'Machine' },
						{ name: 'licenseNumberDisplay', label: 'License Number' },
						{ name: 'fundsIn', label: 'Funds In', formatter: formatAmount },
						{ name: 'fundsOut', label: 'Funds Out', formatter: formatAmount },
						{ name: 'netTerminalIncome', label: 'Net Terminal Income', formatter: formatAmount },
						{ name: 'locationRevenue', label: 'Location Revenue', formatter: formatAmount }
					]}
					data={tableData}
					striped
				/>
			</div>

			{licenseModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
					<div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
						<div className="flex items-center justify-between mb-4">
							<h4 className="text-lg font-semibold text-gray-900">{licenseModal.name}</h4>
							<button
								type="button"
								className="text-sm text-gray-500 hover:text-gray-700"
								onClick={() => setLicenseModal(null)}
							>
								Close
							</button>
						</div>
						<div className="max-h-64 overflow-y-auto">
							<ul className="space-y-2 text-sm text-gray-700">
								{licenseModal.licenseNumbers.map(num => (
									<li key={num} className="border-b border-gray-100 pb-1">
										{num}
									</li>
								))}
							</ul>
						</div>
						<div className="flex justify-end mt-6">
							<button
								type="button"
								className="px-4 py-2 text-sm font-semibold text-white rounded-md bg-primary-600"
								onClick={() => setLicenseModal(null)}
							>
								Done
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

MachinePerformanceTable.propTypes = {
	machinePerformanceMetrics: PropTypes.array
}

export default MachinePerformanceTable
