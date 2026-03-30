import { Outlet } from 'react-router-dom'

import Header from './Header'
import NavBar from './NavBar'
import PatternBackground from './PatternBackground'

export const MainLayout = () => {
	return (
		<div className="min-h-full">
			<div className="pb-32 bg-gmpDarkBlue">
				<NavBar />
				<Header />
			</div>

			<main className="-mt-32">
				<div className="px-4 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="px-5 py-6 bg-white rounded-lg shadow sm:px-6">
						<Outlet />
					</div>
				</div>
			</main>
		</div>
	)
}

export const PatternBackgroundLayout = () => {
	return (
		<div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
			<PatternBackground />

			<Outlet />
		</div>
	)
}
