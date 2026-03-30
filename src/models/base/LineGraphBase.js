import ModelBaseClass from "@quasidea/oas-client-react/lib/ModelBaseClass";
import LineGraph from "../LineGraph";
import ModelProxyClass from "./ModelProxyClass";

/**
 * @class LineGraphBase
 * @extends ModelBaseClass
 * @property {'Daily'|'Weekly'|'Monthly'} dateRange
 * @property {[GraphMetric]} graphMetrics
 */
class LineGraphBase extends ModelBaseClass {

	/**
	 * Instantiates a new instance of LineGraph based on the generic object being passed in (typically from a JSON object)
	 * @param {object} genericObject
	 * @return {LineGraph}
	 */
	static create(genericObject) {
		const newLineGraph = new LineGraph();
		newLineGraph.instantiate(_modelDefinition, genericObject, ModelProxyClass.createByClassName);
		return newLineGraph;
	}

	/**
	 * Instantiates a new array of LineGraph based on the generic array being passed in (typically from a JSON array)
	 * @param {[object]} genericArray
	 * @return {[LineGraph]}
	 */
	static createArray(genericArray) {
		if (genericArray === null) {
			return null;
		}

		const newLineGraphArray = [];
		genericArray.forEach(genericObject => {
			newLineGraphArray.push(LineGraph.create(genericObject));
		});
		return newLineGraphArray;
	}
}

const _modelDefinition = [
	ModelBaseClass.createModelProperty('dateRange', 'string'),
	ModelBaseClass.createModelProperty('graphMetrics', '[GraphMetric]'),
];

export default LineGraphBase;
