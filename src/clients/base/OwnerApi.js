import ClientBaseClass from "./ClientBaseClass";
import OwnerLocationDashboardResponse from "../../models/OwnerLocationDashboardResponse";
import Session from "../../models/Session";

export default class OwnerApi extends ClientBaseClass {
	/**
	 * [Owner] gets the dashboard items for a location given the query
	 * @param {string} locationId
	 * @param {string} dateFrom
	 * @param {string} dateTo
	 * @param {{status200: function(OwnerLocationDashboardResponse), status404: function(string), error: function(error), else: function(integer, string)}} responseHandler
	 * @param {ClientOptions|null} options optional overrides on the DefaultClientOptions
	 */
	getLocationDashboard(locationId, dateFrom, dateTo, responseHandler, options) {
		responseHandler = this.generateResponseHandler(responseHandler, options);

		const url = '/owner/location_dashboard/' +
			(locationId ? encodeURI(locationId) : '') + '/' +
			(dateFrom ? encodeURI(dateFrom) : '') + '/' +
			(dateTo ? encodeURI(dateTo) : '');

		// noinspection Duplicates
		this.executeApiCall(url, 'get', null, null, options)
			.then(response => {
				switch (response.status) {
				case 200:
					if (responseHandler.status200) {
						response.json()
							.then(responseJson => {
								responseHandler.status200(OwnerLocationDashboardResponse.create(responseJson));
							})
							.catch(responseHandler.error);
						return;
					}
					break;
				case 404:
					if (responseHandler.status404) {
						response.text()
							.then(responseText => {
								responseHandler.status404(responseText);
							})
							.catch(responseHandler.error);
						return;
					}
					break;
				}

				// If we are here, we basically have a response statusCode that we were npt expecting or are not set to handle
				// Go ahead and fall back to the catch-all
				this.handleUnhandledResponse(response, responseHandler);
			})
			.catch(error => {
				responseHandler.error(error);
			});
	}

	/**
	 * [Owner] Attempts to trigger a Registration Request workflow.  IF the Email exists, this will send out an email with instructions on how to register.  Otherwise, this is a no-op.  Either way, this respond 200, so that this cannot be used to try and reverse-engineer for email address registrations.
	 * @param {OwnerRequestRegistrationRequest} request
	 * @param {{status200: function(string), error: function(error), else: function(integer, string)}} responseHandler
	 * @param {ClientOptions|null} options optional overrides on the DefaultClientOptions
	 */
	requestRegistration(request, responseHandler, options) {
		responseHandler = this.generateResponseHandler(responseHandler, options);

		const url = '/owner/request_registration';

		// noinspection Duplicates
		this.executeApiCall(url, 'post', request, 'json', options)
			.then(response => {
				switch (response.status) {
				case 200:
					if (responseHandler.status200) {
						response.text()
							.then(responseText => {
								responseHandler.status200(responseText);
							})
							.catch(responseHandler.error);
						return;
					}
					break;
				}

				// If we are here, we basically have a response statusCode that we were npt expecting or are not set to handle
				// Go ahead and fall back to the catch-all
				this.handleUnhandledResponse(response, responseHandler);
			})
			.catch(error => {
				responseHandler.error(error);
			});
	}

	/**
	 * [Owner] Attempts to trigger a Forgot / Reset Password workflow.  IF the Email exists, this will send out an email with instructions on how to reset their password.  Otherwise, this is a no-op.  Either way, this respond 200, so that this cannot be used to try and reverse-engineer for email address registrations.
	 * @param {ForgotPasswordRequest} request
	 * @param {{status200: function(string), error: function(error), else: function(integer, string)}} responseHandler
	 * @param {ClientOptions|null} options optional overrides on the DefaultClientOptions
	 */
	forgotPassword(request, responseHandler, options) {
		responseHandler = this.generateResponseHandler(responseHandler, options);

		const url = '/owner/forgot_password';

		// noinspection Duplicates
		this.executeApiCall(url, 'post', request, 'json', options)
			.then(response => {
				switch (response.status) {
				case 200:
					if (responseHandler.status200) {
						response.text()
							.then(responseText => {
								responseHandler.status200(responseText);
							})
							.catch(responseHandler.error);
						return;
					}
					break;
				}

				// If we are here, we basically have a response statusCode that we were npt expecting or are not set to handle
				// Go ahead and fall back to the catch-all
				this.handleUnhandledResponse(response, responseHandler);
			})
			.catch(error => {
				responseHandler.error(error);
			});
	}

