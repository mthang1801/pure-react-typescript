import { Reducer } from "redux";

import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IPackagesState } from "../interfaces/packages.interfaces";
import packagesTypes from "../actions/types/packages.types";

const initState: IPackagesState = {
	stateListPackages: { ...rootState },
	statePackagesById: { ...rootState },
	stateCreateOnePackages: { ...rootState },
	stateUpdateOnePackages: { ...rootState }
};

const packagesReducer: Reducer<IPackagesState, ISyntheticAction> = (
	state: IPackagesState = initState,
	action: ISyntheticAction
) => {
	const { type, response } = action;

	switch (type) {
		/*************************** START *************************/
		/*                   GET ALL ORDER STATUS                  */

		case packagesTypes.START_GET_LIST_PACKAGES: {
			const stateReducer: IPackagesState = {
				...state,
				stateListPackages: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case packagesTypes.GET_LIST_PACKAGES_SUCCESS: {
			const stateReducer: IPackagesState = {
				...state,
				stateListPackages: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case packagesTypes.GET_LIST_PACKAGES_FAILURE: {
			const stateReducer: IPackagesState = {
				...state,
				stateListPackages: {
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

		case packagesTypes.START_GET_PACKAGES_BY_ID: {
			const stateReducer: IPackagesState = {
				...state,
				statePackagesById: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case packagesTypes.GET_PACKAGES_BY_ID_SUCCESS: {
			const stateReducer: IPackagesState = {
				...state,
				statePackagesById: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case packagesTypes.GET_PACKAGES_BY_ID_FAILURE: {
			const stateReducer: IPackagesState = {
				...state,
				statePackagesById: {
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

		case packagesTypes.START_CREATE_PACKAGES: {
			const stateReducer: IPackagesState = {
				...state,
				stateCreateOnePackages: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case packagesTypes.CREATE_PACKAGES_SUCCESS: {
			const stateReducer: IPackagesState = {
				...state,
				stateCreateOnePackages: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case packagesTypes.CREATE_PACKAGES_FAILURE: {
			const stateReducer: IPackagesState = {
				...state,
				stateCreateOnePackages: {
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

		case packagesTypes.START_UPDATE_PACKAGES: {
			const stateReducer: IPackagesState = {
				...state,
				stateUpdateOnePackages: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case packagesTypes.UPDATE_PACKAGES_SUCCESS: {
			const stateReducer: IPackagesState = {
				...state,
				stateUpdateOnePackages: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case packagesTypes.UPDATE_PACKAGES_FAILURE: {
			const stateReducer: IPackagesState = {
				...state,
				stateUpdateOnePackages: {
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

export default packagesReducer;
