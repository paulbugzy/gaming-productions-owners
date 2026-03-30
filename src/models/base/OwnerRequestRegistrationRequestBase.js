import ModelBaseClass from "@quasidea/oas-client-react/lib/ModelBaseClass";
import OwnerRequestRegistrationRequest from "../OwnerRequestRegistrationRequest";
import ModelProxyClass from "./ModelProxyClass";

/**
 * @class OwnerRequestRegistrationRequestBase
 * @extends ModelBaseClass
 * @property {string} email
 */
class OwnerRequestRegistrationRequestBase extends ModelBaseClass {

	/**
	 * Instantiates a new instance of OwnerRequestRegistrationRequest based on the generic object being passed in (typically from a JSON object)
	 * @param {object} genericObject
	 * @return {OwnerRequestRegistrationRequest}
	 */
	static create(genericObject) {
		const newOwnerRequestRegistrationRequest = new OwnerRequestRegistrationRequest();
		newOwnerRequestRegistrationRequest.instantiate(_modelDefinition, genericObject, ModelProxyClass.createByClassName);
		return newOwnerRequestRegistrationRequest;
	}

	/**
	 * Instantiates a new array of OwnerRequestRegistrationRequest based on the generic array being passed in (typically from a JSON array)
	 * @param {[object]} genericArray
	 * @return {[OwnerRequestRegistrationRequest]}
	 */
	static createArray(genericArray) {
		if (genericArray === null) {
			return null;
		}

		const newOwnerRequestRegistrationRequestArray = [];
		genericArray.forEach(genericObject => {
			newOwnerRequestRegistrationRequestArray.push(OwnerRequestRegistrationRequest.create(genericObject));
		});
		return newOwnerRequestRegistrationRequestArray;
	}
}

const _modelDefinition = [
	ModelBaseClass.createModelProperty('email', 'string'),
];

export default OwnerRequestRegistrationRequestBase;
