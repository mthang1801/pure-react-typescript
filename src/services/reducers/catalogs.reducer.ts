import { Reducer } from "redux";

import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { ICatalogsState } from "../interfaces/catalogs.interfaces";
import catalogsTypes from "../actions/types/catalogs.types";

const initState: ICatalogsState = {
	stateListCatalogs: { ...rootState },
	stateCatalogById: { ...rootState },
	stateCreateOneCatalog: { ...rootState },
	stateUpdateOneCatalog: { ...rootState },
	stateUpdateStatusCategoryCatalog: { ...rootState },
	stateUpdateIndexCatalog: { ...rootState }
};

const catalogsReducer: Reducer<ICatalogsState, ISyntheticAction> = (
	state: ICatalogsState = initState,
	action: ISyntheticAction
) => {
	const { type, response } = action;

	switch (type) {
		/*************************** START *************************/
		/*                   GET ALL ORDER STATUS                  */

		case catalogsTypes.START_GET_LIST_CATALOGS: {
			const stateReducer: ICatalogsState = {
				...state,
				stateListCatalogs: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case catalogsTypes.GET_LIST_CATALOGS_SUCCESS: {
			const stateReducer: ICatalogsState = {
				...state,
				stateListCatalogs: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case catalogsTypes.GET_LIST_CATALOGS_FAILURE: {
			const stateReducer: ICatalogsState = {
				...state,
				stateListCatalogs: {
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

		case catalogsTypes.START_GET_CATALOGS_BY_ID: {
			const stateReducer: ICatalogsState = {
				...state,
				stateCatalogById: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case catalogsTypes.GET_CATALOGS_BY_ID_SUCCESS: {
			const stateReducer: ICatalogsState = {
				...state,
				stateCatalogById: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case catalogsTypes.GET_CATALOGS_BY_ID_FAILURE: {
			const stateReducer: ICatalogsState = {
				...state,
				stateCatalogById: {
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

		case catalogsTypes.START_CREATE_CATALOGS: {
			const stateReducer: ICatalogsState = {
				...state,
				stateCreateOneCatalog: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case catalogsTypes.CREATE_CATALOGS_SUCCESS: {
			const stateReducer: ICatalogsState = {
				...state,
				stateCreateOneCatalog: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case catalogsTypes.CREATE_CATALOGS_FAILURE: {
			const stateReducer: ICatalogsState = {
				...state,
				stateCreateOneCatalog: {
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

		case catalogsTypes.START_UPDATE_CATALOGS: {
			const stateReducer: ICatalogsState = {
				...state,
				stateUpdateOneCatalog: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case catalogsTypes.UPDATE_CATALOGS_SUCCESS: {
			const stateReducer: ICatalogsState = {
				...state,
				stateUpdateOneCatalog: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case catalogsTypes.UPDATE_CATALOGS_FAILURE: {
			const stateReducer: ICatalogsState = {
				...state,
				stateUpdateOneCatalog: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		case catalogsTypes.START_UPDATE_STATUS_CATEGORY_CATALOGS: {
			const stateReducer: ICatalogsState = {
				...state,
				stateUpdateStatusCategoryCatalog: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case catalogsTypes.UPDATE_STATUS_CATEGORY_CATALOGS_SUCCESS: {
			const stateReducer: ICatalogsState = {
				...state,
				stateUpdateStatusCategoryCatalog: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case catalogsTypes.UPDATE_STATUS_CATEGORY_CATALOGS_FAILURE: {
			const stateReducer: ICatalogsState = {
				...state,
				stateUpdateStatusCategoryCatalog: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		case catalogsTypes.START_UPDATE_INDEX_CATALOG: {
			const stateReducer: ICatalogsState = {
				...state,
				stateUpdateIndexCatalog: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case catalogsTypes.UPDATE_INDEX_CATALOG_SUCCESS: {
			const stateReducer: ICatalogsState = {
				...state,
				stateUpdateIndexCatalog: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case catalogsTypes.UPDATE_INDEX_CATALOG_FAILURE: {
			const stateReducer: ICatalogsState = {
				...state,
				stateUpdateIndexCatalog: {
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
