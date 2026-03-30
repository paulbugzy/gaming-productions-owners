import { FingerPrintIcon, HomeIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { cx } from 'class-variance-authority'
import PropTypes from 'prop-types'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { pages } from 'Routes'

const EditProfile = () => {
	const location = useLocation()
	const currentPath = location.pathname?.replace('/edit_profile/', '')

	return (
		<div className="lg:flex lg:gap-x-16">
			<aside className="flex py-4 overflow-x-auto border-b border-gray-900/5 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
				<nav className="flex-none px-4 sm:px-6 lg:px-0">
					<ul className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
						<li className="lg:mt-[-32px] lg:mb-[32px]">
							<Link
								to={pages.dashboard.path}
								className="flex py-2 pl-2 pr-3 text-sm font-semibold leading-6 text-gray-700 rounded-md hover:text-primary-600 group gap-x-3"
							>
								<HomeIcon
									className={cx('text-gray-400 group-hover:text-primary-600', 'h-6 w-6 shrink-0')}
									aria-hidden="true"
								/>
								<span className="hidden sm:block">Dashboard</span>
							</Link>
						</li>

						<NavItem
							currentPath={currentPath}
							page={pages.editProfile.children.personalInformation}
							icon={UserCircleIcon}
						/>
						<NavItem
							currentPath={currentPath}
							page={pages.editProfile.children.changePassword}
							icon={FingerPrintIcon}
						/>
					</ul>
				</nav>
			</aside>
			<main className="px-4 pt-4 sm:px-6 lg:flex-auto lg:px-0 lg:pt-20">
				<Outlet />
			</main>
		</div>
	)
}

const NavItem = ({ currentPath, page, icon: Icon }) => {
	return (
		<li>
			<Link
				to={page.path}
				className={cx(
					currentPath === page.path
						? 'bg-gray-50 text-primary-600'
						: 'text-gray-700 hover:text-primary-600 hover:bg-gray-50',
					'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
				)}
			>
				{Icon && (
					<Icon
						className={cx(
							currentPath === page.path
								? 'text-primary-600'
								: 'text-gray-400 group-hover:text-primary-600',
							'h-6 w-6 shrink-0'
						)}
						aria-hidden="true"
					/>
				)}
				{page.name}
			</Link>
		</li>
	)
}
NavItem.propTypes = {
	currentPath: PropTypes.string,
	page: PropTypes.shape({
		path: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}),
	icon: PropTypes.object
}

export default EditProfile
