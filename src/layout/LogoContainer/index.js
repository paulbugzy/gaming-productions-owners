import logo from 'assets/logos/logo_bg_transparent.png'
import PropTypes from 'prop-types'

const LogoContainer = ({ title, children }) => {
	return (
		<div>
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img className="w-auto mx-auto h-15" src={logo} alt="GMP Logo" />
				<h2 className="mt-10 text-2xl font-bold leading-9 tracking-wide text-center text-gray-900 font-poppins">
					{title}
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">{children}</div>
		</div>
	)
}

LogoContainer.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node
}

export default LogoContainer
