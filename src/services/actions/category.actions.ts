import categoryTypes from "./types/category.types";
import { IAction } from "../interfaces/root.interfaces";

export const getListCategory = (params?: any) => {
	const action: IAction = {
		type: categoryTypes.START_GET_LIST_CATEGORY,
		payload: { params }
	};
	return action;
};

export const updateCategory = (id: any, params: any) => {
	const action: IAction = {
		type: categoryTypes.START_UPDATE_CATEGORY,
		payload: { id, params }
	};
	return action;
};

export const getCategoryById = (id: any, params?: any) => {
	const action: IAction = {
		type: categoryTypes.START_GET_CATEGORY_BY_ID,
		payload: { id, params }
	};
	return action;
};

export const createOneCategory = (params: any) => {
	const action: IAction = {
		type: categoryTypes.START_CREATE_CATEGORY,
		payload: { params }
	};
	return action;
};

export const updateIndexCategory = (params: any) => {
	const action: IAction = {
		type: categoryTypes.START_UPDATE_INDEX_CATEGORY,
		payload: { params }
	};
	return action;
};
