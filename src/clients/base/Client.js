import AuthenticationApi from "./AuthenticationApi";
import LocationApi from "./LocationApi";
import OwnerAdminApi from "./OwnerAdminApi";
import OwnerApi from "./OwnerApi";

/**
 * Use globally to access any of the API Client Methods for the WebService
 */
export default class Client {
}

/**
 * Use in a responseHandler if you want to ignore a given/specific response
 */
export function ignoreResponse() {
}

Client.AuthenticationApi = new AuthenticationApi();
Client.LocationApi = new LocationApi();
Client.OwnerAdminApi = new OwnerAdminApi();
Client.OwnerApi = new OwnerApi();
