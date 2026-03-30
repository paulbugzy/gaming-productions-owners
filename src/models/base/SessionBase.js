import ModelBaseClass from "@quasidea/oas-client-react/lib/ModelBaseClass";
import Session from "../Session";
import ModelProxyClass from "./ModelProxyClass";

/**
 * @class SessionBase
 * @extends ModelBaseClass
 * @property {number} id (int64)
 * @property {Person} person
 * @property {string} hash
 * @property {Date} dateCreated (date and time)
 * @property {Date} dateLastAccess (date and time)
 */
class SessionBase extends ModelBaseClass {

	/**
	 * Instantiates a new instance of Session based on the generic object being passed in (typically from a JSON object)
	 * @param {object} genericObject
	 * @return {Session}
	 */
	static create(genericObject) {
		const newSession = new Session();
		newSession.instantiate(_modelDefinition, genericObject, ModelProxyClass.createByClassName);
		return newSession;
	}

	/**
	 * Instantiates a new array of Session based on the generic array being passed in (typically from a JSON array)
	 * @param {[object]} genericArray
	 * @return {[Session]}
	 */
	static createArray(genericArray) {
		if (genericArray === null) {
			return null;
		}

		const newSessionArray = [];
		genericArray.forEach(genericObject => {
			newSessionArray.push(Session.create(genericObject));
		});
		return newSessionArray;
	}
}

const _modelDefinition = [
	ModelBaseClass.createModelProperty('id', 'integer'),
	ModelBaseClass.createModelProperty('person', 'Person'),
	ModelBaseClass.createModelProperty('hash', 'string'),
	ModelBaseClass.createModelProperty('dateCreated', 'datetime'),
	ModelBaseClass.createModelProperty('dateLastAccess', 'datetime'),
];

export default SessionBase;
