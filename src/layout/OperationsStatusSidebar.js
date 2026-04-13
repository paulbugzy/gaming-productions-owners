import {
	ChevronLeftIcon,
	CircleStackIcon,
	EnvelopeIcon,
	ServerStackIcon
} from '@heroicons/react/24/outline'
import Client from 'clients/base/Client'
import { useCore } from 'contexts/core-context'
import { useEffect, useMemo, useState } from 'react'

const serviceIconMap = {
	sg_portal: CircleStackIcon,
	api_server: ServerStackIcon,
	daily_emails: EnvelopeIcon
}

const serviceToneMap = {
	ok: {
		icon: 'text-emerald-600',
		dot: 'bg-emerald-500',
		tooltip: 'bg-emerald-600'
	},
	scheduled: {
		icon: 'text-amber-600',
		dot: 'bg-amber-500',
		tooltip: 'bg-amber-600'
	},
	issue: {
		icon: 'text-rose-600',
		dot: 'bg-rose-500',
		tooltip: 'bg-rose-600'
	},
	loading: {
		icon: 'text-slate-500',
		dot: 'bg-slate-400',
		tooltip: 'bg-slate-700'
	}
}

const tooltipBody = service => {
	if (!service) return 'Checking current service status.'

	return [service.label, service.summary, service.detail].filter(Boolean).join(' | ')
}

const OperationsStatusSidebar = () => {
	const { executeLogout, isLoggedIn } = useCore()
	const [collapsed, setCollapsed] = useState(false)
	const [canViewSidebar, setCanViewSidebar] = useState(false)
	const [hasResolvedPermissions, setHasResolvedPermissions] = useState(false)
	const [services, setServices] = useState([])

	useEffect(() => {
		if (!isLoggedIn) {
			setCanViewSidebar(false)
			setHasResolvedPermissions(true)
			setServices([])
			return
		}

		let isActive = true

		Client.OwnerAdminApi.permissions({
			status200: response => {
				if (!isActive) return

				const allowed = !!response?.canManageLocations
				setCanViewSidebar(allowed)
				setHasResolvedPermissions(true)

				if (!allowed) {
					setServices([])
				}
			},
			else: statusCode => {
				if (!isActive) return
				if (statusCode === 401) {
					executeLogout()
					return
				}

				setCanViewSidebar(false)
				setHasResolvedPermissions(true)
				setServices([])
			},
			error: error => {
				console.error(error)
				if (!isActive) return
				setCanViewSidebar(false)
				setHasResolvedPermissions(true)
				setServices([])
			}
		})

		return () => {
			isActive = false
		}
	}, [executeLogout, isLoggedIn])

	useEffect(() => {
		if (!isLoggedIn || !canViewSidebar) return

		let isActive = true

		const loadStatus = () => {
			Client.OwnerApi.getOperationsStatus({
				status200: response => {
					if (!isActive) return
					setServices(response?.services || [])
				},
				status401: () => {
					if (!isActive) return
					executeLogout()
				},
				else: statusCode => {
					if (!isActive) return
					if (statusCode === 403) {
						setCanViewSidebar(false)
						setServices([])
					}
				},
				error: error => {
					console.error(error)
					if (!isActive) return
					setServices([])
				}
			})
		}

		loadStatus()
		const intervalId = window.setInterval(loadStatus, 60000)

		return () => {
			isActive = false
			window.clearInterval(intervalId)
		}
	}, [canViewSidebar, executeLogout, isLoggedIn])

	const sidebarServices = useMemo(() => {
		if (services.length > 0) return services

		return [
			{ key: 'sg_portal', label: 'VGT Portal', status: 'loading', summary: 'Checking current status.' },
			{ key: 'api_server', label: 'API Server', status: 'loading', summary: 'Checking current status.' },
			{ key: 'daily_emails', label: 'GP Email Scheduler', status: 'loading', summary: 'Checking current status.' }
		]
	}, [services])

	if (!isLoggedIn || !hasResolvedPermissions || !canViewSidebar) return null

	return (
		<div
			className={`fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 transition-transform duration-200 lg:block ${
				collapsed ? 'translate-x-[90px]' : 'translate-x-0'
			}`}
		>
			<button
				type="button"
				className={`absolute right-[89px] top-1/2 flex -translate-y-1/2 items-center justify-center rounded-l-xl border border-r-0 border-slate-200 px-3 py-6 shadow-sm transition ${
					collapsed ? 'bg-[#0065ee] text-white' : 'bg-slate-100 text-slate-700'
				}`}
				onClick={() => setCollapsed(current => !current)}
				aria-label={collapsed ? 'Show service sidebar' : 'Hide service sidebar'}
				title={collapsed ? 'Show' : 'Hide'}
			>
				<ChevronLeftIcon className={`h-5 w-5 transition-transform ${collapsed ? 'rotate-180' : 'rotate-0'}`} />
			</button>

			<div className="flex w-[90px] flex-col items-center justify-center rounded-l-xl border border-slate-200 bg-white shadow-xl">
				{sidebarServices.map(service => {
					const Icon = serviceIconMap[service.key] || ServerStackIcon
					const tone = serviceToneMap[service.status] || serviceToneMap.loading

					return (
						<div
							key={service.key}
							className="group relative flex w-full flex-col items-center border-b border-slate-200 px-2 py-3 last:border-b-0"
						>
							<div className="relative">
								<Icon className={`h-7 w-7 ${tone.icon}`} />
								<span className={`absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full ${tone.dot}`} />
							</div>
							<span className="mt-2 text-center text-[11px] font-medium leading-4 text-slate-700">
								{service.label}
							</span>

							<div
								className={`pointer-events-none absolute right-[calc(100%+10px)] top-1/2 hidden w-64 -translate-y-1/2 rounded-md px-3 py-2 text-xs leading-5 text-white shadow-lg group-hover:block ${tone.tooltip}`}
							>
								{tooltipBody(service)}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default OperationsStatusSidebar
