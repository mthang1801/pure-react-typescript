import { Reducer } from "redux";

import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import inventoryTypes from "../actions/types/inventoryReceipts.types";
import { IInventoryState } from "../interfaces/inventoryReceipts.interfaces";

const initState: IInventoryState = {
	stateListInventory: { ...rootState },
	stateInventoryById: { ...rootState },
	stateCreateOneInventory: { ...rootState },
	stateUpdateOneInventory: { ...rootState }
};

const catalogsReducer: Reducer<IInventoryState, ISyntheticAction> = (
	state: IInventoryState = initState,
	action: ISyntheticAction
) => {
	const { type, response } = action;

	switch (type) {
		/*************************** START *************************/
		/*                   GET ALL ORDER STATUS                  */

		case inventoryTypes.START_GET_LIST_INVENTORY: {
			const stateReducer: IInventoryState = {
				...state,
				stateListInventory: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case inventoryTypes.GET_LIST_INVENTORY_SUCCESS: {
			const stateReducer: IInventoryState = {
				...state,
				stateListInventory: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case inventoryTypes.GET_LIST_INVENTORY_FAILURE: {
			const stateReducer: IInventoryState = {
				...state,
				stateListInventory: {
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

		case inventoryTypes.START_GET_INVENTORY_BY_ID: {
			const stateReducer: IInventoryState = {
				...state,
				stateInventoryById: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case inventoryTypes.GET_INVENTORY_BY_ID_SUCCESS: {
			const stateReducer: IInventoryState = {
				...state,
				stateInventoryById: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case inventoryTypes.GET_INVENTORY_BY_ID_FAILURE: {
			const stateReducer: IInventoryState = {
				...state,
				stateInventoryById: {
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

		case inventoryTypes.START_CREATE_INVENTORY: {
			const stateReducer: IInventoryState = {
				...state,
				stateCreateOneInventory: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case inventoryTypes.CREATE_INVENTORY_SUCCESS: {
			const stateReducer: IInventoryState = {
				...state,
				stateCreateOneInventory: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case inventoryTypes.CREATE_INVENTORY_FAILURE: {
			const stateReducer: IInventoryState = {
				...state,
				stateCreateOneInventory: {
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

		case inventoryTypes.START_UPDATE_INVENTORY: {
			const stateReducer: IInventoryState = {
				...state,
				stateUpdateOneInventory: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case inventoryTypes.UPDATE_INVENTORY_SUCCESS: {
			const stateReducer: IInventoryState = {
				...state,
				stateUpdateOneInventory: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case inventoryTypes.UPDATE_INVENTORY_FAILURE: {
			const stateReducer: IInventoryState = {
				...state,
				stateUpdateOneInventory: {
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

		default:
			return state;
	}
};

export default catalogsReducer;
