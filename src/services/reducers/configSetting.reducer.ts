import { Reducer } from "redux";

import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IConfigsState } from "../interfaces/configSetting.interfaces";
import configTypes from "../actions/types/configSetting.types";

const initState: IConfigsState = {
	stateListConfigs: { ...rootState },
	stateConfigsById: { ...rootState },
	stateCreateOneConfigs: { ...rootState },
	stateUpdateOneConfigs: { ...rootState }
};

const configsReducer: Reducer<IConfigsState, ISyntheticAction> = (
	state: IConfigsState = initState,
	action: ISyntheticAction
) => {
	const { type, response } = action;

	switch (type) {
		/*************************** START *************************/
		/*                   GET ALL ORDER STATUS                  */

		case configTypes.START_GET_LIST_CONFIGS: {
			const stateReducer: IConfigsState = {
				...state,
				stateListConfigs: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case configTypes.GET_LIST_CONFIGS_SUCCESS: {
			const stateReducer: IConfigsState = {
				...state,
				stateListConfigs: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case configTypes.GET_LIST_CONFIGS_FAILURE: {
			const stateReducer: IConfigsState = {
				...state,
				stateListConfigs: {
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

		case configTypes.START_GET_CONFIGS_BY_ID: {
			const stateReducer: IConfigsState = {
				...state,
				stateConfigsById: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case configTypes.GET_CONFIGS_BY_ID_SUCCESS: {
			const stateReducer: IConfigsState = {
				...state,
				stateConfigsById: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case configTypes.GET_CONFIGS_BY_ID_FAILURE: {
			const stateReducer: IConfigsState = {
				...state,
				stateConfigsById: {
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

		case configTypes.START_CREATE_CONFIGS: {
			const stateReducer: IConfigsState = {
				...state,
				stateCreateOneConfigs: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case configTypes.CREATE_CONFIGS_SUCCESS: {
			const stateReducer: IConfigsState = {
				...state,
				stateCreateOneConfigs: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case configTypes.CREATE_CONFIGS_FAILURE: {
			const stateReducer: IConfigsState = {
				...state,
				stateCreateOneConfigs: {
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

		case configTypes.START_UPDATE_CONFIGS: {
			const stateReducer: IConfigsState = {
				...state,
				stateUpdateOneConfigs: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case configTypes.UPDATE_CONFIGS_SUCCESS: {
			const stateReducer: IConfigsState = {
				...state,
				stateUpdateOneConfigs: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case configTypes.UPDATE_CONFIGS_FAILURE: {
			const stateReducer: IConfigsState = {
				...state,
				stateUpdateOneConfigs: {
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

export default configsReducer;
