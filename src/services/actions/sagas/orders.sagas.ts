import { call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { API_URL } from "../../api/config";
import { IAction, IRootResponse } from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import { actionFailure, actionSuccess } from "../root.actions";
import ordersTypes from "../types/orders.types";
import { API_HISTORY, API_ORDERS, API_SYNC } from "src/services/api/url.index";

function* getListOrders(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_ORDERS}`, payload.params);
		});
		yield put(actionSuccess(ordersTypes.GET_LIST_ORDER_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(ordersTypes.GET_LIST_ORDER_FAILURE, err));
	}
}

function* getOrderById(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_ORDERS}/${payload.id}`, {});
		});
		yield put(actionSuccess(ordersTypes.GET_ORDER_BY_ID_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(ordersTypes.GET_ORDER_BY_ID_FAILURE, err));
	}
}

function* createOneOrder(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.post(`${API_URL}/${API_ORDERS}`, payload.params);
		});
		yield put(actionSuccess(ordersTypes.CREATE_ONE_ORDER_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(ordersTypes.CREATE_ONE_ORDER_FAILURE, err));
	}
}

function* updateOneOrder(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/${API_ORDERS}/${payload.id}`, payload.params);
		});
		yield put(actionSuccess(ordersTypes.UPDATE_ONE_ORDER_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(ordersTypes.UPDATE_ONE_ORDER_FAILURE, err));
	}
}

function* getHistoryOrderById(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_ORDERS}/${payload.id}/${API_HISTORY}`, payload.params);
		});
		yield put(actionSuccess(ordersTypes.GET_ORDER_HISTORY_BY_ID_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(ordersTypes.GET_ORDER_HISTORY_BY_ID_FAILURE, err));
	}
}

function* syncAllOrder(action: IAction) {
	try {
		const res: IRootResponse = yield call(() => {
			return api.post(`${API_URL}/${API_ORDERS}/${API_SYNC}`);
		});
		yield put(actionSuccess(ordersTypes.SYNC_ALL_ORDER_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(ordersTypes.SYNC_ALL_ORDER_FAILURE, err));
	}
}

function* updateOrderByIdWithMethod(action: IAction) {
	try {
		const { payload } = action;
		let method = payload?.params?.method || "";
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/${API_ORDERS}/${payload.id}/${method}`);
		});
		yield put(actionSuccess(ordersTypes.UPDATE_ORDER_BY_ID_WITH_METHOD_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(ordersTypes.UPDATE_ORDER_BY_ID_WITH_METHOD_FAILURE, err));
	}
}

function* getPreOrders(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/pre-order`, payload.params);
		});
		yield put(actionSuccess(ordersTypes.GET_PRE_ORDERS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(ordersTypes.GET_PRE_ORDERS_FAILURE, err));
	}
}

function* getPreOrdersById(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/pre-order/${payload.id}`, payload.params);
		});
		yield put(actionSuccess(ordersTypes.GET_PRE_ORDERS_BY_ID_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(ordersTypes.GET_PRE_ORDERS_BY_ID_FAILURE, err));
	}
}

function* updateOrdersStatusSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/orders/update-order-statuses`, payload.params);
		});
		yield put(actionSuccess(ordersTypes.UPDATE_STATUS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(ordersTypes.UPDATE_STATUS_FAILURE, err));
	}
}

const ordersSagas = [
	takeLatest(ordersTypes.START_GET_PRE_ORDERS, getPreOrders),
	takeLatest(ordersTypes.START_GET_PRE_ORDERS_BY_ID, getPreOrdersById),
	takeLatest(ordersTypes.START_UPDATE_STATUS, updateOrdersStatusSaga),

	takeLatest(ordersTypes.START_GET_LIST_ORDER, getListOrders),
	takeLatest(ordersTypes.START_GET_ORDER_BY_ID, getOrderById),
	takeLeading(ordersTypes.START_CREATE_ONE_ORDER, createOneOrder),
	takeLatest(ordersTypes.START_UPDATE_ONE_ORDER, updateOneOrder),
	takeLatest(ordersTypes.START_GET_ORDER_HISTORY_BY_ID, getHistoryOrderById),
	takeLeading(ordersTypes.START_SYNC_ALL_ORDER, syncAllOrder),
	takeLeading(ordersTypes.START_UPDATE_ORDER_BY_ID_WITH_METHOD, updateOrderByIdWithMethod)
];

export default ordersSagas;
