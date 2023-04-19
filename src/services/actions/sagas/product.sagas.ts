import { call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { API_PRODUCTS } from "src/services/api/url.index";
import { IAction, IRootResponse } from "../../interfaces/root.interfaces";
import { actionFailure, actionSuccess } from "../root.actions";
import productTypes from "../types/product.types";

function* createProduct(action: IAction) {
	try {
		const {
			payload: { params }
		} = action;
		const res: IRootResponse = yield call(() => api.post(`${API_URL}/${API_PRODUCTS}`, params));
		yield put(actionSuccess(productTypes.CREATE_PRODUCT_SUCCESS, res));
	} catch (error: any) {
		yield put(actionFailure(productTypes.CREATE_PRODUCT_FAILURE, error));
	}
}

function* fetchProductsList(action: IAction) {
	try {
		const {
			payload: { params }
		} = action;
		const res: IRootResponse = yield call(() => api.get(`${API_URL}/${API_PRODUCTS}`, params));
		yield put(actionSuccess(productTypes.FETCH_PRODUCTS_LIST_SUCCESS, res));
	} catch (error: any) {
		yield put(actionFailure(productTypes.FETCH_PRODUCTS_LIST_FAILURE, error));
	}
}
function* getCategoryByIdSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_PRODUCTS}/${payload.id}`, payload.params);
		});
		yield put(actionSuccess(productTypes.GET_PRODUCT_BY_ID_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(productTypes.GET_PRODUCT_BY_ID_FAILURE, err));
	}
}

function* getProductLogsSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_PRODUCTS}/${payload.id}/logs`, payload.params);
		});
		yield put(actionSuccess(productTypes.GET_PRODUCT_LOGS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(productTypes.GET_PRODUCT_LOGS_FAILURE, err));
	}
}

function* updateProductByIdSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/${API_PRODUCTS}/${payload.id}`, payload.params);
		});
		yield put(actionSuccess(productTypes.UPDATE_PRODUCT_BY_ID_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(productTypes.UPDATE_PRODUCT_BY_ID_FAILURE, err));
	}
}

const productSagas = [
	takeLatest(productTypes.CREATE_PRODUCT_START, createProduct),
	takeLatest(productTypes.START_GET_PRODUCT_BY_ID, getCategoryByIdSaga),
	takeLatest(productTypes.START_GET_PRODUCT_LOGS, getProductLogsSaga),

	takeLatest(productTypes.START_UPDATE_PRODUCT_BY_ID, updateProductByIdSaga),

	takeLeading(productTypes.FETCH_PRODUCTS_LIST_START, fetchProductsList)
];

export default productSagas;
