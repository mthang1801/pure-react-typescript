import { IAction } from "../interfaces/root.interfaces";
import moduleFunctionTypes from "./types/moduleFunction.types";

export const fetchModuleFunctionsList = (params?: any) => ({
	type: moduleFunctionTypes.FETCH_MODULE_FUNCTION_LIST_START,
	payload: { params }
});

export const getModuleFunctionById = (id: number, params: any = null) => {
	const action: IAction = {
		type: moduleFunctionTypes.GET_MODULE_FUNCTION_BY_ID_START,
		payload: { id, params }
	};
	return action;
};

export const getChildrenModuleFunctionById = (id: number, params: any = null) => {
	const action: IAction = {
		type: moduleFunctionTypes.GET_CHILDREN_MODULE_FUNCTION_BY_ID_START,
		payload: { id, params }
	};
	return action;
};

export const updateModuleFunction = (id: number, params: any) => {
	const action: IAction = {
		type: moduleFunctionTypes.UPDATE_MODULE_FUNCTION_START,
		payload: { id, params }
	};
	return action;
};

export const createModuleFunction = (params: any) => {
	const action: IAction = {
		type: moduleFunctionTypes.CREATE_MODULE_FUNCTION_START,
		payload: { params }
	};
	return action;
};

export const updateModuleFunctionsIndexes = (params: any) => {
	const action: IAction = {
		type: moduleFunctionTypes.UPDATE_MODULE_FUNCTION_INDEXES_START,
		payload: { params }
	};
	return action;
};
