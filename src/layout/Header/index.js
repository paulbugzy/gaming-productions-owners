import { useLocation } from 'react-router-dom'
import { pages } from 'Routes'

import LocationSwitcher from './LocationSwitcher'

const Header = () => {
	const location = useLocation()
	const currentPath = `/${location.pathname?.split('/')[1]}`

	const pathName = Object.entries(pages).find(([, page]) => page.path === currentPath)?.[1]?.name
	return (
		<header className="py-10">
			<div className="flex flex-col justify-between px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:flex-row">
				<h1 className="text-3xl font-bold tracking-tight text-white">{pathName}</h1>
				<LocationSwitcher />
			</div>
		</header>
	)
}

export default Header
