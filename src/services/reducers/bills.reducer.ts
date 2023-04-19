import { Reducer } from "redux";

import billsTypes from "../actions/types/bills.types";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IBillState } from "../interfaces/bills.interfaces";

const initState: IBillState = {
	stateListBill: { ...rootState },
	stateBillById: { ...rootState }
};

const categoriesReducer: Reducer<IBillState, ISyntheticAction> = (
	state: IBillState = initState,
	action: ISyntheticAction
) => {
	const { type, response } = action;

	switch (type) {
		/*************************** START *************************/
		/*                     GET ALL BILL                     */

		/**************************** END **************************/

		/*************************** START *************************/
		/*                     GET LIST BILL                     */

		case billsTypes.START_GET_LIST_BILL: {
			const stateReducer: IBillState = {
				...state,
				stateListBill: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case billsTypes.GET_LIST_BILL_SUCCESS: {
			const stateReducer: IBillState = {
				...state,
				stateListBill: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case billsTypes.GET_LIST_BILL_FAILURE: {
			const stateReducer: IBillState = {
				...state,
				stateListBill: {
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
		/*                   UPDATE LIST BILL                  */

		/**************************** END **************************/

		/*************************** START *************************/
		/*                      GET BILL BY ID                  */

		case billsTypes.START_GET_BILL_BY_ID: {
			const stateReducer: IBillState = {
				...state,
				stateBillById: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case billsTypes.GET_BILL_BY_ID_SUCCESS: {
			const stateReducer: IBillState = {
				...state,
				stateBillById: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case billsTypes.GET_BILL_BY_ID_FAILURE: {
			const stateReducer: IBillState = {
				...state,
				stateBillById: {
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
		/*                     CREATE ONE BILL                  */

		/**************************** END **************************/

		/*************************** START *************************/
		/*               UPDATE LIST PRODUCT IN BILL           */

		default:
			return state;
	}
};

export default categoriesReducer;
