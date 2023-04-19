import { IAction } from "../interfaces/root.interfaces";
import attributeTypes from "./types/attribute.types";

export const fetchAttributesList = (params?: any) => ({
	type: attributeTypes.FETCH_ATTRIBUTES_LIST_START,
	payload: { params }
});

export const getAttributeById = (id: number) => {
	const action: IAction = {
		type: attributeTypes.GET_ATTRIBUTE_BY_ID_START,
		payload: { id }
	};
	return action;
};

export const updateAttribute = (id: number, params: any) => {
	const action: IAction = {
		type: attributeTypes.UPDATE_ATTRIBUTE_START,
		payload: { id, params }
	};
	return action;
};

export const updateAttributeStatus = (id: number, params: any) => {
	const action: IAction = {
		type: attributeTypes.UPDATE_ATTRIBUTE_STATUS_START,
		payload: { id, params }
	};
	return action;
};

export const createAttribute = (params: any) => {
	const action: IAction = {
		type: attributeTypes.CREATE_ATTRIBUTE_START,
		payload: { params }
	};
	return action;
};

export const addCatesFeature = (id: any, params: any) => {
	const action: IAction = {
		type: attributeTypes.START_ADD_CATEGORY_FEATURES,
		payload: { id, params }
	};
	return action;
};
