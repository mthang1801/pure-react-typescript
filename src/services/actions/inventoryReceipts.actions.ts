import { IAction } from "../interfaces/root.interfaces";
import inventoryTypes from "./types/inventoryReceipts.types";

export const getListInventory = (params?: any) => {
	const action: any = {
		type: inventoryTypes.START_GET_LIST_INVENTORY,
		payload: { params }
	};
	return action;
};

export const createOneInventory = (params: any) => {
	const action: IAction = {
		type: inventoryTypes.START_CREATE_INVENTORY,
		payload: { params }
	};
	return action;
};

export const updateOneInventory = (id: any, params: any) => {
	const action: IAction = {
		type: inventoryTypes.START_UPDATE_INVENTORY,
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

export const getOneInventoryById = (id: any) => {
	const action: IAction = {
		type: inventoryTypes.START_GET_INVENTORY_BY_ID,
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
