import { call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { API_URL } from "../../api/config";
import { IAction, IRootResponse } from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import { actionFailure, actionSuccess } from "../root.actions";
import categoryTypes from "../types/category.types";
import { API_ALL, API_CATALOG, API_CATEGORY, API_ICON, API_META_IMAGE, API_PRODUCTS } from "src/services/api/url.index";

function* getListCategorySaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_CATEGORY}`, payload.params);
		});
		yield put(actionSuccess(categoryTypes.GET_LIST_CATEGORY_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(categoryTypes.GET_LIST_CATEGORY_FAILURE, err));
	}
}

function* updateCategorySaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/${API_CATEGORY}/${payload?.id}`, payload.params);
		});
		yield put(actionSuccess(categoryTypes.UPDATE_CATEGORY_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(categoryTypes.UPDATE_CATEGORY_FAILURE, err));
	}
}

function* getCategoryById(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_CATEGORY}/${payload.id}`, payload.params);
		});
		yield put(actionSuccess(categoryTypes.GET_CATEGORY_BY_ID_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(categoryTypes.GET_CATEGORY_BY_ID_FAILURE, err));
	}
}

function* updateIndexCategorySaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/${API_CATEGORY}/update-indexes`, payload.params);
		});
		yield put(actionSuccess(categoryTypes.UPDATE_INDEX_CATEGORY_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(categoryTypes.UPDATE_INDEX_CATEGORY_FAILURE, err));
	}
}

function* createCategorySaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.post(`${API_URL}/${API_CATEGORY}`, payload.params);
		});
		yield put(actionSuccess(categoryTypes.CREATE_CATEGORY_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(categoryTypes.CREATE_CATEGORY_FAILURE, err));
	}
}
const categorySagas = [
	takeLatest(categoryTypes.START_GET_LIST_CATEGORY, getListCategorySaga),
	takeLatest(categoryTypes.START_UPDATE_CATEGORY, updateCategorySaga),
	takeLatest(categoryTypes.START_GET_CATEGORY_BY_ID, getCategoryById),
	takeLatest(categoryTypes.START_UPDATE_INDEX_CATEGORY, updateIndexCategorySaga),
	takeLatest(categoryTypes.START_CREATE_CATEGORY, createCategorySaga)
];
export default categorySagas;
