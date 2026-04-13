/* eslint-disable react/prop-types */
import Client from 'clients/base/Client'
import useLocalStorage, { LOCAL_STORAGE_KEY } from 'hooks/useLocalStorage'
import Location from 'models/Location'
import Person from 'models/Person'
import Session from 'models/Session'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export const CoreContext = createContext({
	isAppReady: false,
	/**
	 * @type {Session|null}
	 */
	session: null,
	/**
	 * @type {Person|null}
	 */
	user: null,
	isLoggedIn: false,
	/**
	 * @type {Location}
	 */
	location: null,
	locations: [],
	initialize: () => {},
	updateSession: () => {},
	refreshSession: () => {},
	executeLogout: () => {},
	updateLocation: () => {},
	updateLocations: () => {}
})

const CoreProvider = props => {
	const [systemSettings, setSystemSettings] = useState()
	const [hasInitSession, setHasInitSession] = useState(false)
	const [session, setSession, removeSession] = useLocalStorage(LOCAL_STORAGE_KEY.session)
	const [location, setLocation] = useState()
	const [locations, setLocations] = useState([])

	const initSystemSettings = () => {
		// TODO: get system settings api
		setSystemSettings({})
	}

	// get system settings once we have a session
	useEffect(() => {
		if (session) initSystemSettings()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session])

	const getSession = async callback => {
		// verify session
		const id = session.id
		const hash = session.hash
		if (id && hash) {
			const identifier = `${id}-${hash}`

			Client.AuthenticationApi.getSession(identifier, {
				status200: responseSession => {
					setSession(responseSession)
					if (callback) callback(responseSession)
				},
				status404: () => {
					setSession(null)
					if (callback) callback(null)
				},
				error: () => {
					if (callback) callback(session)
				}
			})
		}
	}

	const initSession = async () => {
		if (session) getSession(() => setHasInitSession(true))
		else setHasInitSession(true)
	}

	const initialize = () => {
		initSession()
	}

	const executeLogout = () => {
		removeSession()
	}

	const contextValue = useMemo(
		() => ({
			isAppReady: hasInitSession,
			session,
			user: session?.person || null,
			isLoggedIn: !!session,
			initialize,
			updateSession: setSession,
			refreshSession: getSession,
			executeLogout,
			location,
			locations,
			updateLocation: setLocation,
			updateLocations: setLocations
		}),
		// We only want to reproduce the context value when "session", "location" and "systemSettings" have changed
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[session, systemSettings, hasInitSession, location, locations]
	)
	return <CoreContext.Provider value={contextValue}>{props.children}</CoreContext.Provider>
}

export const useCore = () => useContext(CoreContext)
export default CoreProvider
