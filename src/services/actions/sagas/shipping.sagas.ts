import { call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { API_END_POINT, API_URL } from "../../api/config";
import { IAction, IRootResponse } from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import { actionFailure, actionSuccess } from "../root.actions";
import { API_SHIPPING } from "src/services/api/url.index";
import shippingTypes from "../types/shipping.types";

function* getListShippingSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_SHIPPING}`, payload.params);
		});
		yield put(actionSuccess(shippingTypes.GET_LIST_SHIPPING_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(shippingTypes.GET_LIST_SHIPPING_FAILURE, err));
	}
}

function* getShippingByIdSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_SHIPPING}/${payload.id}`, {});
		});
		yield put(actionSuccess(shippingTypes.GET_SHIPPING_BY_ID_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(shippingTypes.GET_SHIPPING_BY_ID_FAILURE, err));
	}
}

function* createOneShippingSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.post(`${API_URL}/${API_SHIPPING}`, payload.params);
		});
		yield put(actionSuccess(shippingTypes.CREATE_ONE_SHIPPING_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(shippingTypes.CREATE_ONE_SHIPPING_FAILURE, err));
	}
}

function* updateOneShippingSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/${API_SHIPPING}/change-status/${payload.id}`, payload.params);
		});
		yield put(actionSuccess(shippingTypes.UPDATE_ONE_SHIPPING_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(shippingTypes.UPDATE_ONE_SHIPPING_FAILURE, err));
	}
}

const shippingSagas = [
	takeLatest(shippingTypes.START_GET_LIST_SHIPPING, getListShippingSaga),
	takeLatest(shippingTypes.START_GET_SHIPPING_BY_ID, getShippingByIdSaga),
	takeLeading(shippingTypes.START_CREATE_ONE_SHIPPING, createOneShippingSaga),
	takeLatest(shippingTypes.START_UPDATE_ONE_SHIPPING, updateOneShippingSaga)
];

export default shippingSagas;
