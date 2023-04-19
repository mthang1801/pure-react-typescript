import { IAction } from "../interfaces/root.interfaces";
import productTypes from "./types/product.types";

export const createProduct = (params: any): IAction => ({
	type: productTypes.CREATE_PRODUCT_START,
	payload: { params }
});

export const fetchProductsList = (params?: any): IAction => ({
	type: productTypes.FETCH_PRODUCTS_LIST_START,
	payload: { params }
});

export const getProductById = (id?: any, params?: any): IAction => ({
	type: productTypes.START_GET_PRODUCT_BY_ID,
	payload: { id, params }
});

export const updateProductById = (id?: any, params?: any): IAction => ({
	type: productTypes.START_UPDATE_PRODUCT_BY_ID,
	payload: { id, params }
});

export const getProductLogs = (id?: any, params?: any): IAction => ({
	type: productTypes.START_GET_PRODUCT_LOGS,
	payload: { id, params }
});
