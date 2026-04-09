import ModelBaseClass from "@quasidea/oas-client-react/lib/ModelBaseClass";
import Location from "../Location";
import ModelProxyClass from "./ModelProxyClass";

/**
 * @class LocationBase
 * @extends ModelBaseClass
 * @property {number} id (int64)
 * @property {string} name
 * @property {string} licenseNumber
 * @property {string} vgt1
 * @property {string} vgt2
 * @property {string} vgt3
 * @property {string} vgt4
 * @property {string} vgt5
 * @property {string} vgt6
 * @property {[string]} ownerEmails
 * @property {Date} dateFirstPerformance (date only)
 */
class LocationBase extends ModelBaseClass {

	/**
	 * Instantiates a new instance of Location based on the generic object being passed in (typically from a JSON object)
	 * @param {object} genericObject
	 * @return {Location}
	 */
	static create(genericObject) {
		const newLocation = new Location();
		newLocation.instantiate(_modelDefinition, genericObject, ModelProxyClass.createByClassName);
		return newLocation;
	}

	/**
	 * Instantiates a new array of Location based on the generic array being passed in (typically from a JSON array)
	 * @param {[object]} genericArray
	 * @return {[Location]}
	 */
	static createArray(genericArray) {
		if (genericArray === null) {
			return null;
		}

		const newLocationArray = [];
		genericArray.forEach(genericObject => {
			newLocationArray.push(Location.create(genericObject));
		});
		return newLocationArray;
	}
}

const _modelDefinition = [
	ModelBaseClass.createModelProperty('id', 'integer'),
	ModelBaseClass.createModelProperty('name', 'string'),
	ModelBaseClass.createModelProperty('licenseNumber', 'string'),
	ModelBaseClass.createModelProperty('vgt1', 'string'),
	ModelBaseClass.createModelProperty('vgt2', 'string'),
	ModelBaseClass.createModelProperty('vgt3', 'string'),
	ModelBaseClass.createModelProperty('vgt4', 'string'),
	ModelBaseClass.createModelProperty('vgt5', 'string'),
	ModelBaseClass.createModelProperty('vgt6', 'string'),
	ModelBaseClass.createModelProperty('ownerEmails', 'array'),
	ModelBaseClass.createModelProperty('dateFirstPerformance', 'datetime'),
];

export default LocationBase;
