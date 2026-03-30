/* eslint-disable react/prop-types */
import React, { createContext, useContext, useMemo, useState } from 'react'

export const GlobalContext = createContext({
	showSpinner: false,
	setShowSpinner: () => {}
})

const GlobalProvider = props => {
	const [showSpinner, setShowSpinner] = useState(false)

	const value = useMemo(() => {
		return {
			showSpinner,
			setShowSpinner
		}
	}, [showSpinner])

	return <GlobalContext.Provider value={value}>{props.children}</GlobalContext.Provider>
}

export const useGlobal = () => useContext(GlobalContext)
export default GlobalProvider
