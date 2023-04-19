import { Reducer } from "redux";

import ordersTypes from "../actions/types/orders.types";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IOrdersState } from "../interfaces/orders.interfaces";

const initState: IOrdersState = {
	stateListOrder: { ...rootState },
	stateOrderById: { ...rootState },
	stateCreateOneOrder: { ...rootState },
	stateUpdateOneOrder: { ...rootState },
	stateHistoryOrderById: { ...rootState },
	stateSyncAllOrder: { ...rootState },
	stateUpdateOrderByIdWithMethod: { ...rootState },
	stateGetPreOrders: { ...rootState },
	stateGetPreOrdersById: { ...rootState },
	stateUpdateOrdersStatus: { ...rootState }
};

const ordersReducer: Reducer<IOrdersState, ISyntheticAction> = (
	state: IOrdersState = initState,
	action: ISyntheticAction
) => {
	const { type, response } = action;

	switch (type) {
		/*************************** START *************************/
		/*                   GET ALL ORDER STATUS                  */

		case ordersTypes.START_GET_LIST_ORDER: {
			const stateReducer: IOrdersState = {
				...state,
				stateListOrder: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case ordersTypes.GET_LIST_ORDER_SUCCESS: {
			const stateReducer: IOrdersState = {
				...state,
				stateListOrder: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case ordersTypes.GET_LIST_ORDER_FAILURE: {
			const stateReducer: IOrdersState = {
				...state,
				stateListOrder: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		/**************************** END **************************/

		/*************************** START *************************/
		/*                   GET ORDER STATUS BY ID                */

		case ordersTypes.START_GET_ORDER_BY_ID: {
			const stateReducer: IOrdersState = {
				...state,
				stateOrderById: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case ordersTypes.GET_ORDER_BY_ID_SUCCESS: {
			const stateReducer: IOrdersState = {
				...state,
				stateOrderById: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case ordersTypes.GET_ORDER_BY_ID_FAILURE: {
			const stateReducer: IOrdersState = {
				...state,
				stateOrderById: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		/**************************** END **************************/

		/*************************** START *************************/
		/*                  CREATE ONE ORDER STATUS                */

		case ordersTypes.START_CREATE_ONE_ORDER: {
			const stateReducer: IOrdersState = {
				...state,
				stateCreateOneOrder: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case ordersTypes.CREATE_ONE_ORDER_SUCCESS: {
			const stateReducer: IOrdersState = {
				...state,
				stateCreateOneOrder: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case ordersTypes.CREATE_ONE_ORDER_FAILURE: {
			const stateReducer: IOrdersState = {
				...state,
				stateCreateOneOrder: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		/**************************** END **************************/

		/*************************** START *************************/
		/*                  UPDATE ONE ORDER STATUS                */

		case ordersTypes.START_UPDATE_ONE_ORDER: {
			const stateReducer: IOrdersState = {
				...state,
				stateUpdateOneOrder: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case ordersTypes.UPDATE_ONE_ORDER_SUCCESS: {
			const stateReducer: IOrdersState = {
				...state,
				stateUpdateOneOrder: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case ordersTypes.UPDATE_ONE_ORDER_FAILURE: {
			const stateReducer: IOrdersState = {
				...state,
				stateUpdateOneOrder: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		/**************************** END **************************/

		/*************************** START *************************/
		/*                  GET HISTORY ORDER BY ID                */

		case ordersTypes.START_GET_ORDER_HISTORY_BY_ID: {
			const stateReducer: IOrdersState = {
				...state,
				stateHistoryOrderById: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case ordersTypes.GET_ORDER_HISTORY_BY_ID_SUCCESS: {
			const stateReducer: IOrdersState = {
				...state,
				stateHistoryOrderById: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case ordersTypes.GET_ORDER_HISTORY_BY_ID_FAILURE: {
			const stateReducer: IOrdersState = {
				...state,
				stateHistoryOrderById: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		/**************************** END **************************/

		/*************************** START *************************/
		/*                     SYNC ALL ORDERS                     */

		case ordersTypes.START_SYNC_ALL_ORDER: {
			const stateReducer: IOrdersState = {
				...state,
				stateSyncAllOrder: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case ordersTypes.SYNC_ALL_ORDER_SUCCESS: {
			const stateReducer: IOrdersState = {
				...state,
				stateSyncAllOrder: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case ordersTypes.SYNC_ALL_ORDER_FAILURE: {
			const stateReducer: IOrdersState = {
				...state,
				stateSyncAllOrder: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		/**************************** END **************************/

		/*************************** START *************************/
		/*              UPDATE ORDER BY ID WITH METHOD             */

		case ordersTypes.START_UPDATE_ORDER_BY_ID_WITH_METHOD: {
			const stateReducer: IOrdersState = {
				...state,
				stateUpdateOrderByIdWithMethod: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case ordersTypes.UPDATE_ORDER_BY_ID_WITH_METHOD_SUCCESS: {
			const stateReducer: IOrdersState = {
				...state,
				stateUpdateOrderByIdWithMethod: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case ordersTypes.UPDATE_ORDER_BY_ID_WITH_METHOD_FAILURE: {
			const stateReducer: IOrdersState = {
				...state,
				stateUpdateOrderByIdWithMethod: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		/**************************** END **************************/

		case ordersTypes.START_GET_PRE_ORDERS: {
			const stateReducer: IOrdersState = {
				...state,
				stateGetPreOrders: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case ordersTypes.GET_PRE_ORDERS_SUCCESS: {
			const stateReducer: IOrdersState = {
				...state,
				stateGetPreOrders: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case ordersTypes.GET_PRE_ORDERS_FAILURE: {
			const stateReducer: IOrdersState = {
				...state,
				stateGetPreOrders: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		case ordersTypes.START_GET_PRE_ORDERS_BY_ID: {
			const stateReducer: IOrdersState = {
				...state,
				stateGetPreOrdersById: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case ordersTypes.GET_PRE_ORDERS_BY_ID_SUCCESS: {
			const stateReducer: IOrdersState = {
				...state,
				stateGetPreOrdersById: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case ordersTypes.GET_PRE_ORDERS_BY_ID_FAILURE: {
			const stateReducer: IOrdersState = {
				...state,
				stateGetPreOrdersById: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		case ordersTypes.START_UPDATE_STATUS: {
			const stateReducer: IOrdersState = {
				...state,
				stateUpdateOrdersStatus: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case ordersTypes.UPDATE_STATUS_SUCCESS: {
			const stateReducer: IOrdersState = {
				...state,
				stateUpdateOrdersStatus: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case ordersTypes.UPDATE_STATUS_FAILURE: {
			const stateReducer: IOrdersState = {
				...state,
				stateUpdateOrdersStatus: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		default:
			return state;
	}
};

export default ordersReducer;
