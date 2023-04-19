import { Reducer } from "redux";

import categoryTypes from "../actions/types/category.types";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { ICategoryState } from "../interfaces/category.interfaces";

const initState: ICategoryState = {
	stateListCategory: { ...rootState },
	stateUpdateIndexCategory: { ...rootState },
	stateCategoryById: { ...rootState },
	stateCreateCategory: { ...rootState },
	stateUpdateCategory: { ...rootState }
};

const categoriesReducer: Reducer<ICategoryState, ISyntheticAction> = (
	state: ICategoryState = initState,
	action: ISyntheticAction
) => {
	const { type, response } = action;

	switch (type) {
		/*************************** START *************************/
		/*                     GET ALL CATEGORY                     */

		/**************************** END **************************/

		/*************************** START *************************/
		/*                     GET LIST CATEGORY                     */

		case categoryTypes.START_GET_LIST_CATEGORY: {
			const stateReducer: ICategoryState = {
				...state,
				stateListCategory: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case categoryTypes.GET_LIST_CATEGORY_SUCCESS: {
			const stateReducer: ICategoryState = {
				...state,
				stateListCategory: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case categoryTypes.GET_LIST_CATEGORY_FAILURE: {
			const stateReducer: ICategoryState = {
				...state,
				stateListCategory: {
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
		/*                   UPDATE LIST CATEGORY                  */

		case categoryTypes.START_UPDATE_INDEX_CATEGORY: {
			const stateReducer: ICategoryState = {
				...state,
				stateUpdateIndexCategory: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case categoryTypes.UPDATE_INDEX_CATEGORY_SUCCESS: {
			const stateReducer: ICategoryState = {
				...state,
				stateUpdateIndexCategory: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case categoryTypes.UPDATE_INDEX_CATEGORY_FAILURE: {
			const stateReducer: ICategoryState = {
				...state,
				stateUpdateIndexCategory: {
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
		/*                      GET CATEGORY BY ID                  */

		case categoryTypes.START_GET_CATEGORY_BY_ID: {
			const stateReducer: ICategoryState = {
				...state,
				stateCategoryById: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case categoryTypes.GET_CATEGORY_BY_ID_SUCCESS: {
			const stateReducer: ICategoryState = {
				...state,
				stateCategoryById: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case categoryTypes.GET_CATEGORY_BY_ID_FAILURE: {
			const stateReducer: ICategoryState = {
				...state,
				stateCategoryById: {
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
		/*                     CREATE ONE CATEGORY                  */

		case categoryTypes.START_CREATE_CATEGORY: {
			const stateReducer: ICategoryState = {
				...state,
				stateCreateCategory: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case categoryTypes.CREATE_CATEGORY_SUCCESS: {
			const stateReducer: ICategoryState = {
				...state,
				stateCreateCategory: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case categoryTypes.CREATE_CATEGORY_FAILURE: {
			const stateReducer: ICategoryState = {
				...state,
				stateCreateCategory: {
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
		/*                    UPDATE ONE CATEGORY                   */

		case categoryTypes.START_UPDATE_CATEGORY: {
			const stateReducer: ICategoryState = {
				...state,
				stateUpdateCategory: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case categoryTypes.UPDATE_CATEGORY_SUCCESS: {
			const stateReducer: ICategoryState = {
				...state,
				stateUpdateCategory: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case categoryTypes.UPDATE_CATEGORY_FAILURE: {
			const stateReducer: ICategoryState = {
				...state,
				stateUpdateCategory: {
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
		/*               UPDATE LIST PRODUCT IN CATEGORY           */

		default:
			return state;
	}
};

export default categoriesReducer;
