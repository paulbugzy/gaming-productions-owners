import Client from 'clients/base/Client'
import { useCore } from 'contexts/core-context'
import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'
import { Button, Modal } from 'ui-toolkit-tailwind/src/components'
import { showToast } from 'utilities/showToast'

const weekDayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const statusTone = status => {
	switch (status) {
	case 'completed':
		return 'bg-emerald-500'
	case 'failed':
		return 'bg-rose-500'
	case 'running':
		return 'bg-amber-500'
	default:
		return 'bg-slate-300'
	}
}

const statusLabel = status => {
	switch (status) {
	case 'completed':
		return 'Confirmed'
	case 'failed':
		return 'Failed'
	case 'running':
		return 'Running'
	default:
		return 'No run'
	}
}

const formatTimestamp = value => {
	if (!value) return 'Not recorded'

	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit'
	}).format(new Date(value))
}

const OperationsCalendarModal = ({ visible, onClose }) => {
	const { executeLogout } = useCore()
	const [calendar, setCalendar] = useState(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!visible) return

		setLoading(true)

		Client.OwnerApi.getOperationsCalendar(
			{
				status200: response => {
					setCalendar(response)
				},
				status401: () => {
					showToast({
						intent: 'error',
						title: 'Operations Calendar',
						content: 'Your session expired. Please sign in again.'
					})
					executeLogout()
				},
				error: error => {
					console.error(error)
					showToast({
						intent: 'error',
						title: 'Operations Calendar',
						content: 'Unable to load the operations calendar.'
					})
				}
			},
			{
				onApiResponse: () => setLoading(false)
			}
		)
	}, [executeLogout, visible])

	const dayCells = useMemo(() => {
		if (!calendar?.days) return []

		const leading = Array.from({ length: calendar.month?.leadingBlankDays || 0 }, (_, index) => ({
			id: `blank-${index}`,
			blank: true
		}))

		const days = calendar.days.map(day => ({
			...day,
			id: day.date,
			blank: false
		}))

		return [...leading, ...days]
	}, [calendar])

	return (
		<Modal visible={visible} onClose={onClose} size="2xl" clickOutsideToClose>
			<Modal.Header>Operations Calendar</Modal.Header>
			<Modal.Body>
				<div className="space-y-5">
					<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<p className="text-lg font-semibold text-gray-900">{calendar?.month?.label || 'Loading...'}</p>
							<p className="text-sm text-gray-500">
								Track GP data pulls and daily email confirmations for the current month.
							</p>
						</div>
						<div className="text-sm text-gray-500">
							Last refreshed: {calendar?.generatedAt ? formatTimestamp(calendar.generatedAt) : 'Loading...'}
						</div>
					</div>

					<div className="flex flex-wrap gap-4 text-sm text-gray-600">
						<div className="flex items-center gap-2">
							<span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
							<span>Confirmed</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
							<span>Failed</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
							<span>No run yet</span>
						</div>
					</div>

					<div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
						{weekDayLabels.map(label => (
							<div key={label}>{label}</div>
						))}
					</div>

					<div className="grid grid-cols-1 gap-2 sm:grid-cols-7">
						{dayCells.map(day => {
							if (day.blank) {
								return <div key={day.id} className="hidden rounded-xl border border-transparent p-3 sm:block" />
							}

							const sgPull = day.tasks?.['sg-import-acquire']
							const dailyEmails = day.tasks?.['daily-performance-report-queue']

							return (
								<div
									key={day.id}
									className={`rounded-xl border p-3 ${
										day.isToday ? 'border-gmpPurple bg-purple-50' : 'border-slate-200 bg-white'
									}`}
								>
									<div className="mb-3 flex items-center justify-between">
										<p className="text-sm font-semibold text-gray-900">{day.dayOfMonth}</p>
										{day.isToday && (
											<span className="rounded-full bg-gmpPurple px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
												Today
											</span>
										)}
									</div>

									<div className="space-y-2">
										<div className="rounded-lg bg-slate-50 p-2">
											<div className="flex items-center gap-2">
												<span className={`h-2.5 w-2.5 rounded-full ${statusTone(sgPull?.status)}`} />
												<p className="text-xs font-medium text-gray-700">GP Pull</p>
											</div>
											<p className="mt-1 text-xs text-gray-500">{statusLabel(sgPull?.status)}</p>
											<p className="text-[11px] text-gray-400">{formatTimestamp(sgPull?.startedAt)}</p>
										</div>

										<div className="rounded-lg bg-slate-50 p-2">
											<div className="flex items-center gap-2">
												<span className={`h-2.5 w-2.5 rounded-full ${statusTone(dailyEmails?.status)}`} />
												<p className="text-xs font-medium text-gray-700">Emails</p>
											</div>
											<p className="mt-1 text-xs text-gray-500">{statusLabel(dailyEmails?.status)}</p>
											<p className="text-[11px] text-gray-400">{formatTimestamp(dailyEmails?.startedAt)}</p>
										</div>
									</div>
								</div>
							)
						})}
					</div>

					{loading && <p className="text-sm text-gray-500">Loading operations calendar...</p>}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Modal.ActionButtons>
					<Button type="button" intent="secondary" onClick={onClose}>
						Close
					</Button>
				</Modal.ActionButtons>
			</Modal.Footer>
		</Modal>
	)
}

OperationsCalendarModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired
}

export default OperationsCalendarModal
