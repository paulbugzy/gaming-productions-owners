import ModelBaseClass from "@quasidea/oas-client-react/lib/ModelBaseClass";
import PerformanceMetric from "../PerformanceMetric";
import ModelProxyClass from "./ModelProxyClass";

/**
 * @class PerformanceMetricBase
 * @extends ModelBaseClass
 * @property {Date} dateLogged (date only) if this performance metric is for a single day, then that day is specified her
 * @property {Date} dateFrom (date only) if this performance metric is for an aggregate over a date range, then this is the start date for that range
 * @property {Date} dateTo (date only) if this performance metric is for an aggregate over a date range, then this is the end date for that range
 * @property {number} metricCount (integer) if this performance metric is for an aggregate over a date range, then the count of dates within that range that have metrics is set here
 * @property {number} locationId (int64) if performance metric is for a location, the locationId is specified here
 * @property {number} machineId (int64) if performance metric is for a machine, the machineId is specified here
 * @property {number} fundsIn
 * @property {number} fundsOut
 * @property {number} netTerminalIncome
 * @property {number} amountPlayed
 * @property {number} amountWon
 * @property {number} locationRevenue
 */
class PerformanceMetricBase extends ModelBaseClass {

	/**
	 * Instantiates a new instance of PerformanceMetric based on the generic object being passed in (typically from a JSON object)
	 * @param {object} genericObject
	 * @return {PerformanceMetric}
	 */
	static create(genericObject) {
		const newPerformanceMetric = new PerformanceMetric();
		newPerformanceMetric.instantiate(_modelDefinition, genericObject, ModelProxyClass.createByClassName);
		return newPerformanceMetric;
	}

	/**
	 * Instantiates a new array of PerformanceMetric based on the generic array being passed in (typically from a JSON array)
	 * @param {[object]} genericArray
	 * @return {[PerformanceMetric]}
	 */
	static createArray(genericArray) {
		if (genericArray === null) {
			return null;
		}

		const newPerformanceMetricArray = [];
		genericArray.forEach(genericObject => {
			newPerformanceMetricArray.push(PerformanceMetric.create(genericObject));
		});
		return newPerformanceMetricArray;
	}
}

const _modelDefinition = [
	ModelBaseClass.createModelProperty('dateLogged', 'datetime'),
	ModelBaseClass.createModelProperty('dateFrom', 'datetime'),
	ModelBaseClass.createModelProperty('dateTo', 'datetime'),
	ModelBaseClass.createModelProperty('metricCount', 'integer'),
	ModelBaseClass.createModelProperty('locationId', 'integer'),
	ModelBaseClass.createModelProperty('machineId', 'integer'),
	ModelBaseClass.createModelProperty('fundsIn', 'float'),
	ModelBaseClass.createModelProperty('fundsOut', 'float'),
	ModelBaseClass.createModelProperty('netTerminalIncome', 'float'),
	ModelBaseClass.createModelProperty('amountPlayed', 'float'),
	ModelBaseClass.createModelProperty('amountWon', 'float'),
	ModelBaseClass.createModelProperty('locationRevenue', 'float'),
];

export default PerformanceMetricBase;
