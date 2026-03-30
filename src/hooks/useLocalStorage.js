import { useState } from 'react'

// All available keys should be listed here
export const LOCAL_STORAGE_KEY = {
	session: 'session',
	storedEmail: 'storedEmail'
}

/**
 * @param {string} key please use the key enum that is export from this hook
 * @param {*} initialValue optional
 * @returns {[value, setFunc, removeFunc]}
 */
function useLocalStorage(key, initialValue) {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState(() => {
		if (typeof window === 'undefined') {
			return initialValue
		}
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key)
			// Parse stored json or if none return initialValue
			return item ? JSON.parse(item) : initialValue || null
		} catch (error) {
			// If error also return initialValue
			console.error(error)
			return initialValue
		}
	})
	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = value => {
		try {
			// Allow value to be a function so we have same API as useState
			const valueToStore = value instanceof Function ? value(storedValue) : value
			// Save state
			setStoredValue(valueToStore)
			// Save to local storage
			if (typeof window !== 'undefined') {
				window.localStorage.setItem(key, JSON.stringify(valueToStore))
			}
		} catch (error) {
			// A more advanced implementation would handle the error case
			console.log(error)
		}
	}

	const resetValue = () => {
		try {
			setStoredValue(initialValue)
			if (typeof window !== 'undefined') {
				window.localStorage.removeItem(key)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return [storedValue, setValue, resetValue]
}

export default useLocalStorage
