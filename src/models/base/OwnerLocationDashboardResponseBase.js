import ModelBaseClass from "@quasidea/oas-client-react/lib/ModelBaseClass";
import OwnerLocationDashboardResponse from "../OwnerLocationDashboardResponse";
import ModelProxyClass from "./ModelProxyClass";

/**
 * @class OwnerLocationDashboardResponseBase
 * @extends ModelBaseClass
 * @property {PerformanceMetric} locationPerformanceMetric the Location Totals performance metric
 * @property {PerformanceMetric} locationYoyPerformanceMetric the Year-over-Year Location Totals performance metric, if available/applicable
 * @property {[Machine]} machines
 * @property {[PerformanceMetric]} machinePerformanceMetrics the performance metrics for any machines during this time period
 * @property {boolean} payPeriodRecentlyClosedFlag this is TRUE if yesterday was the last day of the most recent pay period
 * @property {PerformanceMetric} payPeriodPerformanceMetric the Location Totals performance metric for this specific pay period
 * @property {LineGraph} performanceOverTime
 */
class OwnerLocationDashboardResponseBase extends ModelBaseClass {

	/**
	 * Instantiates a new instance of OwnerLocationDashboardResponse based on the generic object being passed in (typically from a JSON object)
	 * @param {object} genericObject
	 * @return {OwnerLocationDashboardResponse}
	 */
	static create(genericObject) {
		const newOwnerLocationDashboardResponse = new OwnerLocationDashboardResponse();
		newOwnerLocationDashboardResponse.instantiate(_modelDefinition, genericObject, ModelProxyClass.createByClassName);
		return newOwnerLocationDashboardResponse;
	}

	/**
	 * Instantiates a new array of OwnerLocationDashboardResponse based on the generic array being passed in (typically from a JSON array)
	 * @param {[object]} genericArray
	 * @return {[OwnerLocationDashboardResponse]}
	 */
	static createArray(genericArray) {
		if (genericArray === null) {
			return null;
		}

		const newOwnerLocationDashboardResponseArray = [];
		genericArray.forEach(genericObject => {
			newOwnerLocationDashboardResponseArray.push(OwnerLocationDashboardResponse.create(genericObject));
		});
		return newOwnerLocationDashboardResponseArray;
	}
}

const _modelDefinition = [
	ModelBaseClass.createModelProperty('locationPerformanceMetric', 'PerformanceMetric'),
	ModelBaseClass.createModelProperty('locationYoyPerformanceMetric', 'PerformanceMetric'),
	ModelBaseClass.createModelProperty('machines', '[Machine]'),
	ModelBaseClass.createModelProperty('machinePerformanceMetrics', '[PerformanceMetric]'),
	ModelBaseClass.createModelProperty('payPeriodRecentlyClosedFlag', 'boolean'),
	ModelBaseClass.createModelProperty('payPeriodPerformanceMetric', 'PerformanceMetric'),
	ModelBaseClass.createModelProperty('performanceOverTime', 'LineGraph'),
];

export default OwnerLocationDashboardResponseBase;
