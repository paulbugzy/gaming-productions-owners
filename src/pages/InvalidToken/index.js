import { Link } from 'react-router-dom'

const InvalidToken = () => {
	return (
		<div>
			<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
				Token Expired
			</h1>
			<p className="w-full mt-6 text-base leading-7 text-gray-600 md:w-1/2 lg:w-2/5">
				Sorry, the login link is either invalid or has expired. If you would like to generate
				another link, please use the &quot;Forgot My Password&quot; feature on the login page, or if
				you need any support, please contact{' '}
				<a
					className="text-primary-700 hover:text-primary-600"
					href="mailto:support@gamingproductions.com"
					target="_blank"
					rel="noreferrer"
				>
					support@gamingproductions.com
				</a>
				.
			</p>
			<div className="mt-10">
				<Link to="/dashboard" className="text-sm font-semibold leading-7 text-primary-600">
					<span aria-hidden="true">&larr;</span> Back to home
				</Link>
			</div>
		</div>
	)
}

export default InvalidToken
