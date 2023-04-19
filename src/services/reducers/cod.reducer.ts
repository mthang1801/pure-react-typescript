import { Reducer } from "redux";

import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import codTypes from "../actions/types/cod.types";
import { ICodState } from "../interfaces/cod.interfaces";

const initState: ICodState = {
	stateListCod: { ...rootState },
	stateCodById: { ...rootState },
	stateCreateOneCod: { ...rootState },
	stateUpdateOneCod: { ...rootState }
};

const codReducer: Reducer<ICodState, ISyntheticAction> = (state: ICodState = initState, action: ISyntheticAction) => {
	const { type, response } = action;

	switch (type) {
		/*************************** START *************************/
		/*                   GET ALL ORDER STATUS                  */

		case codTypes.START_GET_LIST_COD: {
			const stateReducer: ICodState = {
				...state,
				stateListCod: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case codTypes.GET_LIST_COD_SUCCESS: {
			const stateReducer: ICodState = {
				...state,
				stateListCod: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case codTypes.GET_LIST_COD_FAILURE: {
			const stateReducer: ICodState = {
				...state,
				stateListCod: {
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

		case codTypes.START_GET_COD_BY_ID: {
			const stateReducer: ICodState = {
				...state,
				stateCodById: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case codTypes.GET_COD_BY_ID_SUCCESS: {
			const stateReducer: ICodState = {
				...state,
				stateCodById: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case codTypes.GET_COD_BY_ID_FAILURE: {
			const stateReducer: ICodState = {
				...state,
				stateCodById: {
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

		case codTypes.START_CREATE_COD: {
			const stateReducer: ICodState = {
				...state,
				stateCreateOneCod: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case codTypes.CREATE_COD_SUCCESS: {
			const stateReducer: ICodState = {
				...state,
				stateCreateOneCod: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case codTypes.CREATE_COD_FAILURE: {
			const stateReducer: ICodState = {
				...state,
				stateCreateOneCod: {
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

		case codTypes.START_UPDATE_COD: {
			const stateReducer: ICodState = {
				...state,
				stateUpdateOneCod: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case codTypes.UPDATE_COD_SUCCESS: {
			const stateReducer: ICodState = {
				...state,
				stateUpdateOneCod: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case codTypes.UPDATE_COD_FAILURE: {
			const stateReducer: ICodState = {
				...state,
				stateUpdateOneCod: {
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

export default codReducer;
