import ModelBaseClass from "@quasidea/oas-client-react/lib/ModelBaseClass";
import Person from "../Person";
import ModelProxyClass from "./ModelProxyClass";

/**
 * @class PersonBase
 * @extends ModelBaseClass
 * @property {number} id (int64)
 * @property {string} name
 * @property {string} firstName
 * @property {string} lastName
 * @property {boolean} ownerReceivesEmailReportsFlag only for Owners
 * @property {string} email
 * @property {Date} dateLastAccess (date and time)
 */
class PersonBase extends ModelBaseClass {

	/**
	 * Instantiates a new instance of Person based on the generic object being passed in (typically from a JSON object)
	 * @param {object} genericObject
	 * @return {Person}
	 */
	static create(genericObject) {
		const newPerson = new Person();
		newPerson.instantiate(_modelDefinition, genericObject, ModelProxyClass.createByClassName);
		return newPerson;
	}

	/**
	 * Instantiates a new array of Person based on the generic array being passed in (typically from a JSON array)
	 * @param {[object]} genericArray
	 * @return {[Person]}
	 */
	static createArray(genericArray) {
		if (genericArray === null) {
			return null;
		}

		const newPersonArray = [];
		genericArray.forEach(genericObject => {
			newPersonArray.push(Person.create(genericObject));
		});
		return newPersonArray;
	}
}

const _modelDefinition = [
	ModelBaseClass.createModelProperty('id', 'integer'),
	ModelBaseClass.createModelProperty('name', 'string'),
	ModelBaseClass.createModelProperty('firstName', 'string'),
	ModelBaseClass.createModelProperty('lastName', 'string'),
	ModelBaseClass.createModelProperty('ownerReceivesEmailReportsFlag', 'boolean'),
	ModelBaseClass.createModelProperty('email', 'string'),
	ModelBaseClass.createModelProperty('dateLastAccess', 'datetime'),
];

export default PersonBase;
