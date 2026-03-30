import { useCore } from 'contexts/core-context'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Sample = () => {
	// core data
	const { user } = useCore()
	// route params
	const params = useParams()

	const [data, setData] = useState()

	const fetchDataOnInit = async () => {
		const response = await new Promise(res => {
			setTimeout(() => res([1, 2, 3]), 2000)
		}, 2000)
		setData(response)
	}

	useEffect(() => {
		fetchDataOnInit()
	}, [])

	return (
		<div>
			Sample Page
			<div>person: {JSON.stringify(user, null, 2)}</div>
			<div>params: {JSON.stringify(params, null, 2)}</div>
			<div>data : {data ? JSON.stringify(data, null, 2) : 'loading...'}</div>
		</div>
	)
}

export default Sample
