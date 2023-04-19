import { Reducer } from "redux";
import attributeTypes from "../actions/types/attribute.types";
import { IAttributeState } from "../interfaces/attributes.interface.";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { rootState } from "./state/root.states";

const initState: IAttributeState = {
	stateAttributesList: { ...rootState },
	stateAttributeById: { ...rootState },
	stateUpdateAttribute: { ...rootState },
	stateCreateAttribute: { ...rootState },
	stateUpdateAttributeStatus: { ...rootState },
	stateAddCatesFeature: { ...rootState }
};

const attributesReducer: Reducer<IAttributeState, ISyntheticAction> = (
	state: IAttributeState = initState,
	action: ISyntheticAction
) => {
	const { type, response } = action;
	switch (type) {
		case attributeTypes.FETCH_ATTRIBUTES_LIST_START: {
			const stateReducer: IAttributeState = {
				...state,
				stateAttributesList: {
					...rootState,
					isLoading: true,
					error: false
				}
			};
			return stateReducer;
		}
		case attributeTypes.FETCH_ATTRIBUTES_LIST_SUCCESS: {
			const stateReducer: IAttributeState = {
				...state,
				stateAttributesList: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case attributeTypes.FETCH_ATTRIBUTES_LIST_FAILURE: {
			const stateReducer: IAttributeState = {
				...state,
				stateAttributesList: {
					...rootState,
					isLoading: false,
					error: true,
					message: response.message
				}
			};
			return stateReducer;
		}
		case attributeTypes.GET_ATTRIBUTE_BY_ID_START: {
			const stateReducer: IAttributeState = {
				...state,
				stateAttributeById: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case attributeTypes.GET_ATTRIBUTE_BY_ID_SUCCESS: {
			const stateReducer: IAttributeState = {
				...state,
				stateAttributeById: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case attributeTypes.GET_ATTRIBUTE_BY_ID_FAILURE: {
			const stateReducer: IAttributeState = {
				...state,
				stateAttributeById: {
					...rootState,
					isLoading: false,
					error: true,
					message: response.message
				}
			};
			return stateReducer;
		}
		case attributeTypes.UPDATE_ATTRIBUTE_START: {
			const stateReducer: IAttributeState = {
				...state,
				stateUpdateAttribute: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case attributeTypes.UPDATE_ATTRIBUTE_SUCCESS: {
			const stateReducer: IAttributeState = {
				...state,
				stateUpdateAttribute: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case attributeTypes.UPDATE_ATTRIBUTE_FAILURE: {
			const stateReducer: IAttributeState = {
				...state,
				stateUpdateAttribute: {
					...rootState,
					isLoading: false,
					error: true,
					message: response.message
				}
			};
			return stateReducer;
		}
		case attributeTypes.CREATE_ATTRIBUTE_START: {
			const stateReducer: IAttributeState = {
				...state,
				stateCreateAttribute: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case attributeTypes.CREATE_ATTRIBUTE_SUCCESS: {
			const stateReducer: IAttributeState = {
				...state,
				stateCreateAttribute: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case attributeTypes.CREATE_ATTRIBUTE_FAILURE: {
			const stateReducer: IAttributeState = {
				...state,
				stateCreateAttribute: {
					...rootState,
					isLoading: false,
					error: true,
					message: response.message
				}
			};
			return stateReducer;
		}
		case attributeTypes.UPDATE_ATTRIBUTE_STATUS_START: {
			const stateReducer: IAttributeState = {
				...state,
				stateUpdateAttributeStatus: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case attributeTypes.UPDATE_ATTRIBUTE_STATUS_SUCCESS: {
			const stateReducer: IAttributeState = {
				...state,
				stateUpdateAttributeStatus: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case attributeTypes.UPDATE_ATTRIBUTE_STATUS_FAILURE: {
			const stateReducer: IAttributeState = {
				...state,
				stateUpdateAttributeStatus: {
					...rootState,
					isLoading: false,
					error: true,
					message: response.message
				}
			};
			return stateReducer;
		}

		case attributeTypes.START_ADD_CATEGORY_FEATURES: {
			const stateReducer: IAttributeState = {
				...state,
				stateAddCatesFeature: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case attributeTypes.ADD_CATEGORY_FEATURES_SUCCESS: {
			const stateReducer: IAttributeState = {
				...state,
				stateAddCatesFeature: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case attributeTypes.ADD_CATEGORY_FEATURES_FAILURE: {
			const stateReducer: IAttributeState = {
				...state,
				stateAddCatesFeature: {
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

export default attributesReducer;
