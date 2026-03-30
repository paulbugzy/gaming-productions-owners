import ModelBaseClass from "@quasidea/oas-client-react/lib/ModelBaseClass";
import Machine from "../Machine";
import ModelProxyClass from "./ModelProxyClass";

/**
 * @class MachineBase
 * @extends ModelBaseClass
 * @property {number} id (int64)
 * @property {number} locationId (int64)
 * @property {string} name
 * @property {string} spotName
 * @property {string} macAddress
 * @property {string} licenseNumber
 * @property {Date} dateLastPerformanceLogged (date only) date string representing yesterday
 */
class MachineBase extends ModelBaseClass {

	/**
	 * Instantiates a new instance of Machine based on the generic object being passed in (typically from a JSON object)
	 * @param {object} genericObject
	 * @return {Machine}
	 */
	static create(genericObject) {
		const newMachine = new Machine();
		newMachine.instantiate(_modelDefinition, genericObject, ModelProxyClass.createByClassName);
		return newMachine;
	}

	/**
	 * Instantiates a new array of Machine based on the generic array being passed in (typically from a JSON array)
	 * @param {[object]} genericArray
	 * @return {[Machine]}
	 */
	static createArray(genericArray) {
		if (genericArray === null) {
			return null;
		}

		const newMachineArray = [];
		genericArray.forEach(genericObject => {
			newMachineArray.push(Machine.create(genericObject));
		});
		return newMachineArray;
	}
}

const _modelDefinition = [
	ModelBaseClass.createModelProperty('id', 'integer'),
	ModelBaseClass.createModelProperty('locationId', 'integer'),
	ModelBaseClass.createModelProperty('name', 'string'),
	ModelBaseClass.createModelProperty('spotName', 'string'),
	ModelBaseClass.createModelProperty('macAddress', 'string'),
	ModelBaseClass.createModelProperty('licenseNumber', 'string'),
	ModelBaseClass.createModelProperty('dateLastPerformanceLogged', 'datetime'),
];

export default MachineBase;
