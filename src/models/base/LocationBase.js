import ModelBaseClass from "@quasidea/oas-client-react/lib/ModelBaseClass";
import Location from "../Location";
import ModelProxyClass from "./ModelProxyClass";

/**
 * @class LocationBase
 * @extends ModelBaseClass
 * @property {number} id (int64)
 * @property {string} name
 * @property {string} licenseNumber
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
	ModelBaseClass.createModelProperty('dateFirstPerformance', 'datetime'),
];

export default LocationBase;
