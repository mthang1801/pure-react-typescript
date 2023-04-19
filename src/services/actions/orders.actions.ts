import ordersTypes from "./types/orders.types";
import { IAction } from "../interfaces/root.interfaces";

export const getListOrders = (params?: any) => {
	const action: IAction = {
		type: ordersTypes.START_GET_LIST_ORDER,
		payload: { params }
	};
	return action;
};

export const getOrderById = (id: any) => {
	const action: IAction = {
		type: ordersTypes.START_GET_ORDER_BY_ID,
		payload: { id }
	};
	return action;
};

export const createOneOrder = (params: any) => {
	const action: IAction = {
		type: ordersTypes.START_CREATE_ONE_ORDER,
		payload: { params }
	};
	return action;
};

export const updateOneOrder = (id: string, params: any) => {
	const action: IAction = {
		type: ordersTypes.START_UPDATE_ONE_ORDER,
		payload: { id, params }
	};
	return action;
};

export const getHistoryOrderById = (id: string) => {
	const action: IAction = {
		type: ordersTypes.START_GET_ORDER_HISTORY_BY_ID,
		payload: { id }
	};
	return action;
};

export const syncAllOrder = () => {
	const action: IAction = {
		type: ordersTypes.START_SYNC_ALL_ORDER,
		payload: {}
	};
	return action;
};

export const updateOrderByIdWithMethod = (id: string, params: any) => {
	const action: IAction = {
		type: ordersTypes.START_UPDATE_ORDER_BY_ID_WITH_METHOD,
		payload: { id, params }
	};
	return action;
};

export const getPreOrders = (params: any) => {
	const action: IAction = {
		type: ordersTypes.START_GET_PRE_ORDERS,
		payload: { params }
	};
	return action;
};

export const getPreOrdersById = (id: string, params: any) => {
	const action: IAction = {
		type: ordersTypes.START_GET_PRE_ORDERS_BY_ID,
		payload: { id, params }
	};
	return action;
};

export const updateOrdersStatus = (params: any) => {
	const action: IAction = {
		type: ordersTypes.START_UPDATE_STATUS,
		payload: { params }
	};
	return action;
};
