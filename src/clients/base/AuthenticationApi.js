import ClientBaseClass from "./ClientBaseClass";
import Session from "../../models/Session";

export default class AuthenticationApi extends ClientBaseClass {
	/**
	 * Logs the user out
	 * @param {{status200: function(string), status403: function(string), error: function(error), else: function(integer, string)}} responseHandler
	 * @param {ClientOptions|null} options optional overrides on the DefaultClientOptions
	 */
	logout(responseHandler, options) {
		responseHandler = this.generateResponseHandler(responseHandler, options);

		const url = '/authentication/logout';

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
	 * [Owners] Logs user into the Owner Portal, creating a session token
	 * @param {LoginRequest} loginrequest
	 * @param {{status200: function(Session), status404: function(string), error: function(error), else: function(integer, string)}} responseHandler
	 * @param {ClientOptions|null} options optional overrides on the DefaultClientOptions
	 */
	ownerLogin(loginrequest, responseHandler, options) {
		responseHandler = this.generateResponseHandler(responseHandler, options);

		const url = '/authentication/login/owner';

		// noinspection Duplicates
		this.executeApiCall(url, 'post', loginrequest, 'json', options)
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
	 * Retrieves the session object associated with the specified sessionToken
	 * @param {string} sessionIdentifier
	 * @param {{status200: function(Session), status404: function(string), error: function(error), else: function(integer, string)}} responseHandler
	 * @param {ClientOptions|null} options optional overrides on the DefaultClientOptions
	 */
	getSession(sessionIdentifier, responseHandler, options) {
		responseHandler = this.generateResponseHandler(responseHandler, options);

		const url = '/authentication/session/' +
			(sessionIdentifier ? encodeURI(sessionIdentifier) : '');

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

}
