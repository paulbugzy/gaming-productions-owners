import ResultParameter from "../ResultParameter";
import Session from "../Session";
import LoginRequest from "../LoginRequest";
import OwnerRequestRegistrationRequest from "../OwnerRequestRegistrationRequest";
import ForgotPasswordRequest from "../ForgotPasswordRequest";
import UpdatePasswordRequest from "../UpdatePasswordRequest";
import OwnerLocationDashboardResponse from "../OwnerLocationDashboardResponse";
import LineGraph from "../LineGraph";
import GraphMetric from "../GraphMetric";
import GraphItem from "../GraphItem";
import Location from "../Location";
import PerformanceMetric from "../PerformanceMetric";
import Machine from "../Machine";
import Person from "../Person";

class ModelProxyClass {
	/**
	 * Constructs a model-based BaseClass subclass based on the className
	 * @param {string} className
	 * @param {object} genericObject
	 * @return {ModelBaseClass}
	 */
	static createByClassName(className, genericObject) {
		switch (className) {
		case 'ResultParameter':
			return ResultParameter.create(genericObject);
		case 'Session':
			return Session.create(genericObject);
		case 'LoginRequest':
			return LoginRequest.create(genericObject);
		case 'OwnerRequestRegistrationRequest':
			return OwnerRequestRegistrationRequest.create(genericObject);
		case 'ForgotPasswordRequest':
			return ForgotPasswordRequest.create(genericObject);
		case 'UpdatePasswordRequest':
			return UpdatePasswordRequest.create(genericObject);
		case 'OwnerLocationDashboardResponse':
			return OwnerLocationDashboardResponse.create(genericObject);
		case 'LineGraph':
			return LineGraph.create(genericObject);
		case 'GraphMetric':
			return GraphMetric.create(genericObject);
		case 'GraphItem':
			return GraphItem.create(genericObject);
		case 'Location':
			return Location.create(genericObject);
		case 'PerformanceMetric':
			return PerformanceMetric.create(genericObject);
		case 'Machine':
			return Machine.create(genericObject);
		case 'Person':
			return Person.create(genericObject);
		default:
			throw new Error('Undefined model class: ' + className);
		}
	}
}

export default ModelProxyClass;