	/**
	 * [Owner] Creates a NEW session object for the alternative login workflow (e.g. Forgot Password or Welcome).  This ID, HASH and CHECKSUM are generally created by the server, and sent via email to the user in a specially formulated link.
	 * @param {string} id
	 * @param {string} hash
	 * @param {string} checksum
	 * @param {{status200: function(Session), status404: function(string), error: function(error), else: function(integer, string)}} responseHandler
	 * @param {ClientOptions|null} options optional overrides on the DefaultClientOptions
	 */
	createSessionForAlternativeLoginWorkflow(id, hash, checksum, responseHandler, options) {
		responseHandler = this.generateResponseHandler(responseHandler, options);

		const url = '/owner/create_session/' +
			(id ? encodeURI(id) : '') + '/' +
			(hash ? encodeURI(hash) : '') + '/' +
			(checksum ? encodeURI(checksum) : '');

		// noinspection Duplicates
		this.executeApiCall(url, 'get', null, null, options)
			.then(response => {
				switch (response.status) {
				case 200:
					if (responseHandler.status200) {
						response.json()
							.then(responseJson => {
								responseHandler.status200(Session.create(responseJson));
							})
							.catch(responseHandler.error);
						return;
					}
					break;
				case 404:
					if (responseHandler.status404) {
						response.text()
							.then(responseText => {
								responseHandler.status404(responseText);
							})
							.catch(responseHandler.error);
						return;
					}
					break;
				}

				// If we are here, we basically have a response statusCode that we were npt expecting or are not set to handle
				// Go ahead and fall back to the catch-all
				this.handleUnhandledResponse(response, responseHandler);
			})
			.catch(error => {
				responseHandler.error(error);
			});
	}

	/**
	 * [Owners] Updates the person's profile -- requires id to be set to the currently logged in user's id
	 * @param {Person} request
	 * @param {{status200: function(string), status403: function(string), status409: function(string), error: function(error), else: function(integer, string)}} responseHandler
	 * @param {ClientOptions|null} options optional overrides on the DefaultClientOptions
	 */
	updateProfile(request, responseHandler, options) {
		responseHandler = this.generateResponseHandler(responseHandler, options);

		const url = '/owner/profile';

		// noinspection Duplicates
		this.executeApiCall(url, 'post', request, 'json', options)
			.then(response => {
				switch (response.status) {
				case 200:
					if (responseHandler.status200) {
						response.text()
							.then(responseText => {
								responseHandler.status200(responseText);
							})
							.catch(responseHandler.error);
						return;
					}
					break;
				case 403:
					if (responseHandler.status403) {
						response.text()
							.then(responseText => {
								responseHandler.status403(responseText);
							})
							.catch(responseHandler.error);
						return;
					}
					break;
				case 409:
					if (responseHandler.status409) {
						response.text()
							.then(responseText => {
								responseHandler.status409(responseText);
							})
							.catch(responseHandler.error);
						return;
					}
					break;
				}

				// If we are here, we basically have a response statusCode that we were npt expecting or are not set to handle
				// Go ahead and fall back to the catch-all
				this.handleUnhandledResponse(response, responseHandler);
			})
			.catch(error => {
				responseHandler.error(error);
			});
	}

	/**
	 * [Owners] Updates the user's password
	 * @param {UpdatePasswordRequest} request
	 * @param {{status200: function(string), status409: function(string), error: function(error), else: function(integer, string)}} responseHandler
	 * @param {ClientOptions|null} options optional overrides on the DefaultClientOptions
	 */
	updatePassword(request, responseHandler, options) {
		responseHandler = this.generateResponseHandler(responseHandler, options);

		const url = '/owner/update_password';

		// noinspection Duplicates
		this.executeApiCall(url, 'post', request, 'json', options)
			.then(response => {
				switch (response.status) {
				case 200:
					if (responseHandler.status200) {
						response.text()
							.then(responseText => {
								responseHandler.status200(responseText);
							})
							.catch(responseHandler.error);
						return;
					}
					break;
				case 409:
					if (responseHandler.status409) {
						response.text()
							.then(responseText => {
								responseHandler.status409(responseText);
							})
							.catch(responseHandler.error);
						return;
					}
					break;
				}

				// If we are here, we basically have a response statusCode that we were npt expecting or are not set to handle
				// Go ahead and fall back to the catch-all
				this.handleUnhandledResponse(response, responseHandler);
			})
			.catch(error => {
				responseHandler.error(error);
			});
	}

	/**
	 * Does a Person account exist with the specified email address
	 * @param {string} emailAddress
	 * @param {{status200: function(string), status404: function(string), error: function(error), else: function(integer, string)}} responseHandler
	 * @param {ClientOptions|null} options optional overrides on the DefaultClientOptions
	 */
	exists(emailAddress, responseHandler, options) {
		responseHandler = this.generateResponseHandler(responseHandler, options);

		const url = '/owner/exists/' +
			(emailAddress ? encodeURI(emailAddress) : '');

		// noinspection Duplicates
		this.executeApiCall(url, 'get', null, null, options)
			.then(response => {
				switch (response.status) {
				case 200:
					if (responseHandler.status200) {
						response.text()
							.then(responseText => {
								responseHandler.status200(responseText);
							})
							.catch(responseHandler.error);
						return;
					}
					break;
				case 404:
					if (responseHandler.status404) {
						response.text()
							.then(responseText => {
								responseHandler.status404(responseText);
							})
							.catch(responseHandler.error);
						return;
					}
					break;
				}

				// If we are here, we basically have a response statusCode that we were npt expecting or are not set to handle
				// Go ahead and fall back to the catch-all
				this.handleUnhandledResponse(response, responseHandler);
			})
			.catch(error => {
				responseHandler.error(error);
			});
	}

}
