import ClientBaseClass from "./ClientBaseClass";
import Location from "../../models/Location";

export default class LocationApi extends ClientBaseClass {
	/**
	 * [Owner] list of locations that I own
	 * @param {{status200: function(Location[]), error: function(error), else: function(integer, string)}} responseHandler
	 * @param {ClientOptions|null} options optional overrides on the DefaultClientOptions
	 */
	asOwner(responseHandler, options) {
		responseHandler = this.generateResponseHandler(responseHandler, options);

		const url = '/location/list/as_owner';

		// noinspection Duplicates
		this.executeApiCall(url, 'get', null, null, options)
			.then(response => {
				switch (response.status) {
				case 200:
					if (responseHandler.status200) {
						response.json()
							.then(responseJson => {
								responseHandler.status200(Location.createArray(responseJson));
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
