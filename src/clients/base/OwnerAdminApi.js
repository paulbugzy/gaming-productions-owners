import ClientBaseClass from './ClientBaseClass'
import Location from '../../models/Location'

export default class OwnerAdminApi extends ClientBaseClass {
	permissions(responseHandler, options) {
		responseHandler = this.generateResponseHandler(responseHandler, options)

		const url = '/owner-admin/permissions'

		this.executeApiCall(url, 'get', null, null, options)
			.then(response => {
				switch (response.status) {
				case 200:
					if (responseHandler.status200) {
						response.json()
							.then(responseJson => {
								responseHandler.status200(responseJson)
							})
							.catch(responseHandler.error)
						return
					}
					break
				}

				this.handleUnhandledResponse(response, responseHandler)
			})
			.catch(error => {
				responseHandler.error(error)
			})
	}

	listLocations(responseHandler, options) {
		responseHandler = this.generateResponseHandler(responseHandler, options)

		const url = '/owner-admin/locations'

		this.executeApiCall(url, 'get', null, null, options)
			.then(response => {
				switch (response.status) {
				case 200:
					if (responseHandler.status200) {
						response.json()
							.then(responseJson => {
								responseHandler.status200(Location.createArray(responseJson))
							})
							.catch(responseHandler.error)
						return
					}
					break
				case 403:
					if (responseHandler.status403) {
						response.text()
							.then(responseText => {
								responseHandler.status403(responseText)
							})
							.catch(responseHandler.error)
						return
					}
					break
				}

				this.handleUnhandledResponse(response, responseHandler)
			})
			.catch(error => {
				responseHandler.error(error)
			})
	}

	createLocation(request, responseHandler, options) {
		responseHandler = this.generateResponseHandler(responseHandler, options)

		const url = '/owner-admin/locations'

		this.executeApiCall(url, 'post', request, 'json', options)
			.then(response => {
				switch (response.status) {
				case 201:
					if (responseHandler.status201) {
						response.json()
							.then(responseJson => {
								responseHandler.status201(Location.create(responseJson))
							})
							.catch(responseHandler.error)
						return
					}
					break
				case 403:
					if (responseHandler.status403) {
						response.text()
							.then(responseText => {
								responseHandler.status403(responseText)
							})
							.catch(responseHandler.error)
						return
					}
					break
				case 422:
					if (responseHandler.status422) {
						response.json()
							.then(responseJson => {
								responseHandler.status422(responseJson)
							})
							.catch(responseHandler.error)
						return
					}
					break
				}

				this.handleUnhandledResponse(response, responseHandler)
			})
			.catch(error => {
				responseHandler.error(error)
			})
	}

	updateLocation(id, request, responseHandler, options) {
		responseHandler = this.generateResponseHandler(responseHandler, options)

		const url = `/owner-admin/locations/${id}`

		this.executeApiCall(url, 'put', request, 'json', options)
			.then(response => {
				switch (response.status) {
				case 200:
					if (responseHandler.status200) {
						response.json()
							.then(responseJson => {
								responseHandler.status200(Location.create(responseJson))
							})
							.catch(responseHandler.error)
						return
					}
					break
				case 403:
					if (responseHandler.status403) {
						response.text()
							.then(responseText => {
								responseHandler.status403(responseText)
							})
							.catch(responseHandler.error)
						return
					}
					break
				case 422:
					if (responseHandler.status422) {
						response.json()
							.then(responseJson => {
								responseHandler.status422(responseJson)
							})
							.catch(responseHandler.error)
						return
					}
					break
				}

				this.handleUnhandledResponse(response, responseHandler)
			})
			.catch(error => {
				responseHandler.error(error)
			})
	}
}
