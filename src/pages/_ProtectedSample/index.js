import React from 'react'

const ProtectedSample = () => {
	return (
		<div>
			Protected Sample Page
			<div>Can only see this page when user is logged in</div>
			<div>Will redirect to Login In Page if current login status is not Logged in</div>
		</div>
	)
}

export default ProtectedSample
