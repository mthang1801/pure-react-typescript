import { Reducer } from "redux";
import customerTypes from "../actions/types/customer.types";
import { ICustomerState } from "../interfaces/customer.interfaces";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { _responseDataFailure, _responseDataStart, _responseDataSuccess } from "./state/response.util";
import { rootState } from "./state/root.states";

const initState: ICustomerState = {
	stateListCustomer: { ...rootState },
	stateCustomerById: { ...rootState },
	stateCreateCustomer: { ...rootState },
	stateUpdateCustomer: { ...rootState }
};

const customerReducer: Reducer<ICustomerState, ISyntheticAction> = (
	state: ICustomerState = initState,
	action: ISyntheticAction
) => {
	const { type, response } = action;

	const responseDataStart = _responseDataStart(response);
	const responseDataSuccess = _responseDataSuccess(response);
	const responseDataFailure = _responseDataFailure(response);

	switch (type) {
		case customerTypes.FETCH_CUSTOMERS_LIST_START: {
			const stateReducer: ICustomerState = {
				...state,
				stateListCustomer: responseDataStart
			};
			return stateReducer;
		}
		case customerTypes.FETCH_CUSTOMERS_LIST_SUCCESS: {
			const stateReducer: ICustomerState = {
				...state,
				stateListCustomer: responseDataSuccess
			};
			return stateReducer;
		}
		case customerTypes.FETCH_CUSTOMERS_LIST_FAILURE: {
			const stateReducer: ICustomerState = {
				...state,
				stateListCustomer: responseDataFailure
			};
			return stateReducer;
		}
		case customerTypes.CREATE_CUSTOMER_START: {
			const stateReducer: ICustomerState = {
				...state,
				stateCreateCustomer: responseDataStart
			};
			return stateReducer;
		}
		case customerTypes.CREATE_CUSTOMER_SUCCESS: {
			const stateReducer: ICustomerState = {
				...state,
				stateCreateCustomer: responseDataSuccess
			};
			return stateReducer;
		}
		case customerTypes.CREATE_CUSTOMER_FAILURE: {
			const stateReducer: ICustomerState = {
				...state,
				stateCreateCustomer: responseDataFailure
			};
			return stateReducer;
		}
		case customerTypes.GET_CUSTOMER_BY_ID_START: {
			const stateReducer: ICustomerState = {
				...state,
				stateCustomerById: responseDataStart
			};
			return stateReducer;
		}
		case customerTypes.GET_CUSTOMER_BY_ID_SUCCESS: {
			const stateReducer: ICustomerState = {
				...state,
				stateCustomerById: responseDataSuccess
			};
			return stateReducer;
		}
		case customerTypes.GET_CUSTOMER_BY_ID_FAILURE: {
			const stateReducer: ICustomerState = {
				...state,
				stateCustomerById: responseDataFailure
			};
			return stateReducer;
		}
		case customerTypes.UPDATE_CUSTOMER_START: {
			const stateReducer: ICustomerState = {
				...state,
				stateUpdateCustomer: responseDataStart
			};
			return stateReducer;
		}
		case customerTypes.UPDATE_CUSTOMER_SUCCESS: {
			const stateReducer: ICustomerState = {
				...state,
				stateUpdateCustomer: responseDataSuccess
			};
			return stateReducer;
		}
		case customerTypes.UPDATE_CUSTOMER_FAILURE: {
			const stateReducer: ICustomerState = {
				...state,
				stateUpdateCustomer: responseDataFailure
			};
			return stateReducer;
		}
		default:
			return state;
	}
};

export default customerReducer;
