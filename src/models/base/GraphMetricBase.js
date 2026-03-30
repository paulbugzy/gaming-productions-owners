import ModelBaseClass from "@quasidea/oas-client-react/lib/ModelBaseClass";
import GraphMetric from "../GraphMetric";
import ModelProxyClass from "./ModelProxyClass";

/**
 * @class GraphMetricBase
 * @extends ModelBaseClass
 * @property {string} label
 * @property {[GraphItem]} graphItems
 */
class GraphMetricBase extends ModelBaseClass {

	/**
	 * Instantiates a new instance of GraphMetric based on the generic object being passed in (typically from a JSON object)
	 * @param {object} genericObject
	 * @return {GraphMetric}
	 */
	static create(genericObject) {
		const newGraphMetric = new GraphMetric();
		newGraphMetric.instantiate(_modelDefinition, genericObject, ModelProxyClass.createByClassName);
		return newGraphMetric;
	}

	/**
	 * Instantiates a new array of GraphMetric based on the generic array being passed in (typically from a JSON array)
	 * @param {[object]} genericArray
	 * @return {[GraphMetric]}
	 */
	static createArray(genericArray) {
		if (genericArray === null) {
			return null;
		}

		const newGraphMetricArray = [];
		genericArray.forEach(genericObject => {
			newGraphMetricArray.push(GraphMetric.create(genericObject));
		});
		return newGraphMetricArray;
	}
}

const _modelDefinition = [
	ModelBaseClass.createModelProperty('label', 'string'),
	ModelBaseClass.createModelProperty('graphItems', '[GraphItem]'),
];

export default GraphMetricBase;
