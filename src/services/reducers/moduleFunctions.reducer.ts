import { Reducer } from 'redux';
import moduleFunctionTypes from '../actions/types/moduleFunction.types';
import { IModuleFunctionState } from '../interfaces/moduleFunction.interface';
import { ISyntheticAction } from '../interfaces/root.interfaces';
import { rootState } from './state/root.states';

const initState: IModuleFunctionState = {
	stateModuleFunctionsList: { ...rootState },
	stateModuleFunctionById: { ...rootState },
	stateChildrenModuleFunctionById: { ...rootState },
	stateUpdateModuleFunction: { ...rootState },
	stateCreateModuleFunction: { ...rootState },
	stateUpdateModuleFunctionIndexes : {...rootState}
};

const moduleFunctionsReducer: Reducer<IModuleFunctionState, ISyntheticAction> = (
	state: IModuleFunctionState = initState,
	action: ISyntheticAction
) => {
	const { type, response } = action;
	switch (type) {
		case moduleFunctionTypes.FETCH_MODULE_FUNCTION_LIST_START: {
			const stateReducer: IModuleFunctionState = {
				...state,
				stateModuleFunctionsList: {
					...rootState,
					isLoading: true,
					error: false
				}
			};
			return stateReducer;
		}
		case moduleFunctionTypes.FETCH_MODULE_FUNCTION_LIST_SUCCESS: {
			const stateReducer: IModuleFunctionState = {
				...state,
				stateModuleFunctionsList: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case moduleFunctionTypes.FETCH_MODULE_FUNCTION_LIST_FAILURE: {
			const stateReducer: IModuleFunctionState = {
				...state,
				stateModuleFunctionsList: {
					...rootState,
					isLoading: false,
					error: true,
					message: response.message
				}
			};
			return stateReducer;
		}
		case moduleFunctionTypes.GET_MODULE_FUNCTION_BY_ID_START: {
			const stateReducer: IModuleFunctionState = {
				...state,
				stateModuleFunctionById: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case moduleFunctionTypes.GET_MODULE_FUNCTION_BY_ID_SUCCESS: {
			const stateReducer: IModuleFunctionState = {
				...state,
				stateModuleFunctionById: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case moduleFunctionTypes.GET_MODULE_FUNCTION_BY_ID_FAILURE: {
			const stateReducer: IModuleFunctionState = {
				...state,
				stateModuleFunctionById: {
					...rootState,
					isLoading: false,
					error: true,
					message: response.message
				}
			};
			return stateReducer;
		}
		case moduleFunctionTypes.GET_CHILDREN_MODULE_FUNCTION_BY_ID_START: {
			const stateReducer: IModuleFunctionState = {
				...state,
				stateChildrenModuleFunctionById: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case moduleFunctionTypes.GET_CHILDREN_MODULE_FUNCTION_BY_ID_SUCCESS: {
			const stateReducer: IModuleFunctionState = {
				...state,
				stateChildrenModuleFunctionById: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case moduleFunctionTypes.GET_CHILDREN_MODULE_FUNCTION_BY_ID_FAILURE: {
			const stateReducer: IModuleFunctionState = {
				...state,
				stateChildrenModuleFunctionById: {
					...rootState,
					isLoading: false,
					error: true,
					message: response.message
				}
			};
			return stateReducer;
		}
		case moduleFunctionTypes.UPDATE_MODULE_FUNCTION_START: {
			const stateReducer: IModuleFunctionState = {
				...state,
				stateUpdateModuleFunction: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case moduleFunctionTypes.UPDATE_MODULE_FUNCTION_SUCCESS: {
			const stateReducer: IModuleFunctionState = {
				...state,
				stateUpdateModuleFunction: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case moduleFunctionTypes.UPDATE_MODULE_FUNCTION_FAILURE : {
			const stateReducer: IModuleFunctionState = {
				...state,
				stateUpdateModuleFunction: {
					...rootState,
					isLoading: false,
					error: true,
					message: response.message
				}
			};
			return stateReducer;
		}
		case moduleFunctionTypes.CREATE_MODULE_FUNCTION_START : {
			const stateReducer : IModuleFunctionState = {
				...state, 
				stateCreateModuleFunction: {
					...rootState, 
					isLoading : true
				}
			};
			return stateReducer;
		}
		case moduleFunctionTypes.CREATE_MODULE_FUNCTION_SUCCESS : {
			const stateReducer : IModuleFunctionState = {
				...state, 
				stateCreateModuleFunction: {
					...rootState, 
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			}
			return stateReducer
		};
		case moduleFunctionTypes.CREATE_MODULE_FUNCTION_FAILURE : {
			const stateReducer: IModuleFunctionState = {
				...state,
				stateCreateModuleFunction: {
					...rootState,
					isLoading: false,
					error: true,
					message: response.message
				}
			};
			return stateReducer;
		}
		case moduleFunctionTypes.UPDATE_MODULE_FUNCTION_INDEXES_START : {
			const stateReducer : IModuleFunctionState = {
				...state, 
				stateUpdateModuleFunctionIndexes: {
					...rootState, 
					isLoading : true
				}
			};
			return stateReducer;
		}
		case moduleFunctionTypes.UPDATE_MODULE_FUNCTION_INDEXES_SUCCESS : {
			const stateReducer : IModuleFunctionState = {
				...state, 
				stateUpdateModuleFunctionIndexes: {
					...rootState, 
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			}
			return stateReducer
		};
		case moduleFunctionTypes.UPDATE_MODULE_FUNCTION_INDEXES_FAILURE : {
			const stateReducer: IModuleFunctionState = {
				...state,
				stateUpdateModuleFunctionIndexes: {
					...rootState,
					isLoading: false,
					error: true,
					message: response.message
				}
			};
			return stateReducer;
		}
		default:
			return state;
	}
};

export default moduleFunctionsReducer;
