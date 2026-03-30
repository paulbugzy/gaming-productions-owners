import ModelBaseClass from "@quasidea/oas-client-react/lib/ModelBaseClass";
import GraphItem from "../GraphItem";
import ModelProxyClass from "./ModelProxyClass";

/**
 * @class GraphItemBase
 * @extends ModelBaseClass
 * @property {Date} date (date only)
 * @property {number} amount
 */
class GraphItemBase extends ModelBaseClass {

	/**
	 * Instantiates a new instance of GraphItem based on the generic object being passed in (typically from a JSON object)
	 * @param {object} genericObject
	 * @return {GraphItem}
	 */
	static create(genericObject) {
		const newGraphItem = new GraphItem();
		newGraphItem.instantiate(_modelDefinition, genericObject, ModelProxyClass.createByClassName);
		return newGraphItem;
	}

	/**
	 * Instantiates a new array of GraphItem based on the generic array being passed in (typically from a JSON array)
	 * @param {[object]} genericArray
	 * @return {[GraphItem]}
	 */
	static createArray(genericArray) {
		if (genericArray === null) {
			return null;
		}

		const newGraphItemArray = [];
		genericArray.forEach(genericObject => {
			newGraphItemArray.push(GraphItem.create(genericObject));
		});
		return newGraphItemArray;
	}
}

const _modelDefinition = [
	ModelBaseClass.createModelProperty('date', 'datetime'),
	ModelBaseClass.createModelProperty('amount', 'float'),
];

export default GraphItemBase;
