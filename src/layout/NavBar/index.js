import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, CalendarDaysIcon, XMarkIcon } from '@heroicons/react/24/outline'
import neonLogo from 'assets/logos/logo_neon.png'
import { cx } from 'class-variance-authority'
import { useCore } from 'contexts/core-context'
import React, { Fragment, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { pages } from 'Routes'
import { Avatar } from 'ui-toolkit-tailwind/src/components'

import OperationsCalendarModal from './OperationsCalendarModal'

const NavBar = () => {
	const location = useLocation()
	const currentPath = location.pathname?.substring(0, location.pathname.indexOf('/', 1))

	const { executeLogout, user } = useCore()
	const [showOperationsCalendar, setShowOperationsCalendar] = useState(false)
	const fullName = user ? `${user.firstName} ${user.lastName}` : ''

	const navigation = [pages.dashboard]
	const userNavigation = [
		...(user?.canManageLocations
			? [{ name: 'Manage Locations', path: pages.manageLocations.path }]
			: []),
		{ name: 'Edit Profile', path: '/edit_profile' },
		{ name: 'Sign out', onClick: executeLogout }
	]

	const showNavigation = navigation.length > 1
	const showProfileMenu = !!user

	return (
		<Disclosure as="nav" className="bg-gmpDarkBlue">
			{({ open }) => (
				<>
					<OperationsCalendarModal
						visible={showOperationsCalendar}
						onClose={() => setShowOperationsCalendar(false)}
					/>
					<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
						<div className="border-b border-gray-700">
							<div className="flex h-16 items-center justify-between px-4 sm:px-0">
								<div className="flex items-center">
									<Link to={pages.dashboard.path} className="flex flex-shrink-0 items-center">
										<img className="h-8 w-auto" src={neonLogo} alt="gmp_logo" />
										<span className="ml-2 hidden font-bold tracking-wide text-white sm:inline-block">
											GMP Owner&apos;s Portal
										</span>
									</Link>

									{showNavigation && (
										<div className="hidden md:block">
											<div className="ml-10 flex items-baseline space-x-4">
												{navigation.map(item => (
													<Link
														key={item.name}
														to={item.path}
														className={cx(
															item.path === currentPath
																? 'bg-gray-800 text-white'
																: 'text-gray-300 hover:bg-gray-700 hover:text-white',
															'rounded-md px-3 py-2 text-sm font-medium'
														)}
														aria-current={item.path === currentPath ? 'page' : undefined}
													>
														{item.name}
													</Link>
												))}
											</div>
										</div>
									)}
								</div>

								<div className="hidden md:block">
									<div className="ml-4 flex items-center md:ml-6">
										<button
											type="button"
											className="rounded-full p-2 text-gray-300 transition hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
											onClick={() => setShowOperationsCalendar(true)}
											aria-label="Open operations calendar"
										>
											<CalendarDaysIcon className="h-6 w-6" aria-hidden="true" />
										</button>

										{showProfileMenu && (
											<Menu as="div" className="relative ml-3">
												<div>
													<Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none">
														<span className="sr-only">Open user menu</span>
														<Avatar size="sm" name={fullName} />
													</Menu.Button>
												</div>
												<Transition
													as={Fragment}
													enter="transition ease-out duration-100"
													enterFrom="transform opacity-0 scale-95"
													enterTo="transform opacity-100 scale-100"
													leave="transition ease-in duration-75"
													leaveFrom="transform opacity-100 scale-100"
													leaveTo="transform opacity-0 scale-95"
												>
													<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
														<Menu.Item disabled>
															<div className="px-4 py-2 text-gray-700 opacity-75">
																<span className="block text-sm">{fullName}</span>
																<span className="block text-xs">{user.email}</span>
															</div>
														</Menu.Item>

														{userNavigation.map(item => (
															<Menu.Item key={item.name}>
																{({ active }) => (
																	<Link
																		to={item.path}
																		className={cx(
																			active ? 'bg-gray-100' : '',
																			'block px-4 py-2 text-sm text-gray-700'
																		)}
																		onClick={item.onClick}
																	>
																		{item.name}
																	</Link>
																)}
															</Menu.Item>
														))}
													</Menu.Items>
												</Transition>
											</Menu>
										)}
									</div>
								</div>

								<div className="-mr-2 flex md:hidden">
									<Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gmpDarkBlue p-2 text-gray-400 hover:bg-gmpDarkBlue hover:text-white focus:outline-none">
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
										)}
									</Disclosure.Button>
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="border-b border-gray-700 md:hidden">
						{showNavigation && (
							<div className="space-y-1 px-2 py-3 sm:px-3">
								{navigation.map(item => (
									<Disclosure.Button
										key={item.name}
										as="a"
										href={item.path}
										className={cx(
											item.current
												? 'bg-gray-900 text-white'
												: 'text-gray-300 hover:bg-gray-700 hover:text-white',
											'block rounded-md px-3 py-2 text-base font-medium'
										)}
										aria-current={item.current ? 'page' : undefined}
									>
										{item.name}
									</Disclosure.Button>
								))}
							</div>
						)}

						{showProfileMenu && (
							<div className={cx('border-gray-700 pb-3 pt-4', showNavigation && 'border-t')}>
								<div className="flex items-center px-5">
									<div className="flex-shrink-0">
										<Avatar size="md" name={fullName} />
									</div>
									<div className="ml-3">
										<div className="text-base font-medium leading-none text-white">{fullName}</div>
										<div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
									</div>
								</div>

								<div className="mt-3 space-y-1 px-2">
									<Disclosure.Button
										as="button"
										type="button"
										onClick={() => setShowOperationsCalendar(true)}
										className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
									>
										Operations Calendar
									</Disclosure.Button>

									{userNavigation.map(item => (
										<Disclosure.Button
											key={item.name}
											as={Link}
											to={item.path}
											onClick={item.onClick}
											className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
										>
											{item.name}
										</Disclosure.Button>
									))}
								</div>
							</div>
						)}
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}

export default NavBar
