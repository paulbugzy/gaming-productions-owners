import ModelBaseClass from "@quasidea/oas-client-react/lib/ModelBaseClass";
import LoginRequest from "../LoginRequest";
import ModelProxyClass from "./ModelProxyClass";

/**
 * @class LoginRequestBase
 * @extends ModelBaseClass
 * @property {string} email (email)
 * @property {string} password the password in plain text -- ignored for mobile application login
 * @property {string} fcmToken only for the Mobile application -- for Google Firebase Cloud Messaging, this is the device token for push notifications
 * @property {string} firstName only for the Mobile application -- first name according to MS Azure AD
 * @property {string} lastName only for the Mobile application -- last name according to MS Azure AD
 * @property {string} checksum only for the Mobile application -- checksum value of the login via MS Azure AD
 */
class LoginRequestBase extends ModelBaseClass {

	/**
	 * Instantiates a new instance of LoginRequest based on the generic object being passed in (typically from a JSON object)
	 * @param {object} genericObject
	 * @return {LoginRequest}
	 */
	static create(genericObject) {
		const newLoginRequest = new LoginRequest();
		newLoginRequest.instantiate(_modelDefinition, genericObject, ModelProxyClass.createByClassName);
		return newLoginRequest;
	}

	/**
	 * Instantiates a new array of LoginRequest based on the generic array being passed in (typically from a JSON array)
	 * @param {[object]} genericArray
	 * @return {[LoginRequest]}
	 */
	static createArray(genericArray) {
		if (genericArray === null) {
			return null;
		}

		const newLoginRequestArray = [];
		genericArray.forEach(genericObject => {
			newLoginRequestArray.push(LoginRequest.create(genericObject));
		});
		return newLoginRequestArray;
	}
}

const _modelDefinition = [
	ModelBaseClass.createModelProperty('email', 'string'),
	ModelBaseClass.createModelProperty('password', 'string'),
	ModelBaseClass.createModelProperty('fcmToken', 'string'),
	ModelBaseClass.createModelProperty('firstName', 'string'),
	ModelBaseClass.createModelProperty('lastName', 'string'),
	ModelBaseClass.createModelProperty('checksum', 'string'),
];

export default LoginRequestBase;
