import catalogsTypes from "./types/catalogs.types";
import { IAction } from "../interfaces/root.interfaces";

export const getListCatalogs = (params?: any) => {
	const action: any = {
		type: catalogsTypes.START_GET_LIST_CATALOGS,
		payload: { params }
	};
	return action;
};

export const createOneCatalog = (params: any) => {
	const action: IAction = {
		type: catalogsTypes.START_CREATE_CATALOGS,
		payload: { params }
	};
	return action;
};

export const updateOneCatalog = (id: any, params: any) => {
	const action: IAction = {
		type: catalogsTypes.START_UPDATE_CATALOGS,
		payload: { id, params }
	};
	return action;
};

export const updateStatusCategoryCatalog = (id: any, params: any) => {
	const action: IAction = {
		type: catalogsTypes.START_UPDATE_STATUS_CATEGORY_CATALOGS,
		payload: { id, params }
	};
	return action;
};

export const getOneCatalogById = (params: any) => {
	const action: IAction = {
		type: catalogsTypes.START_GET_CATALOGS_BY_ID,
		payload: { params }
	};
	return action;
};

export const updateIndexCatalog = (params: any) => {
	const action: IAction = {
		type: catalogsTypes.START_UPDATE_INDEX_CATALOG,
		payload: { params }
	};
	return action;
};
