import { IAction } from "../interfaces/root.interfaces";
import codTypes from "./types/cod.types";

export const getListCod = (params?: any) => {
	const action: any = {
		type: codTypes.START_GET_LIST_COD,
		payload: { params }
	};
	return action;
};

export const createOneCod = (params: any) => {
	const action: IAction = {
		type: codTypes.START_CREATE_COD,
		payload: { params }
	};
	return action;
};

export const updateOneCod = (id: any, params: any) => {
	const action: IAction = {
		type: codTypes.START_UPDATE_COD,
		payload: { id, params }
	};
	return action;
};

// export const updateStatusCategoryCatalog = (id: any, params: any) => {
// 	const action: IAction = {
// 		type: catalogsTypes.START_UPDATE_STATUS_CATEGORY_CATALOGS,
// 		payload: { id, params }
// 	};
// 	return action;
// };

export const getOneCodById = (id: any) => {
	const action: IAction = {
		type: codTypes.START_GET_COD_BY_ID,
		payload: { id }
	};
	return action;
};

// export const updateIndexCatalog = (params: any) => {
// 	const action: IAction = {
// 		type: catalogsTypes.START_UPDATE_INDEX_CATALOG,
// 		payload: { params }
// 	};
// 	return action;
// };
