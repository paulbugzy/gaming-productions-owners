import { useEffect, useRef } from 'react'

/**
 * modified version of useEffect that's executed only one time, at the mounting time.
 * @param {callback} effect
 */
function useEffectOnce(effect) {
	const effectRan = useRef(false)

	useEffect(() => {
		if (!effectRan.current) effect()
		return () => {
			effectRan.current = true
		}
	}, [effect])
}

export default useEffectOnce
