import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import neonLogo from 'assets/logos/logo_neon.png'
import { cx } from 'class-variance-authority'
import { useCore } from 'contexts/core-context'
import React, { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { pages } from 'Routes'
import { Avatar } from 'ui-toolkit-tailwind/src/components'

const NavBar = () => {
	const location = useLocation()
	const currentPath = location.pathname?.substring(0, location.pathname.indexOf('/', 1))

	const { executeLogout, user } = useCore()
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
					<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
						<div className="border-b border-gray-700">
							<div className="flex items-center justify-between h-16 px-4 sm:px-0">
								<div className="flex items-center">
									<Link to={pages.dashboard.path} className="flex items-center flex-shrink-0">
										<img className="w-auto h-8" src={neonLogo} alt="gmp_logo" />
										<span className="hidden ml-2 font-bold tracking-wide text-white sm:inline-block">
											GMP Owner&apos;s Portal
										</span>
									</Link>

									{showNavigation && (
										<div className="hidden md:block">
											<div className="flex items-baseline ml-10 space-x-4">
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
									<div className="flex items-center ml-4 md:ml-6">
										{/* Profile dropdown */}
										{showProfileMenu && (
											<Menu as="div" className="relative ml-3">
												<div>
													<Menu.Button className="flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none">
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
													<Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
								<div className="flex -mr-2 md:hidden">
									{/* Mobile menu button */}
									<Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md bg-gmpDarkBlue hover:bg-gmpDarkBlue hover:text-white focus:outline-none">
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XMarkIcon className="block w-6 h-6" aria-hidden="true" />
										) : (
											<Bars3Icon className="block w-6 h-6" aria-hidden="true" />
										)}
									</Disclosure.Button>
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="border-b border-gray-700 md:hidden">
						{showNavigation && (
							<div className="px-2 py-3 space-y-1 sm:px-3">
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
							<div className={cx('pt-4 pb-3 border-gray-700', showNavigation && 'border-t')}>
								<div className="flex items-center px-5">
									<div className="flex-shrink-0">
										<Avatar size="md" name={fullName} />
									</div>
									<div className="ml-3">
										<div className="text-base font-medium leading-none text-white">{fullName}</div>
										<div className="text-sm font-medium leading-none text-gray-400">
											{user.email}
										</div>
									</div>
								</div>

								<div className="px-2 mt-3 space-y-1">
									{userNavigation.map(item => (
										<Disclosure.Button
											key={item.name}
											as={Link}
											to={item.path}
											onClick={item.onClick}
											className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
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
